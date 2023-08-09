// Show notification
function showNotification() {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Stay Hydrated!",
      message: "It's time to drink some water.",
    });
  }
  
  // Schedule notifications at the specified interval
  function scheduleNotifications() {
    chrome.storage.sync.get({ customInterval: 15 }, (result) => {
      const intervalMinutes = result.customInterval;
      chrome.alarms.create("hydrationReminder", { periodInMinutes: intervalMinutes });
    });
  }
  
  // Listen for alarm events
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "hydrationReminder") {
      showNotification();
    }
  });
  
  // Initial setup
  scheduleNotifications();
  
  // Open options page when extension icon is clicked
  chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: chrome.runtime.getURL("options.html") });
  });
  