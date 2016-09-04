# babel-plugin-test



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
$ npm install babel-plugin-test
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["test"]
}
```

### Via CLI

```sh
$ babel --plugins test script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["test"]
});
```
