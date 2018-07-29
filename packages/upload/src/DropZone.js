import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Emitter from "@emitterware/emitter";

export const DropZoneContext = React.createContext("dropzone");

const DropZoneTargetWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  border-style: solid;
  text-align: center;

  ${props =>
    (props.dragging &&
      css`
        border-color: #00ff00;
        background-color: #ccffcc;
      `) ||
    css`
      border-color: #ccc;
      background-color: #fefefe;
    `};
`;
export class DropZoneTarget extends Component {
  state = {
    dragging: false
  };

  static propTypes = {
    children: PropTypes.node,
    onDrop: PropTypes.func
  };

  onDrop = e => {
    e.nativeEvent.preventDefault();
    e.nativeEvent.stopPropagation();

    this.setState({
      dragging: false
    });

    if (this.props.onDrop) {
      this.props.onDrop(e.dataTransfer.files);
    }

    return false;
  };

  render() {
    return (
      <DropZoneContext.Consumer>
        {context => {
          const setDragging = is => {
            if (this.state.dragging !== is) {
              this.setState({
                dragging: is
              });
            }
          };
          return (
            <DropZoneTargetWrapper
              draggable="true"
              dragging={this.state.dragging}
              onDragStart={() => setDragging(true)}
              onDragEnter={() => setDragging(true)}
              onDragOver={() => setDragging(true)}
              onDragLeave={() => setDragging(false)}
              onDragEnd={() => setDragging(false)}
              onDrop={this.onDrop}
            >
              {this.props.children}
            </DropZoneTargetWrapper>
          );
        }}
      </DropZoneContext.Consumer>
    );
  }
}

const DropZoneWrapper = styled.div`
  display: relative;
  clear: both;
  display: block;
  width: 100%;
  height: 100%;
  border-style: solid;

  ${props =>
    (props.dragging &&
      css`
        background: #fefefe;
        ${DropZoneTargetWrapper} {
          border-width: 2px;
        }
      `) ||
    ""};
`;

export default class DropZone extends Component {
  constructor(props) {
    super(props);
    const emitter = new Emitter();
    this.state = {
      context: {
        dragging: false,
        hasTarget: false,
        emitter
      }
    };

    emitter.on("target", has => {
      this.setState({
        target: has,
        dragging: this.state.dragging || has
      });
    });

    window.ondragleave = this.onDragEnd;
  }

  static propTypes = {
    children: PropTypes.node
  };

  onDrop = e => {
    this.setState({
      dragging: false
    });
  };

  onDragBegin = e => {
    e.preventDefault();
    if (!this.state.dragging) {
      this.setState({
        dragging: true
      });
    }
  };

  onDragEnd = e => {
    e.preventDefault();
    if (this.state.dragging) {
      this.setState({
        dragging: false
      });
    }
  };

  render() {
    return (
      <DropZoneWrapper
        dragging={this.state.dragging}
        hasTarget={this.state.hasTarget}
        onDragOver={this.onDragBegin}
        onDragLeave={this.onDragEnd}
        onDragEnd={this.onDragEnd}
        onDrop={this.onDrop}
      >
        <DropZoneContext.Provider value={this.state.context}>
          {this.props.children}
        </DropZoneContext.Provider>
      </DropZoneWrapper>
    );
  }
}
