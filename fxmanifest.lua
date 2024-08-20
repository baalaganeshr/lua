fx_version "cerulean"
lua54 "yes"
games {"gta5"}

ui_page "web/build/index.html"
lua54 "yes"

server_script {
  "server.lua"
}

client_script {
  "client.lua"
}

files {
  "cfg/cfg.lua",
  "web/build/index.html",
  "web/build/**/*"
}
