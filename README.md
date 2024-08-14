<div align="center">
    <img href="https://projecterror.dev" width="150" src="https://i.tasoagc.dev/c1pD" alt="Material-UI logo" />
</div>

<h1 align="center">FiveM React and Lua Boilerplate</h1>

<div align="center">
A simple and extendable React (TypeScript) boilerplate designed around the Lua ScRT and vRP framework.
</div>

<div align="center">
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/project-error/pe-utils/master/LICENSE)
![Discord](https://img.shields.io/discord/791854454760013827?label=Our%20Discord)
![David](https://img.shields.io/david/project-error/fivem-react-boilerplate-lua)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=project-error/fivem-react-boilerplate-lua)](https://dependabot.com)
</div>

This repository is a basic boilerplate for getting started with React in NUI, integrated with Lua ScRT and designed to be compatible with the vRP framework for FiveM. It contains several helpful utilities and is bootstrapped using `create-react-app`. It supports both browser and in-game development workflows.

## Requirements

- [Node > v10.6](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install) (Preferred but not required)
- A basic understanding of modern web development workflow

## Getting Started

1. **Clone the repository** or use the template option and place it within your `resources` folder.
2. **Install dependencies** by navigating to the `web` folder within a terminal of your choice and type `npm i` or `yarn`.

## Features

### Lua Utils

**SendReactMessage**

A wrapper for dispatching NUI messages, designed to be used with the `useNuiEvent` React hook.

**Signature**

```lua
---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
SendReactMessage(action, data)
```

## Usage

```
SendReactMessage('setVisible', true)
```

## debugPrint

A debug printing utility dependent on a convar. To enable debug mode, add setr YOUR_RESOURCE_NAME-debugMode 1 to your server.cfg.

## Signature

## lua

```
---@param ... any[] The arguments you wish to send
debugPrint(...)
```

## Usage

## lua

debugPrint('wow cool string to print', true, someOtherVar)

## React Utils

```
useNuiEvent
A custom React hook for intercepting and handling messages dispatched by game scripts.
```

Usage

jsx

const MyComp: React.FC = () => {
const [state, setState] = useState('');

useNuiEvent<string>('myAction', (data) => {
setState(data);
});

return (
<div>
<h1>Some component</h1>
<p>{state}</p>
</div>
);
}

fetchNui

A wrapper around the standard fetch API for NUI data fetching or triggering NUI callbacks in game scripts.

Usage

ts

fetchNui<ReturnData>('getClientData').then(retData => {
console.log('Got return data from client scripts:');
console.dir(retData);
setClientData(retData);
}).catch(e => {
console.error('Setting mock data due to error', e);
setClientData({ x: 500, y: 300, z: 200 });
});

debugData

Allows for mocking dispatched game script actions in a browser environment.

Usage

ts

debugData([
{
action: 'setVisible',
data: true,
}
]);

Misc Utils

    isEnvBrowser() - Returns a boolean indicating if the current environment is a regular browser.

Development Workflow
Hot Builds In-Game

For in-game development, use the hot build system by running the start:game script. This writes to disk, so only a resource restart is needed to update the game script.

Usage

sh

# yarn

yarn start:game

# npm

npm run start:game

Production Builds

To create an optimized and minimized production build, run:

sh

npm run build
yarn build

vRP Integration

This boilerplate can be used with the vRP framework. Ensure you have both a default CFX server and the vRP framework installed.

    Create a FiveM server
    Installing vRP

Installation

    Download and extract the vrp_template to your resources folder.
    Ensure vrp_template is included in your server configuration.

Documentation and Support

    vRP Documentation
    vRP Discord

Additional Notes

Need further support? Join our Discord!
