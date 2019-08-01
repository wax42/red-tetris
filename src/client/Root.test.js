import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import App from "./App";
import Home from "./components/Home";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("shoud return the event value", () => {
  const wrapper = mount(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
});

it("sums numbers", () => {
  expect(1 + 2).toEqual(3);
  expect(2 + 2).toEqual(4);
});
