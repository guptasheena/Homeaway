import { VALIDATE_TRAVELER_LOGIN } from "../actions/types";
import { TRAVELER_SIGN_UP } from "../actions/types";
import { OWNER_SIGN_UP } from "../actions/types";
import { VALIDATE_OWNER_LOGIN } from "../actions/types";

const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VALIDATE_TRAVELER_LOGIN:
      console.log("In Traveler Login Reducer");
    case TRAVELER_SIGN_UP:
      console.log("In Traveler Sign-up Reducer");
    case OWNER_SIGN_UP:
      console.log("In Owner Sign-up Reducer");
    case VALIDATE_OWNER_LOGIN:
      console.log("In Owner Login Reducer");
    default:
      return state;
  }
}
