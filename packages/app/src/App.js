import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import baseStyles from "./BaseStyles";
const Styles = baseStyles();

export default class App extends Component {
  static propTypes = {
    router: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.any
  };

  render() {
    const { router, theme } = this.props;
    const AppRouter =
      router === "hash"
        ? HashRouter
        : router === "browser"
          ? BrowserRouter
          : ["staging", "production"].indexOf(process.env.NODE_ENV) !== -1
            ? BrowserRouter
            : HashRouter;

    return (
      <AppRouter>
        <Styles/>
        <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>
      </AppRouter>
    );
  }
}
