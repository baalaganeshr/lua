local QBCore = exports['qb-core']:GetCoreObject()

-- Server events
RegisterServerEvent('lua-react-boilerplate:server:requestData')
AddEventHandler('lua-react-boilerplate:server:requestData', function()
    local src = source
    print("[SERVER] Data requested by player: " .. src)
    
    -- Get server configuration
    local serverData = {
        ServerName = GetConvar('sv_projectName', 'FiveM Server'),
        MaxPlayers = GetConvarInt('sv_maxclients', 32),
        StartingMoney = GetConvarInt('qb_startingmoney', 5000),
        isPvpEnabled = GetConvarInt('sv_pvp', 0) == 1
    }
    
    -- Send data back to client
    TriggerClientEvent('lua-react-boilerplate:client:receiveData', src, serverData)
end)

-- Command to force open UI for a player
RegisterCommand('openui', function(source, args, rawCommand)
    local playerId = tonumber(args[1]) or source
    
    if playerId == 0 and source == 0 then
        print('[SERVER] Please specify a player ID when using from console')
        return
    end
    
    TriggerClientEvent('lua-react-boilerplate:client:openUI', playerId)
    print('[SERVER] Triggered UI open for player: ' .. playerId)
end, true)

-- Command to get server stats
RegisterCommand('serverstats', function(source, args, rawCommand)
    local playerCount = #GetPlayers()
    local maxPlayers = GetConvarInt('sv_maxclients', 32)
    local serverName = GetConvar('sv_projectName', 'FiveM Server')
    
    local message = string.format('^2[SERVER STATS]^7\n^3Server Name:^7 %s\n^3Players:^7 %d/%d\n^3PvP:^7 %s', 
        serverName, 
        playerCount, 
        maxPlayers, 
        GetConvarInt('sv_pvp', 0) == 1 and 'Enabled' or 'Disabled'
    )
    
    if source == 0 then
        print(message)
    else
        TriggerClientEvent('chat:addMessage', source, {
            args = { message }
        })
    end
end, true)

-- Player connecting event
AddEventHandler('playerConnecting', function(name, setKickReason, deferrals)
    local src = source
    print('[SERVER] Player connecting: ' .. name .. ' (ID: ' .. src .. ')')
end)

-- Player joined event
AddEventHandler('QBCore:Server:PlayerLoaded', function(Player)
    print('[SERVER] Player loaded: ' .. Player.PlayerData.name .. ' (ID: ' .. Player.PlayerData.source .. ')')
end)

print('[SERVER] lua-react-boilerplate server script loaded')