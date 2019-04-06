// React packages
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// Utility packages
import axios from "axios";
import debounce from "debounce";
import uniqid from "uuid/v4";
import { merge } from "lodash";

// Package components
import { Box } from "@tailored/grid";
import Paginator from "@tailored/paginator";
import { Table, THead, TBody, Col, HCol, Row } from "@tailored/table";
import Indicator from "@tailored/indicator";

// Local components
import DataTableRoot from "./DataTableRoot";
import DataTableContainer from "./DataTableContainer";
import DataTableHeader from "./DataTableHeader";
import DataTableFooter from "./DataTableFooter";
import DataTableContent from "./DataTableContent";

// The default mapping for response fields
const defaultResponseKeys = {
  page: "page",
  pages: "pages",
  count: "count",
  pageSize: "pageSize",
  records: "records"
};

export class DataTableComponent extends Component {
  interval = false;
  state = {
    data: {},
    loading: true,
    sorting: {},
    filters: {},
    search: "",
    page: 1,
    pageSize: 25,
    pageCount: 1
  };

  static propTypes = {
    filters: PropTypes.array,
    columns: PropTypes.array.isRequired,
    endpoint: PropTypes.string.isRequired,
    hasPagination: PropTypes.bool,
    prepareRequest: PropTypes.func,
    onRecordClick: PropTypes.func,
    onResponseState: PropTypes.func,
    responseMap: PropTypes.object,
    loadInterval: PropTypes.number
  };

  static defaultProps = {
    hasPagination: true
  };

  checkInterval(props = false) {
    props = props || this.props;
    if (props.loadInterval && this.interval === false) {
      this.interval = setInterval(this.load, props.loadInterval);
    }
  }

  componentDidMount() {
    this.load();
    this.checkInterval();
  }

  componentDidUpdate() {
    this.checkInterval();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = false;
  }

  async prepareRequest(request) {
    if (this.props.prepareRequest) {
      return this.props.prepareRequest(request, this.state);
    }

    return request;
  }

  load = debounce(async () => {
    const { search, sorting, filters, page, pageSize } = this.state;
    const { endpoint } = this.props;

    const res = await axios
      .get(
        endpoint,
        await this.prepareRequest({
          params: {
            page,
            pageSize,
            search,
            sorting,
            filters
          }
        })
      )
      .catch(err => {
        this.setState({
          loading: false,
          error: err
        });
        return false;
      });

    if (res === false) {
      return;
    }

    if (this.props.onResponseState) {
      const nextState = await this.props.onResponseState(res, this.state);
      if (nextState) {
        this.setState({
          loading: false,
          ...nextState
        });
      } else {
        this.setState({
          loading: false,
          error: "ERR_DT_RESPONSE_STATE"
        });
      }
    } else if (this.props.hasPagination === false) {
      this.setState({
        loading: false,
        page: 1,
        pages: 1,
        pageSize: res.data.length,
        count: res.data.length,
        records: res.data
      });
    } else {
      const { responseMap = {} } = this.props;
      const mappedResponse = merge(defaultResponseKeys, responseMap);

      const mappedState = {
        loading: false,
        page: parseInt(res.data[mappedResponse.page] || 1, 10),
        pages: parseInt(res.data[mappedResponse.pages] || 1),
        pageSize: parseInt(res.data[mappedResponse.pageSize] || 25),
        count: parseInt(res.data[mappedResponse.pageCount] || 0),
        records: res.data[mappedResponse.records] || []
      };

      this.setState(mappedState);
    }
  }, 200);

  onPageChange = page => {
    this.setState({ page, loading: true }, () => {
      this.load();
    });
  };

  formatCol(col, row) {
    return col.format ? col.format(row, col) : row[col.field];
  }

  sortToggle(field) {
    const { sorting } = this.state;
    sorting[field] = sorting[field] === "asc" ? "desc" : "asc";
    this.setState({
      sorting
    });
  }

  onFieldChange(id) {
    return e => {
      const filters = this.state.filters;
      filters[id] = e.target.value;
      this.setState({ filters });
    };
  }

  render() {
    const colCount = this.props.columns ? this.props.columns.length + 1 : 1;

    return (
      <DataTableRoot loading={this.state.loading}>
        <DataTableContainer>
          {this.props.filters ? (
            <DataTableHeader>
              <Box>
                {this.props.filters &&
                  this.props.filters.map((filter, i) => {
                    return (
                      <Box key={uniqid()} p={1}>
                        <filter.component
                          name={`filter.${filter.id}`}
                          onChange={this.onFieldChange(filter.id)}
                        />
                      </Box>
                    );
                  })}
              </Box>
            </DataTableHeader>
          ) : null}
          <DataTableContent hasFilters={!!this.props.filters}>
            <Table
              fullHeight={this.state.loading}
              cellPadding={8}
              cellSpacing={0}
              width="100%"
            >
              <THead>
                <Row key={uniqid()}>
                  {this.props.columns &&
                    this.props.columns.map(col => (
                      <HCol
                        key={uniqid()}
                        width={col.width || "auto"}
                        onClick={e =>
                          !!col.sortable && this.sortToggle(col.field)
                        }
                      >
                        {col.label}
                      </HCol>
                    ))}
                </Row>
              </THead>
              {this.state.loading ? (
                <TBody>
                  <Row key={uniqid()}>
                    <Col colSpan={colCount}>
                      <Indicator height="64px" width="64px" color="secondary" />
                    </Col>
                  </Row>
                </TBody>
              ) : (
                <TBody>
                  {this.state.records && this.state.records.length ? (
                    this.state.records.map((row, i) => {
                      return row ? (
                        <Row
                          key={uniqid()}
                          onClick={e =>
                            this.props.onRecordClick
                              ? this.props.onRecordClick(row, e)
                              : null
                          }
                        >
                          {this.props.columns.map(col => (
                            <Col key={uniqid()}>{this.formatCol(col, row)}</Col>
                          ))}
                        </Row>
                      ) : null;
                    })
                  ) : (
                    <Row key={uniqid()}>
                      <HCol colSpan={colCount}>
                        Oops! There are no records to display...
                      </HCol>
                    </Row>
                  )}
                </TBody>
              )}
            </Table>
          </DataTableContent>
        </DataTableContainer>
        {this.props.hasPagination && (
          <DataTableFooter>
            <Paginator
              onPageChange={this.onPageChange}
              page={this.state.page}
              pages={this.state.pageCount}
            />
          </DataTableFooter>
        )}
      </DataTableRoot>
    );
  }
}
export const DataTable = withRouter(DataTableComponent);
DataTable.displayName = "DataTable";
export default DataTable;
