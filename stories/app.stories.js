import React from "react";

import { storiesOf, setAddon } from "@storybook/react";
import { App } from "../packages/app";
import JSXAddon from "storybook-addon-jsx";
setAddon(JSXAddon);

const theme = {};

storiesOf("App", module)
  .addWithJSX("hash router", () => (
    <App router="hash" theme={theme}>
      <p>This is an app.</p>
    </App>
  ))
  .addWithJSX("memory router", () => (
    <App router="memory" theme={theme}>
      <p>This is an app.</p>
    </App>
  ));
