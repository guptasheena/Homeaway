import {
  SEND_QUESTION,
  GET_QUESTION,
  GET_ANSWER,
  SEND_ANSWER
} from "../actions/types";

const initialState = {
  question: "",
  answer: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_QUESTION:
      return {
        ...state,
        question: action.payload
      };

    case SEND_ANSWER:
      return {
        ...state,
        answer: action.payload
      };

    case GET_QUESTION:
      return {
        ...state,
        question: action.payload
      };

    case GET_ANSWER:
      return {
        ...state,
        answer: action.payload
      };

    default:
      return state;
  }
}
