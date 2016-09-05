# babel-plugin-async-function-profile



## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

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
