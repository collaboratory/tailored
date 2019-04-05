import React from "react";

import { storiesOf } from "@storybook/react";
import { DataTable } from "../packages/datatable/src/main";
import { ButtonAnchor } from "../packages/button/src/main";
import { Input } from "../packages/form";
import {
  withKnobs,
  boolean,
  number,
  select
} from "@storybook/addon-knobs";
import { AppWrapper } from "./decorators";

let filter = "";

storiesOf("DataTable", module)
  .addDecorator(AppWrapper)
  .addDecorator(withKnobs)
  .add("standard configuration", () => (
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
