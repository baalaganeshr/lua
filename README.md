# 🚀 lua-react-boilerplate - FULLY FUNCTIONAL

A modern, production-ready FiveM resource with a beautiful React UI for displaying server information.

## ✅ What's New - Completely Overhauled!

### 🎨 **Visual Overhaul**
- **Modern Glassmorphism UI** with backdrop blur effects
- **Animated Background** with floating particles  
- **Smooth Animations** for all interactions
- **Responsive Design** that works on all screen sizes
- **Professional Typography** with Google Fonts

### ⚡ **Full Functionality**
- **Browser Testing Mode** with demo controls
- **Proper FiveM Integration** with NUI callbacks
- **Keyboard Shortcuts** (F1 to toggle, ESC to close)
- **Error Handling** for all operations
- **Debug Logging** for troubleshooting

## 🎮 Quick Start

### Installation
1. Copy to your `resources` folder
2. Add `ensure lua-react-boilerplate` to `server.cfg`  
3. Restart server
4. Press **F1** in-game to test!

### Development
```bash
cd web
npm install
npm run dev    # Browser testing
npm run build  # Production build
```
* Extract to your resources folder.
* Rename the file to whatever you want, and begin coding.
* Don't forget to add the name of your folder to your server.cfg file, and restart your server.

# Console commands required for UI:
* npm run build - Typing this into your VSCode console will make the react files compile into html, js, and css code, for FiveM to use as a UI.
* npm run watch - Typing this into your VSCode console will automatically build your files when you save. This is useful if you don't want to constantly type `npm run build` after every save.
* npm run dev - Typing this into your VSCode console will allow you to view your UI in your web browser. This is useful to avoid constantly restarting your script for little changes in the UI, such as moving a button 10 pixels.

# Help
If you are confused on how to get started with React, I recommend watching ReactJS tutorials on YouTube to get a basic understanding on how ReactJS works. There may not be a ton of videos covering ReactJS for UI in FiveM, but regular website building tutorials on ReactJS will teach you as much as you need.

I do have some tutorials going over using ReactJS and Typescript together for FiveM. You can watch these tutorials to learn a tiny bit of react, but it may be confusing, since the fivem script is not written in lua, it's written in Typescript.