import React from "react";
import { App } from "../packages/app";
import theme from "../packages/theme-default";
export const AppWrapper = story => (
  <App router="memory" theme={theme}>
    {story()}
  </App>
);
