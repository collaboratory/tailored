import React from "react";

import { storiesOf, setAddon } from "@storybook/react";
import { Button, ButtonLink, ButtonAnchor } from "../packages/button";
import {
  withKnobs,
  boolean,
  number,
  selectV2 as select
} from "@storybook/addon-knobs/react";
import { AppWrapper } from "./decorators";
import JSXAddon from "storybook-addon-jsx";
setAddon(JSXAddon);

const colors = {
  Primary: "primary",
  Secondary: "secondary",
  Tertiary: "tertiary",
  White: "white",
  Black: "black",
  Red: "red",
  Green: "green",
  Blue: "blue",
  Orange: "orange",
  Purple: "purple",
  "Primary (l-2)": "primary-l-2",
  "Primary (d-2)": "primary-d-2",
  None: ""
};

storiesOf("Button", module)
  .addDecorator(AppWrapper)
  .addDecorator(withKnobs)
  .addWithJSX("standard button", () => (
    <Button
      bg={select("Background Color", colors, "primary")}
      color={select("Foreground Color", colors, "white")}
      borderColor={select("Border Color", colors, null)}
      disabled={boolean("Disabled", false)}
      block={boolean("Block", false)}
      fullWidth={boolean("Full Width", false)}
      p={number("Padding", 1)}
      m={number("Margin", 1)}
    >
      Standard Button
    </Button>
  ))
  .addWithJSX("linked button", () => (
    <ButtonLink
      to="/"
      bg={select("Background Color", colors, "primary")}
      color={select("Foreground Color", colors, "white")}
      borderColor={select("Border Color", colors, null)}
      disabled={boolean("Disabled", false)}
      block={boolean("Block", false)}
      p={number("Padding", 1)}
      m={number("Margin", 1)}
    >
      Linked Button
    </ButtonLink>
  ))
  .addWithJSX("anchor button", () => (
    <ButtonAnchor
      href="/"
      bg={select("Background Color", colors, "primary")}
      color={select("Foreground Color", colors, "white")}
      borderColor={select("Border Color", colors, null)}
      disabled={boolean("Disabled", false)}
      block={boolean("Block", false)}
      p={number("Padding", 1)}
      m={number("Margin", 1)}
    >
      Anchor Button
    </ButtonAnchor>
  ));
