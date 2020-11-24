import React from "react";
import ReactDOM, { render } from "react-dom";
import App from "./App.js";
// App 컴포넌트를 root아이디를 가진 DOM에 랜더할 것임! (index.html의 그 root임)

ReactDOM.render(<App />, document.getElementById("root"));