-- Configuration file for lua-react-boilerplate
cfg = {}

-- Debug settings
cfg.debug = true -- Enable debug mode. This prints debug messages to the client/server console if true.

-- Server Information Display Settings
cfg.ServerName = "My Awesome FiveM Server"  -- Server name to display
cfg.MaxPlayers = 32                         -- Maximum players (usually matches sv_maxclients)
cfg.StartingMoney = 5000                    -- Starting money for new players
cfg.EnablePvP = false                       -- Whether PvP is enabled on the server

-- UI Settings
cfg.DefaultKey = "F1"                       -- Default key to open UI
cfg.AutoShowOnSpawn = false                 -- Show UI automatically when player spawns
cfg.AllowAllPlayers = true                  -- Allow all players to use the UI

-- Animation Settings
cfg.FadeInDuration = 600                    -- UI fade in duration (ms)
cfg.FadeOutDuration = 300                   -- UI fade out duration (ms)

if cfg.debug then
    print("[DEBUG] Configuration loaded: " .. cfg.ServerName)
end
