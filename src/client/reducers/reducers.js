import { PLAY_GAME } from "../actions/actionTypes";

const initialState = {
  name: "toto"
};

const reducers = (state = initialState, action) => {
  console.log(`State: ${state}`);
  console.log(`Action: ${action}`);

  switch (action.type) {
    case PLAY_GAME: {
      //Modifier le state
      return state;
    }
    default:
      return state;
  }
};

export default reducers;
