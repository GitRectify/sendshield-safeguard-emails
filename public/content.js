
// Email Magic: SendShield - Content Script for Gmail Integration
class SendShieldGmail {
  constructor() {
    this.isEnabled = true;
    this.delayIndicators = new Map();
    this.originalSendButtons = new Map();
    this.init();
  }

  init() {
    // Wait for Gmail to load
    this.waitForGmail(() => {
      this.injectStyles();
      this.interceptSendButtons();
      this.setupMessageListener();
      console.log('Email Magic: SendShield activated');
    });
  }

  waitForGmail(callback) {
    const checkGmail = () => {
      if (document.querySelector('[data-tooltip="Send ‪(Ctrl+Enter)‬"]') || 
          document.querySelector('[aria-label*="Send"]')) {
        callback();
      } else {
        setTimeout(checkGmail, 1000);
      }
    };
    checkGmail();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .sendshield-indicator {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(37, 99, 235, 0.95);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(10px);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 8px;
        animation: slideInRight 0.3s ease-out;
      }

      .sendshield-indicator .shield-icon {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }

      .sendshield-indicator .timer {
        font-weight: 600;
        color: #93c5fd;
      }

      .sendshield-cancel-btn {
        background: rgba(239, 68, 68, 0.9);
        border: none;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        margin-left: 8px;
        transition: background 0.2s;
      }

      .sendshield-cancel-btn:hover {
        background: rgba(239, 68, 68, 1);
      }

      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .sendshield-disabled {
        opacity: 0.6;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }

  interceptSendButtons() {
    // Monitor for new compose windows and send buttons
    const observer = new MutationObserver(() => {
      this.findAndReplaceSendButtons();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial scan
    this.findAndReplaceSendButtons();
  }

  findAndReplaceSendButtons() {
    // Find Gmail send buttons
    const sendButtons = document.querySelectorAll(
      '[data-tooltip="Send ‪(Ctrl+Enter)‬"], [aria-label*="Send"]:not(.sendshield-processed)'
    );

    sendButtons.forEach(button => {
      if (!button.classList.contains('sendshield-processed')) {
        this.replaceSendButton(button);
        button.classList.add('sendshield-processed');
      }
    });
  }

  replaceSendButton(originalButton) {
    // Store reference to original functionality
    const originalClick = originalButton.onclick;
    const originalEvents = this.getEventListeners(originalButton);

    // Override click behavior
    originalButton.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.handleSendClick(originalButton, originalClick);
    };

    // Store original button reference
    this.originalSendButtons.set(originalButton, {
      originalClick,
      originalEvents
    });
  }

  async handleSendClick(button, originalClick) {
    // Get current settings
    const response = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS' });
    const settings = response.settings;

    if (!settings.isEnabled) {
      // If disabled, send immediately
      this.executeOriginalSend(button, originalClick);
      return;
    }

    // Extract email data from compose window
    const composeWindow = button.closest('[role="dialog"], .nH');
    const emailData = this.extractEmailData(composeWindow);

    // Request delay from background script
    chrome.runtime.sendMessage({
      type: 'DELAY_EMAIL',
      data: emailData
    });

    // Disable the compose window
    this.disableComposeWindow(composeWindow);
  }

  extractEmailData(composeWindow) {
    // Extract email content (without storing sensitive data)
    const subject = composeWindow.querySelector('[name="subjectbox"]')?.value || '';
    const recipients = composeWindow.querySelector('[email]')?.getAttribute('email') || '';
    
    return {
      subject: subject.substring(0, 50), // Only store partial for identification
      recipientCount: recipients.split(',').length,
      hasAttachments: !!composeWindow.querySelector('[aria-label*="attachment"]'),
      timestamp: Date.now()
    };
  }

  disableComposeWindow(composeWindow) {
    composeWindow.classList.add('sendshield-disabled');
  }

  enableComposeWindow(composeWindow) {
    composeWindow.classList.remove('sendshield-disabled');
  }

  showDelayIndicator(emailId, delayTime) {
    const indicator = document.createElement('div');
    indicator.className = 'sendshield-indicator';
    indicator.innerHTML = `
      <svg class="shield-icon" viewBox="0 0 24 24">
        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7A2,2 0 0,1 14,9A2,2 0 0,1 12,11A2,2 0 0,1 10,9A2,2 0 0,1 12,7Z"/>
      </svg>
      <span>Email protected</span>
      <span class="timer">${delayTime}s</span>
      <button class="sendshield-cancel-btn" onclick="window.cancelSendShieldEmail('${emailId}')">Cancel</button>
    `;

    document.body.appendChild(indicator);
    this.delayIndicators.set(emailId, indicator);

    // Start countdown
    this.startCountdown(emailId, delayTime);

    // Add global cancel function
    window.cancelSendShieldEmail = (id) => {
      chrome.runtime.sendMessage({ type: 'CANCEL_EMAIL', emailId: id });
      this.hideDelayIndicator(id);
    };
  }

  startCountdown(emailId, initialTime) {
    let timeLeft = initialTime;
    const indicator = this.delayIndicators.get(emailId);
    
    const countdown = setInterval(() => {
      timeLeft--;
      if (indicator && indicator.querySelector('.timer')) {
        indicator.querySelector('.timer').textContent = `${timeLeft}s`;
      }

      if (timeLeft <= 0) {
        clearInterval(countdown);
        this.hideDelayIndicator(emailId);
      }
    }, 1000);
  }

  hideDelayIndicator(emailId) {
    const indicator = this.delayIndicators.get(emailId);
    if (indicator) {
      indicator.remove();
      this.delayIndicators.delete(emailId);
    }
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.type) {
        case 'EMAIL_DELAYED':
          this.showDelayIndicator(message.emailId, message.delayTime);
          break;
        
        case 'SEND_EMAIL':
          // Actually send the email now
          this.executePendingSend(message.emailId);
          break;
      }
    });
  }

  executePendingSend(emailId) {
    // Find the original send button and execute
    // This is a simplified version - real implementation would track the specific compose window
    const sendButton = document.querySelector('[data-tooltip="Send ‪(Ctrl+Enter)‬"]:not(.sendshield-processed)');
    if (sendButton) {
      const originalData = this.originalSendButtons.get(sendButton);
      if (originalData && originalData.originalClick) {
        originalData.originalClick.call(sendButton);
      }
    }
  }

  executeOriginalSend(button, originalClick) {
    if (originalClick) {
      originalClick.call(button);
    } else {
      // Fallback: trigger click event
      button.click();
    }
  }

  getEventListeners(element) {
    // Helper to preserve original event listeners
    return [];
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new SendShieldGmail());
} else {
  new SendShieldGmail();
}
