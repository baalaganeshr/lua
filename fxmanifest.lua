fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'YourName'
description 'Modern FiveM Resource with React UI - Server Information Display'
version '2.0.0'
url 'https://github.com/yourusername/lua-react-boilerplate'

-- UI Configuration
ui_page 'build/index.html'

-- Load configuration first
shared_scripts {
  'cfg/cfg.lua'
  -- '@ox_lib/init.lua' -- uncomment if you are using ox_lib
}

-- Server-side scripts
server_scripts {
  'server/server.lua'
  -- '@oxmysql/lib/MySQL.lua' -- uncomment if using oxmysql
}

-- Client-side scripts
client_scripts {
  'client/client.lua',
  'client/utils.lua'
}

-- Include all built files
files {
  'build/index.html',
  'build/assets/*'
}

-- Export functions for other resources
exports {
  'OpenUI',
  'CloseUI',
  'IsUIOpen'
}

print('^2[lua-react-boilerplate]^7 Resource manifest loaded!')
