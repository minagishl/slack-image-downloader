chrome.runtime.onInstalled.addListener(() => {
  console.log("Slack Image Downloader extension installed");
});

// Enable access to Slack when the extension is in use
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id && tab.url) {
    try {
      const url = new URL(tab.url);
      if (url.hostname.endsWith("slack.com")) {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            console.log("Slack Image Downloader extension activated");
          },
        });
      }
    } catch (e) {
      console.error("Invalid URL:", e);
    }
  }
});
