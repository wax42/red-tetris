import React from "react";
import Game, {
  GamePieces,
  GameGrid
} from "../../../client/components/Room/Game";
import { shallow } from "enzyme";
import _ from "lodash";

const gridEmpty = [
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
];

describe("GAME.JSX", () => {
  it("should render self and subcomponent Game", () => {
    const setup = () => {
      const props = {
        state: {
          grid: _.cloneDeep(gridEmpty)
        }
      };

      const enzymeWrapper = shallow(<Game {...props} />);

      return {
        props,
        enzymeWrapper
      };
    };
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find("div").hasClass("game")).toBeTruthy();
    expect(enzymeWrapper.find("GameGrid")).toBeTruthy();
    expect(enzymeWrapper.find("GamePieces")).toBeTruthy();
  });

  it("should render self and subcomponent GamePieces", () => {
    const setup = () => {
      const props = {
        pieces: [
          [
            [".", "1", ".", "."],
            [".", "1", ".", "."],
            [".", "1", ".", "."],
            [".", "1", ".", "."]
          ],
          [
            [".", "1", ".", "."],
            [".", "1", "1", "."],
            [".", ".", "1", "."],
            [".", ".", ".", "."]
          ],
          [
            [".", ".", ".", "."],
            [".", "1", "1", "."],
            [".", "1", "1", "."],
            [".", ".", ".", "."]
          ]
        ]
      };

      const enzymeWrapper = shallow(<GamePieces {...props} />);

      return {
        props,
        enzymeWrapper
      };
    };
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find("div").hasClass("game-pieces")).toBeTruthy();
    expect(enzymeWrapper.find("GameGrid")).toBeTruthy();
  });

  it("should render self and subcomponent GameGrid", () => {
    const setup = () => {
      const props = {
        grid: _.cloneDeep(gridEmpty)
      };

      const enzymeWrapper = shallow(<GameGrid {...props} />);

      return {
        props,
        enzymeWrapper
      };
    };
    const { enzymeWrapper } = setup();
    // expect(enzymeWrapper.find("div").hasClass("game-grid")).toBeTruthy();
  });
});
