import { createRoot } from "react-dom/client";
import { Button } from "./components/Button";
import { Download } from "lucide-react";

function Popup() {
  const handleDownload = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab.id) return;

    await chrome.tabs.sendMessage(tab.id, { type: "START_DOWNLOAD" });
  };

  return (
    <div style={{ padding: "16px", width: "200px" }}>
      <Button onClick={handleDownload} icon={<Download size={18} />}>
        Download Images
      </Button>
    </div>
  );
}

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<Popup />);
