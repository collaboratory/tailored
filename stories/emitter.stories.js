import React from "react";

import { storiesOf, setAddon } from "@storybook/react";
import { Emitter, withEmitter } from "../packages/emitter";
import { Button } from "../packages/button";
import { AppWrapper } from "./decorators";
import JSXAddon from "storybook-addon-jsx";
setAddon(JSXAddon);

storiesOf("Emitter", module)
  .addDecorator(AppWrapper)
  .addWithJSX("example configuration", () => (
    <Emitter channel="storybook">
      {withEmitter("storybook", ({ emitter }) => {
        emitter.on("clicked", e => alert("Clicked"));
        return <Button onClick={emitter.emit("clicked")}>Click Me</Button>;
      })}
    </Emitter>
  ));
