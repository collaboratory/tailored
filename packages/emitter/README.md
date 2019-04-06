# @tailored/emitter
Manage one or more emitters in a React application.

## Parameters
1. options - object
    * params:
        * channel - the name of the emitter channel

## Returns
Returns a standard object with the following properties:
```
{
    Emitter: the instance of the emitter,
    Context: React context for the emitter instance,
    Provider: alias to Context.Provider,
    Consumer: alias to Context.Consumer,
    withEmitter: HoC to provide emitter to react components via props
}
```

## Usage
```js
// emitters/messages.js
import emitter from "@tailored/emitter";
const Messages = emitter("counter");
export default Messages;
```

```js
// components/message/input.js
import React, { Component } from "react";
import Input from "@tailored/form";
import Messages from "../../emitters/message";

export default class MessageInput extends Component {
    state = {
        message: ''
    };

    onChange = e => {
        this.setState({ message: e.target.value });
    };

    onKeyPress = e => {
        if (e.key === "Enter") {
            Messages.Emitter.emit("message", this.state.message);
            this.setState({
                message: ''
            });
        }
    };

    render() {
        return <Input 
            type="text" 
            onChange={this.onChange} 
            onKeyPress={this.onKeyPress} 
        />;
    }
}
```

```js
// components/message/history.js
import React, { Component } from "react";
import Messages from "../../emitters/message";

export class MessageHistory extends Component {
    state = {
        history: []
    };

    componentDidMount() {
        this.props.emitter.on("message", this.onMessage);
    }

    componentWillUnmount() {
        this.props.emitter.off("message", this.onMessage);
    }

    onMessage = message => {
        const history = this.state.history;
        history.push(message);
        this.setState({
            history
        });
    };

    render() {
        return this.state.history.map((message, i) => (
            <div key={i}>{message}</div>
        ));
    }
}
```