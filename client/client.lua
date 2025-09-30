local isUIOpen = false

-- Function to send message to React UI
function SendReactMessage(action, data)
    SendNUIMessage({
        type = action,
        data = data
    })
end

-- Function to open UI
function OpenUI()
    if isUIOpen then return end
    
    print("[CLIENT] Opening Server Info UI")
    isUIOpen = true
    
    -- Enable NUI focus
    SetNuiFocus(true, true)
    
    -- Send server data to UI
    SendNUIMessage({
        type = 'configData',
        ServerName = cfg.ServerName or "FiveM Server",
        MaxPlayers = cfg.MaxPlayers or 32,
        StartingMoney = cfg.StartingMoney or 5000,
        isPvpEnabled = cfg.EnablePvP or false
    })
    
    if cfg.debug then
        print("[DEBUG] UI opened with data:", json.encode({
            ServerName = cfg.ServerName,
            MaxPlayers = cfg.MaxPlayers,
            StartingMoney = cfg.StartingMoney,
            isPvpEnabled = cfg.EnablePvP
        }))
    end
end

-- Function to close UI
function CloseUI()
    if not isUIOpen then return end
    
    print("[CLIENT] Closing Server Info UI")
    isUIOpen = false
    
    -- Disable NUI focus
    SetNuiFocus(false, false)
    
    if cfg.debug then
        print("[DEBUG] UI closed")
    end
end

-- Register NUI callback for closing
RegisterNUICallback('closeBox', function(data, cb)
    if cfg.debug then
        print("[DEBUG] Received closeBox callback")
    end
    CloseUI()
    cb({ success = true })
end)

-- Key mapping
RegisterKeyMapping('openServerInfo', 'Open Server Info', 'keyboard', 'F1')

-- Commands
RegisterCommand('openServerInfo', function()
    if not isUIOpen then
        OpenUI()
    else
        CloseUI()
    end
end)

RegisterCommand("ui", function()
    if not isUIOpen then
        OpenUI()
    else
        CloseUI()
    end
end)

RegisterCommand("serverinfo", function()
    if not isUIOpen then
        OpenUI()
    else
        CloseUI()
    end
end)

-- Handle ESC key and disable controls while UI is open
CreateThread(function()
    while true do
        Wait(0)
        if isUIOpen then
            -- Disable some controls while UI is open
            DisableControlAction(0, 1, true)   -- LookLeftRight
            DisableControlAction(0, 2, true)   -- LookUpDown
            DisableControlAction(0, 24, true)  -- Attack
            DisableControlAction(0, 257, true) -- Attack2
            DisableControlAction(0, 25, true)  -- Aim
            
            -- Check for ESC key
            if IsControlJustPressed(0, 322) then -- ESC key
                CloseUI()
            end
        end
    end
end)

-- Export functions
exports('OpenUI', OpenUI)
exports('CloseUI', CloseUI)
exports('IsUIOpen', function() return isUIOpen end)

if cfg.debug then
    print("[DEBUG] lua-react-boilerplate client script loaded")
end