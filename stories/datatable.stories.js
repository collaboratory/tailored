import React from "react";

import { storiesOf, setAddon } from "@storybook/react";
import { DataTable } from "../packages/datatable";
import { ButtonAnchor } from "../packages/button";
import { Input } from "../packages/form";
import {
  withKnobs,
  boolean,
  number,
  selectV2 as select
} from "@storybook/addon-knobs/react";
import { AppWrapper } from "./decorators";
import JSXAddon from "storybook-addon-jsx";
setAddon(JSXAddon);

let filter = "";

storiesOf("DataTable", module)
  .addDecorator(AppWrapper)
  .addDecorator(withKnobs)
  .addWithJSX("standard configuration", () => (
    <DataTable
      columns={[
        {
          field: "name",
          label: "Name"
        },
        {
          field: "html_url",
          label: "Link",
          format: function(row, col) {
            return (
              <ButtonAnchor target="_blank" href={row[col.field]}>
                Visit
              </ButtonAnchor>
            );
          }
        }
      ]}
      hasPagination={false}
      endpoint="https://api.github.com/users/aewing/repos"
    />
  ));
