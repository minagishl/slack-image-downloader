# Slack Image Downloader

A Chrome extension that allows you to download images from Slack conversations efficiently.

## Important Note

For the image downloader to work properly, **all target images must be visible in the current view**. This is because the extension can only process images that are actually loaded in the DOM. Images that are not yet loaded (due to lazy loading or being outside the viewport) cannot be downloaded.

## Features

- Downloads images from Slack conversations
- Easy-to-use browser extension interface
- Processes only visible images in the current view
- Built as a Chrome extension for seamless integration

## Technology Stack

- React 19
- TypeScript
- Vite

## Development Setup

1. Install dependencies:

```bash
pnpm install
```

2. Build the project:

```bash
pnpm build
```

## Installation

1. Run `pnpm build` to create the production build
2. Open `chrome://extensions` in Chrome browser
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `dist` folder

## Usage

1. Open a Slack conversation containing images
2. Scroll to ensure all desired images are loaded and visible in the view
3. Click the extension icon to begin the download process
4. Only images that are currently visible in the DOM will be processed

## Technical Details

- Built with TypeScript for robust type safety
- Vite for fast development and optimized builds
- Chrome Extension Manifest V3 compliant
- Biome for consistent code formatting and linting

## Requirements

- Node.js 20 or higher
- pnpm package manager

## License

Please see the [LICENSE](LICENSE) file for details.
