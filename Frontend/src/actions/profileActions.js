import axios from "axios";
import { SAVE_PROFILE, GET_USER_PHOTO_NAME, GET_PROFILE } from "./types";
import { setHeader } from "../components/common/auth";

const ROOT_URL = "http://localhost:3001";

export const getProfile = username => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(`${ROOT_URL}/getProfile/${username}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (e) {
    return {
      type: GET_PROFILE,
      payload: e
    };
  }
};

export const saveProfile = (data, username) => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/saveprofile/${username}`, data);
    dispatch({
      type: SAVE_PROFILE,
      payload: res.data
    });
  } catch (e) {
    return {
      type: SAVE_PROFILE,
      payload: e
    };
  }
};

export function getUserPhotoName(username, callback) {
  try {
    setHeader();
    const request = axios
      .get(`${ROOT_URL}/getUserPhotoName/${username}`)
      .then(res => callback(res));

    return {
      type: GET_USER_PHOTO_NAME,
      payload: request
    };
  } catch (e) {
    return {
      type: GET_USER_PHOTO_NAME,
      payload: e
    };
  }
}
