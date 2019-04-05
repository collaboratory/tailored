import React from "react";

import { storiesOf } from "@storybook/react";
import App from "../packages/app";

const theme = {};

storiesOf("App", module)
  .add("hash router", () => (
    <App router="hash" theme={theme}>
      <p>This is an app.</p>
    </App>
  ))
  .add("memory router", () => (
    <App router="memory" theme={theme}>
      <p>This is an app.</p>
    </App>
  ));
