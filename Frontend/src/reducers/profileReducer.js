import {
  SAVE_PROFILE,
  GET_USER_PHOTO_NAME,
  GET_PROFILE
} from "../actions/types";

const initialState = {
  profile: {},
  updateStatus: "",
  photo: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };

    case SAVE_PROFILE:
      console.log("payload=", action.payload);
      return {
        ...state,
        updateStatus: action.payload
      };

    case GET_USER_PHOTO_NAME:
      return {
        ...state,
        photo: action.payload.data
      };

    default:
      return state;
  }
}
