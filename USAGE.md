# Usage Guide

## FiveM Integration

### Installation
1. Copy the `lua-react-boilerplate` folder to your FiveM server's `resources` directory
2. Add `ensure lua-react-boilerplate` to your `server.cfg`
3. Restart your server or use `refresh` and `start lua-react-boilerplate`

### Commands

#### Player Commands
- `/serverinfo` - Toggle the server information UI
- `F1` - Default keybind to open/close UI (can be remapped in FiveM settings)

#### Admin Commands
- `/openui [playerid]` - Force open UI for a specific player
- `/serverstats` - Display server statistics in chat

### Key Bindings
- **F1** - Open/Close Server Info UI
- **ESC** - Close UI when open

### Configuration

Edit `cfg/cfg.lua` to customize:
- Default keybinds
- Auto-show settings
- Server information
- Permissions

### Server Convars

Add these to your `server.cfg` to customize server info:
```cfg
# Server Information
set sv_projectName "Your Server Name"
set sv_maxclients 64
set qb_startingmoney 10000
set sv_pvp 1  # 1 for enabled, 0 for disabled
```

## Development

### Browser Testing
1. Navigate to `web/` directory
2. Run `npm install`
3. Run `npm run dev`
4. Open browser to test UI
5. Use demo controls to test functionality

 ### Building
1. Run `npm run build` in the `web/` directory
2. Files are built to `build/` directory
3. Restart FiveM resource to see changes

### Watch Mode (Development)
1. Run `npm run watch` in the `web/` directory
2. Files are automatically rebuilt on changes
3. Refresh FiveM resource to see updates

## Troubleshooting

### UI Not Showing
- Check F8 console for errors
- Ensure resource is started: `ensure lua-react-boilerplate`
- Check if UI is already open
- Try `/serverinfo` command

### NUI Errors
- Check browser console (F12 in FiveM)
- Ensure files are built: `npm run build`
- Check file paths in fxmanifest.lua

### Build Errors
- Run `npm install` in web directory
- Check Node.js version (16+ recommended)
- Clear node_modules and reinstall if needed

## API Reference

### Client Exports
```lua
-- Open the UI
exports['lua-react-boilerplate']:OpenUI()

-- Close the UI
exports['lua-react-boilerplate']:CloseUI()

-- Check if UI is open
local isOpen = exports['lua-react-boilerplate']:IsUIOpen()
```

### NUI Messages

#### Sending data to UI:
```lua
SendNUIMessage({
    type = 'configData',
    ServerName = "My Server",
    MaxPlayers = 64,
    StartingMoney = 5000,
    isPvpEnabled = true
})
```

#### Receiving callbacks from UI:
```lua
RegisterNUICallback('closeBox', function(data, cb)
    -- Handle close event
    cb({ success = true })
end)
```

## Framework Integration

### QBCore
The resource includes QBCore integration. Uncomment the dependency in fxmanifest.lua.

### ESX
For ESX integration, modify the client/server scripts to use ESX events instead of QBCore.

### Standalone
The resource works standalone without any framework dependencies.
