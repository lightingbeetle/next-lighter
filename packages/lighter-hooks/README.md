# Lighter hooks

This is fork of [enhook library](https://github.com/unihooks/enhook) for running hooks outside React/Preact environment.

```js
import hookIt from "@lighting-beetle/lighter-hooks";
import { useState, useEffect } from "react";

let countFrom = hookIt((initCount) => {
  let [count, setCount] = useState(initCount);

  setTimeout(() => {
    setCount(++count);
  }, 1000);

  // any side-effects
  useEffect(() => console.log(count), [count]);
});

const instance = countFrom(0);

// Unmount
// instance.unhookIt();
```

## Install

`npm install @lighting-beetle/lighter-hooks`

## Build

- `npm run build` in this package
- `npm run build:components` in the root of this project
