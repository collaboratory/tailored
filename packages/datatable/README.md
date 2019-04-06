@tailored/datatable
A simple and flexible datatable component.

## Props
* filters: PropTypes.array,
* columns: PropTypes.array.isRequired,
* endpoint: PropTypes.string.isRequired,
* hasPagination: PropTypes.bool,
* prepareRequest: PropTypes.func,
* onRecordClick: PropTypes.func,
* onResponseState: PropTypes.func,
* responseMap: PropTypes.object,
* loadInterval: PropTypes.number

## Usage
```js
import Button from "@tailored/button";
import DataTable from "@tailored/datatable";
const DataTableExample = () => (
    <DataTable
      filters={[
        {
            field: "name",
            component: props => <Input type="text" {...props} />
        } 
      ]}
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
              <Button to={row[col.field]}>
                Visit
              </Button>
            );
          }
        }
      ]}
      hasPagination={false}
      endpoint="https://api.github.com/orgs/collaboratory/repos"
    />
);
```