import React from "react";
import ReactDOM from "react-dom";
import Root from "../client/containers/Root";
import { shallow } from "enzyme";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("../client/index");
    expect(ReactDOM.render).toHaveBeenCalledWith(<Root />, div);
  });
});
