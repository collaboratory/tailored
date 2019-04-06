# @tailored/button
A flexible button component.

## Props
1. to - Optional Link destination

Supports [@tailored/util overrides](https://github.com/collaboratory/tailored/tree/develop/packages/util#overrides)

## Usage
```js
import { render } from "react-dom";
import Button from "@tailored/app";

render((
    <Button color="green" to="/" display="inline-block">
        Home
    </Button>
), document.getElementById("app"));
```

