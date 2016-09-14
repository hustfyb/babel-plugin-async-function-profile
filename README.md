# babel-plugin-async-function-profile

Auto add count function in async function to get true time spend in a function (not just cpu tick).

## Installation

```sh
$ npm install babel-plugin-async-function-profile
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["async-function-profile"]
}
```

### Via CLI

```sh
$ babel --plugins async-function-profile script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["async-function-profile"]
});
```
