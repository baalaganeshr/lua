RegisterCommand("ui", function()
  SetNuiFocus(true, true) -- allows mouse and keyboard input in the UI
  
	
	SendReactMessage('configData', {
		ServerName    = cfg.ServerName,
		MaxPlayers    = cfg.MaxPlayers,
		StartingMoney = cfg.StartingMoney,
		isPvpEnabled  = cfg.EnablePvP
	})
end)