import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("sums numbers", () => {
  expect(1 + 2).toEqual(3);
  expect(2 + 2).toEqual(4);
});
