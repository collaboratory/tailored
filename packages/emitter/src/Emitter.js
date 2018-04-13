import React, { Component, Children } from "react";
import PropTypes from "prop-types";
import EmitterService from "@tailored/service-emitter";

export const Emitter = ({ channel }) => {
  const EmitterContext = React.createContext("emitter");
  return [
    class EmitterComponent extends Component {
      static propTypes = {
        channel: PropTypes.string.isRequired,
        children: PropTypes.any
      };

      render() {
        return (
          <EmitterContext.Provider value={EmitterService.get(channel)}>
            {Children.only(this.props.children)}
          </EmitterContext.Provider>
        );
      }
    },
    EmitterContext
  ];
};
export default Emitter;

export const withEmitter = (channel, Wrapped) => (
  <Wrapped emitter={EmitterService.get(channel)} />
);
