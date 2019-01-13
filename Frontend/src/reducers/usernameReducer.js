import { SAVE_USERNAME } from "../actions/types";
import { GET_USERNAME } from "../actions/types";

const initialState = {
  username: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case GET_USERNAME:
      return {
        ...state
      };

    default:
      return state;
  }
}
