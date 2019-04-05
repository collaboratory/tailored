import React, { Component } from "react";
import PropTypes from "prop-types";
import { Box } from "@tailored/grid";

export class Navigation extends Component {
  state = {
    proceduralItems: []
  };

  static propTypes = {
    children: PropTypes.node,
    bg: PropTypes.string
  };

  render() {
    const { bg = "primary-d-4", color = "white", ...next } = this.props;
    return (
      <Box bg={bg} color={color} {...next}>
        {this.props.children}
        {this.state.proceduralItems}
      </Box>
    );
  }
}

export default Navigation;
