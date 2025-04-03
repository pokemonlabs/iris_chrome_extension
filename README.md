# Iris Chrome Extension

A Chrome extension that integrates AI capabilities directly into your browser experience. The primary goal of this project is to demonstrate that advanced AI capabilities can be seamlessly integrated directly into the Chrome browser without requiring external applications or services.

## 🎬 Demo

https://res.cloudinary.com/ddg8uxqb1/video/upload/v1743690209/iris_linkedin_gwyuyi.mp4

<a href="https://res.cloudinary.com/ddg8uxqb1/video/upload/v1743690209/iris_linkedin_gwyuyi.mp4" target="_blank">
  <img src="https://res.cloudinary.com/ddg8uxqb1/video/upload/c_scale,w_800/v1743690209/iris_linkedin_gwyuyi.jpg" alt="Iris Chrome Extension Demo">
</a>

## 🚨 Experimental Project

**Note:** This is an experimental project and is still under active development. Some features may not work as expected:

- **Click Handlers:** Browser interactions like clicking elements may be inconsistent. We're working on improving these handlers. As a workaround, you can use [keyboard shortcuts](#keyboard-shortcuts) for more reliable navigation.

- **Browser Compatibility:** Currently optimized for Chrome and Chromium-based browsers.

- **Extension Sandbox Limitations:**
  - Limited access to certain browser APIs due to Chrome's extension sandbox security model
  - Cannot access privileged browser pages (chrome:// URLs)
  - Cross-origin restrictions limit interactions with iframes from different domains
  - Content scripts have restricted access to the webpage's JavaScript environment
  - Local file access is restricted for security reasons
  - API rate limits may affect performance with rapid or complex interactions

## ✨ Features

- AI-powered browser assistance via sidepanel
- Webpage interaction capabilities
- Screenshot and visual analysis
- Navigation controls for browsing assistance
- Contextual understanding of web content

## 🛠️ Installation

### Developer Mode

1. Clone this repository:
   ```
   git clone https://github.com/your-username/iris-chrome-extension.git
   cd iris-chrome-extension
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Build the extension:
   ```
   bun run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top-right corner
   - Click "Load unpacked" and select the `dist` folder in the project directory

## 🔧 Development

### Scripts

- Build: `bun run build`
- Watch for changes: `bun run watch`
- Build icons: `bun run build:icons`
- Build manifest: `bun run build:manifest`

### Project Structure

- `src/` - TypeScript source files
  - `background.ts` - Service worker background script
  - `content-script.ts` - Content script for webpage interaction
  - `sidepanel.ts` - Sidepanel UI logic
  - `manifest.ts` - Extension manifest configuration
- `public/` - Static assets
- `dist/` - Build output directory

## <a id="keyboard-shortcuts"></a>⌨️ Keyboard Shortcuts

For more reliable navigation when click handlers aren't working:

- **Tab**: Move focus to the next clickable element
- **Enter**: Click the focused element
- **Escape**: Cancel current operation

## 🔍 Our Focus

This extension serves as a proof-of-concept that advanced AI capabilities can be delivered directly through a browser extension, providing a seamless user experience without requiring external tools. By integrating AI directly into Chrome, we're demonstrating the potential for browser-native AI assistants that can understand and interact with web content in sophisticated ways.

While this browser extension is a significant step forward, our main focus continues to be on developing even more capable computer use agents that can perform complex tasks across entire operating systems. These agents are designed to understand and interact with computer interfaces in a more comprehensive way.

## 📝 License

[MIT License](LICENSE)

## 🗺️ Roadmap

Here are our planned enhancements for future releases:

- **UI TARS Integration:** Integrate with UI TARS for improved visual understanding and interaction capabilities
- **Local LLM Support:** Add support for running models locally to enhance privacy and reduce latency
- **Cross-browser Compatibility:** Extend support to Firefox, Safari, and other browsers
- **Enhanced DOM Navigation:** Improved element selection and manipulation capabilities
- **Workflow Automation:** Enable creation and execution of multi-step browser workflows
- **Offline Mode:** Core functionality that works without internet connection
- **Accessibility Features:** Improved screen reader compatibility and accessibility options

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request