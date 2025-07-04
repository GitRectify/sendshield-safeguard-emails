
// Email Magic: SendShield - Background Service Worker
class SendShieldBackground {
  constructor() {
    this.delayedEmails = new Map();
    this.userSettings = {
      delayTime: 60, // seconds
      isEnabled: true,
      notifications: true,
      soundAlerts: false
    };
    this.init();
  }

  init() {
    // Load user settings
    chrome.storage.sync.get(['sendShieldSettings'], (result) => {
      if (result.sendShieldSettings) {
        this.userSettings = { ...this.userSettings, ...result.sendShieldSettings };
      }
    });

    // Listen for messages from content script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
      return true; // Keep message channel open for async response
    });

    // Handle extension installation
    chrome.runtime.onInstalled.addListener(() => {
      console.log('Email Magic: SendShield installed');
    });
  }

  async handleMessage(message, sender, sendResponse) {
    switch (message.type) {
      case 'DELAY_EMAIL':
        await this.delayEmail(message.data, sender.tab);
        sendResponse({ success: true });
        break;
      
      case 'CANCEL_EMAIL':
        this.cancelDelayedEmail(message.emailId);
        sendResponse({ success: true });
        break;
      
      case 'GET_SETTINGS':
        sendResponse({ settings: this.userSettings });
        break;
      
      case 'UPDATE_SETTINGS':
        await this.updateSettings(message.settings);
        sendResponse({ success: true });
        break;
      
      case 'GET_STATS':
        const stats = await this.getUsageStats();
        sendResponse({ stats });
        break;
    }
  }

  async delayEmail(emailData, tab) {
    const emailId = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const delayTime = this.userSettings.delayTime * 1000; // Convert to milliseconds
    
    // Store delayed email
    this.delayedEmails.set(emailId, {
      ...emailData,
      tabId: tab.id,
      scheduledTime: Date.now() + delayTime,
      touches: 0,
      status: 'delayed'
    });

    // Set timeout to send email
    setTimeout(() => {
      this.sendDelayedEmail(emailId);
    }, delayTime);

    // Update usage stats
    await this.incrementStat('emailsDelayed');

    // Notify content script
    chrome.tabs.sendMessage(tab.id, {
      type: 'EMAIL_DELAYED',
      emailId,
      delayTime: this.userSettings.delayTime
    });
  }

  async sendDelayedEmail(emailId) {
    const emailData = this.delayedEmails.get(emailId);
    if (!emailData || emailData.status !== 'delayed') return;

    // Mark as sent
    emailData.status = 'sent';
    
    // Notify content script to actually send the email
    chrome.tabs.sendMessage(emailData.tabId, {
      type: 'SEND_EMAIL',
      emailId
    });

    // Update stats
    await this.incrementStat('emailsSent');
    
    // Clean up
    setTimeout(() => {
      this.delayedEmails.delete(emailId);
    }, 5000);
  }

  cancelDelayedEmail(emailId) {
    const emailData = this.delayedEmails.get(emailId);
    if (emailData) {
      emailData.status = 'cancelled';
      this.incrementStat('emailsCancelled');
    }
  }

  async updateSettings(newSettings) {
    this.userSettings = { ...this.userSettings, ...newSettings };
    await chrome.storage.sync.set({ sendShieldSettings: this.userSettings });
  }

  async incrementStat(statName) {
    const result = await chrome.storage.local.get(['usageStats']);
    const stats = result.usageStats || {};
    stats[statName] = (stats[statName] || 0) + 1;
    stats.lastUpdated = Date.now();
    await chrome.storage.local.set({ usageStats: stats });
  }

  async getUsageStats() {
    const result = await chrome.storage.local.get(['usageStats']);
    return result.usageStats || {};
  }
}

// Initialize background service
new SendShieldBackground();
