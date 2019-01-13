import {
  LIST_PROPERTY,
  SAVE_PHOTO_NAME,
  GET_PHOTO_NAME,
  GET_ALL_PHOTO_NAMES_TRAVELER,
  GET_ALL_PHOTO_NAMES_OWNER,
  GET_PHOTO_NAMES_BY_PROPERTY_ID,
  GET_ALL_PHOTO_NAMES_SEARCH,
  DOWNLOAD_PHOTO,
  UPLOAD_PHOTO
} from "../actions/types";

const initialState = {
  listPropertyData: [],
  photos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LIST_PROPERTY:
      return {
        ...state,
        listPropertyData: action.payload
      };

    case SAVE_PHOTO_NAME:
      return {
        ...state,
        photos: action.payload
      };

    case GET_PHOTO_NAME:
      return {
        ...state
      };

    case GET_ALL_PHOTO_NAMES_TRAVELER:
      return {
        ...state
        // photos: action.payload.data
      };

    case GET_ALL_PHOTO_NAMES_OWNER:
      return {
        ...state
        // photos: action.payload.data
      };

    case GET_ALL_PHOTO_NAMES_SEARCH:
      return {
        ...state
        // photos: action.payload.data
      };

    case GET_PHOTO_NAMES_BY_PROPERTY_ID:
      return {
        ...state
        // photos: action.payload.data
      };

    case DOWNLOAD_PHOTO:
      return {
        ...state
        //  photos: action.payload.data
      };

    case UPLOAD_PHOTO:
      return {
        ...state
        // photos: action.payload.data
      };

    default:
      return state;
  }
}
