
// Email Magic: SendShield - Popup Script
class SendShieldPopup {
  constructor() {
    this.settings = {
      delayTime: 60,
      isEnabled: true,
      notifications: true,
      soundAlerts: false
    };
    this.init();
  }

  async init() {
    await this.loadSettings();
    this.setupEventListeners();
    this.updateUI();
    await this.loadStats();
  }

  async loadSettings() {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS' });
      if (response && response.settings) {
        this.settings = { ...this.settings, ...response.settings };
      }
    } catch (error) {
      console.log('Settings not loaded, using defaults');
    }
  }

  setupEventListeners() {
    // Protection toggle
    const toggle = document.getElementById('protectionToggle');
    toggle.addEventListener('click', () => {
      this.settings.isEnabled = !this.settings.isEnabled;
      this.saveSettings();
      this.updateUI();
    });

    // Delay slider
    const slider = document.getElementById('delaySlider');
    slider.addEventListener('input', (e) => {
      this.settings.delayTime = parseInt(e.target.value);
      this.updateDelayDisplay();
    });

    slider.addEventListener('change', () => {
      this.saveSettings();
      this.updatePresetButtons();
    });

    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = parseInt(btn.dataset.value);
        this.settings.delayTime = value;
        slider.value = value;
        this.saveSettings();
        this.updateUI();
      });
    });

    // Settings button
    document.getElementById('openSettings').addEventListener('click', () => {
      chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
    });
  }

  updateUI() {
    // Update toggle
    const toggle = document.getElementById('protectionToggle');
    const statusText = document.getElementById('statusText');
    
    if (this.settings.isEnabled) {
      toggle.classList.add('active');
      statusText.textContent = 'Active - All emails protected';
    } else {
      toggle.classList.remove('active');
      statusText.textContent = 'Disabled - Emails send immediately';
    }

    // Update delay slider and display
    document.getElementById('delaySlider').value = this.settings.delayTime;
    this.updateDelayDisplay();
    this.updatePresetButtons();
  }

  updateDelayDisplay() {
    const value = this.settings.delayTime;
    const display = document.getElementById('delayValue');
    
    if (value < 60) {
      display.textContent = `${value}s`;
    } else if (value < 3600) {
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      display.textContent = seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
    } else {
      display.textContent = `${Math.floor(value / 3600)}h`;
    }
  }

  updatePresetButtons() {
    document.querySelectorAll('.preset-btn').forEach(btn => {
      const value = parseInt(btn.dataset.value);
      btn.classList.toggle('active', value === this.settings.delayTime);
    });
  }

  async saveSettings() {
    try {
      await chrome.runtime.sendMessage({
        type: 'UPDATE_SETTINGS',
        settings: this.settings
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  async loadStats() {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_STATS' });
      if (response && response.stats) {
        this.updateStats(response.stats);
      }
    } catch (error) {
      console.log('Stats not loaded');
    }
  }

  updateStats(stats) {
    document.getElementById('emailsProtected').textContent = stats.emailsDelayed || 0;
    document.getElementById('mistakesPrevented').textContent = stats.emailsCancelled || 0;
    
    const total = (stats.emailsDelayed || 0);
    const prevented = (stats.emailsCancelled || 0);
    const successRate = total > 0 ? Math.round(((total - prevented) / total) * 100) : 100;
    document.getElementById('successRate').textContent = `${successRate}%`;
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SendShieldPopup();
});
