import { SAVE_USERNAME, GET_USERNAME } from "./types";

export const saveUsername = username => {
  return {
    type: SAVE_USERNAME,
    payload: username
  };
};

export const getUsername = () => {
  return {
    type: GET_USERNAME
  };
};
