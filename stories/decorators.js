import React from "react";
import { App } from "../packages/app/src/main";
import theme from "../packages/theme-default/src/main";
export const AppWrapper = story => (
  <App router="memory" theme={theme}>
    {story()}
  </App>
);
