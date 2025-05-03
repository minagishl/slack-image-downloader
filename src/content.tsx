import JSZip from "jszip";

const downloadImages = async () => {
  const imageUrls = Array.from(document.querySelectorAll("img"))
    .map((img) => img.src)
    .filter((src) => src.startsWith("https://files.slack.com/files-tmb/"));

  if (imageUrls.length === 0) {
    alert("No Slack images found on this page");
    return;
  }

  const zip = new JSZip();
  const folder = zip.folder("slack-images");
  if (!folder) return;

  let successCount = 0;
  const total = imageUrls.length;

  for (const url of imageUrls) {
    try {
      const match = url.match(/files-tmb\/([^-]+-[^-/]+)-[^/]+\/(.+)$/);
      if (!match) {
        console.warn(`URL format not matched: ${url}`);
        continue;
      }

      const teamAndFileId = match[1];
      const originalFilename = match[2];
      const filename = originalFilename.replace(/_(\d+)(\.\w+)$/, "$2");
      const newUrl = `https://files.slack.com/files-pri/${teamAndFileId}/${filename}`;

      const response = await fetch(newUrl, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const blob = await response.blob();
      folder.file(filename, blob);
      successCount++;
      console.log(`Added to ZIP: ${filename} (${successCount}/${total})`);
    } catch (error) {
      console.error(`Failed to download ${url}`, error);
    }
  }

  if (successCount > 0) {
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "slack-images.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log("ZIP file downloaded successfully");
  } else {
    alert("Failed to download any images");
  }
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "START_DOWNLOAD") {
    downloadImages().then(() => {
      chrome.runtime.sendMessage({ type: "DOWNLOAD_COMPLETE" });
    });
  }
});

console.log("Slack Image Downloader content script loaded");
