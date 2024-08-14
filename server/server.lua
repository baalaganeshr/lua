local vRPxReactTemplate = class("vRPxReactTemplate", vRP.Extension)
vRPxReactTemplate.event = {}
vRPxReactTemplate.tunnel = {}

function vRPxReactTemplate:__construct()
  vRP.Extension.__construct(self)
end

vRP:registerExtension(vRPxReactTemplate)
