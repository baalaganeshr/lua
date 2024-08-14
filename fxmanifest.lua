fx_version "cerulean"
lua54 "yes"
games {"gta5"}

ui_page "web/build/index.html"
lua54 "yes"

dependencies {
  "vrp"
}

server_script {
  "@vrp/lib/utils.lua",
  "server_vrp.lua"
}

client_script {
  "@vrp/lib/utils.lua",
  "cl_vrp.lua"
}

files {
  "client.lua",
  "cfg/cfg.lua",
  "web/build/index.html",
  "web/build/**/*"
}
