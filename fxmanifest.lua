fx_version "cerulean"
lua54 "yes"
games {"gta5"}

ui_page "build/index.html"
lua54 "yes"

shared_scripts {
  "cfg/cfg.lua",
  "@ox_lib/init.lua" -- uncomment if you are using ox_lib
}

server_script {
  "server/server.lua"
}

client_script {
  "client/client.lua"
}

files {
  "build/index.html",
  "build/**/*"
}
