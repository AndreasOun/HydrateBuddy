document.addEventListener("DOMContentLoaded", () => {
    const intervalInput = document.getElementById("interval");
    const saveButton = document.getElementById("save");
    const statusMessage = document.getElementById("status");
  
    // Restore the saved interval
    chrome.storage.sync.get({ customInterval: 15 }, (result) => {
      intervalInput.value = result.customInterval;
    });
  
    saveButton.addEventListener("click", () => {
      const customInterval = parseInt(intervalInput.value);
      if (isNaN(customInterval) || customInterval <= 0) {
        statusMessage.textContent = "Please enter a valid interval.";
        return;
      }
      // Add the validation to prevent negative values
      if (customInterval < 0) {
        statusMessage.textContent = "Interval cannot be negative.";
        return;
      }
      chrome.storage.sync.set({ customInterval }, () => {
        statusMessage.textContent = "Interval saved.";
      });
    });
  });
  