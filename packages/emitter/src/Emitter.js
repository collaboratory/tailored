import React from "react";
import EmitterService from "@tailored/service-emitter";

export const emitter = ({ channel }) => {
  const Context = React.createContext("emitter");
  const Emitter = EmitterService.get(channel);

  return {
    Context,
    Emitter,
    Provider: Context.Provider,
    Consumer: Context.Consumer,
    withEmitter: Wrapped => {
      const WithEmitter = props => <Wrapped {...props} emitter={Emitter} />;
      return WithEmitter;
    }
  };
};
export default emitter;
