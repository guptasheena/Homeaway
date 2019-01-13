import axios from "axios";
import { SEND_QUESTION, GET_QUESTION, GET_ANSWER, SEND_ANSWER } from "./types";
import { setHeader } from "../components/common/auth";

const ROOT_URL = "http://localhost:3001";

export const sendQuestion = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/sendQuestion`, data);
    dispatch({
      type: SEND_QUESTION,
      payload: res.data
    });
  } catch (e) {
    return {
      type: SEND_QUESTION,
      payload: e
    };
  }
};

export const sendAnswer = data => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(`${ROOT_URL}/sendAnswer`, data);
    dispatch({
      type: SEND_ANSWER,
      payload: res.data
    });
  } catch (e) {
    return {
      type: SEND_ANSWER,
      payload: e
    };
  }
};

export const getQuestion = username => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(`${ROOT_URL}/getQuestion/${username}`);
    dispatch({
      type: GET_QUESTION,
      payload: res.data
    });
  } catch (e) {
    return {
      type: GET_QUESTION,
      payload: e
    };
  }
};

export const getAnswer = username => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(`${ROOT_URL}/getAnswer/${username}`);
    dispatch({
      type: GET_ANSWER,
      payload: res.data
    });
  } catch (e) {
    return {
      type: GET_ANSWER,
      payload: e
    };
  }
};
