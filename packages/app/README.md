# @tailored/app
A top-level application container featuring simplified router support and context configuration.

## Props
1. router - The type of router to use (options: `hash`, `browser`, `memory`)

## Usage
```js
import { render } from "react-dom";
import App from "@tailored/app";
import Routes from "./routes";

render((
	<App router="browser" services={{ user }}>
		<Routes />
	</App>
), document.getElementById("app"));
```

