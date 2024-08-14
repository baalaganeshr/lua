local vRPxReactTemplate = class("vRPxReactTemplate", vRP.Extension)
vRPxReactTemplate.event = {}
vRPxReactTemplate.tunnel = {}

local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage("setVisible", shouldShow)
end

RegisterCommand(
  "show-nui",
  function()
    toggleNuiFrame(true)
    debugPrint("Show NUI frame")
  end
)

RegisterNUICallback(
  "hideFrame",
  function(_, cb)
    toggleNuiFrame(false)
    debugPrint("Hide NUI frame")
    cb({})
  end
)

function vRPxReactTemplate:__construct()
  vRP.Extension.__construct(self)
end

vRP:registerExtension(vRPxReactTemplate)
