import React from "react";
import {
    AutoComplete,
    renderSuggestion,
    renderInputComponent,
    getSuggestions,
    getSuggestionValue
} from "../../../client/components/Home/AutoComplete";
import {
    shallow
} from "enzyme";

describe("AUTOCOMPLETE.JSX", () => {
    let suggestion = [{
        label: "test"
    }]
    it("should render Autocomplete", () => {
        const setup = () => {
            const props = {
                roomName: "dsf",
                setRoomName: jest.fn(),
                listRooms: ['test', 'test1']
            };

            const enzymeWrapper = shallow( < AutoComplete / > );
            return {
                props,
                enzymeWrapper
            };
        };
        const {
            enzymeWrapper
        } = setup();
        expect(enzymeWrapper.find("AutoComplete")).toBeTruthy();
    });

    it("should render renderSugggestion", () => {
        const setup = () => {
            const props = {
                suggestions: [{
                    label: "test"
                }]
            };

            const enzymeWrapper = shallow( < renderSuggestion / > );

            return {
                props,
                enzymeWrapper
            };
        };
        const {
            enzymeWrapper
        } = setup();
        expect(enzymeWrapper.find("GameGrid")).toBeTruthy();

    });

    it("should render inputComponent", () => {
        const setup = () => {
            const props = {
                inputProps: {
                    classes: {},
                    id: "react-autosuggest-simple",
                    label: "Room",
                    placeholder: "Enter a room name",
                    value: "test",
                    onChange: jest.fn()
                }
            };

            const enzymeWrapper = shallow( < renderInputComponent / > );

            return {
                props,
                enzymeWrapper
            };
        };
        const {
            enzymeWrapper
        } = setup();
        expect(enzymeWrapper.find("GameGrid")).toBeTruthy();

    });
    it("should render getSuggestions", () => {
        getSuggestions("test")

    });
    it("should render getSuggestionsValue", () => {
        getSuggestionValue({
            label: "test"
        })

    });




});