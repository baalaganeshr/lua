fx_version "cerulean"
lua54 "yes"
games {"gta5"}

ui_page "build/index.html"
lua54 "yes"

shared_scripts {
  "@ox_lib/init.lua" -- uncomment if you are using ox_lib
}
server_script {
  "cfg/cfg.lua",
  "server/server.lua",
  "@oxmysql/lib/MySQL.lua"
}

client_script {
  "cfg/cfg.lua",
  "client/client.lua",
  "client/utils.lua"
}

files {
  "build/index.html",
  "build/**/*"
}
