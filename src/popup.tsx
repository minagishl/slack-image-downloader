import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./components/Button";
import { Download } from "lucide-react";

function Popup() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab.id) return;

    try {
      await chrome.tabs.sendMessage(tab.id, { type: "START_DOWNLOAD" });

      // Wait for download completion message
      const handleDownloadComplete = (message: { type: string }) => {
        if (message.type === "DOWNLOAD_COMPLETE") {
          setIsLoading(false);
          chrome.runtime.onMessage.removeListener(handleDownloadComplete);
        }
      };

      chrome.runtime.onMessage.addListener(handleDownloadComplete);
    } catch (error) {
      console.error("Error sending message to content script:", error);
      alert("Failed to send message to content script.");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "16px", width: "200px" }}>
      <Button
        onClick={handleDownload}
        disabled={isLoading}
        icon={<Download size={18} />}
      >
        Download Images
        {isLoading && (
          <div
            style={{
              width: "8px",
              height: "8px",
              border: "1.5px solid #ffffff",
              borderTop: "1.5px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        )}
      </Button>
    </div>
  );
}

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<Popup />);
