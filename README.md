# Information
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

# Usage

```
SendReactMessage('setVisible', true)
```

# debugPrint

A debug printing utility dependent on a convar. To enable debug mode, add setr YOUR_RESOURCE_NAME-debugMode 1 to your server.cfg.

# Signature

## lua

---@param ... any[] The arguments you wish to send
debugPrint(...)

# Usage

## lua

debugPrint('wow cool string to print', true, someOtherVar)

React Utils

useNuiEvent

A custom React hook for intercepting and handling messages dispatched by game scripts.
