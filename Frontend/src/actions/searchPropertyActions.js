import axios from "axios";
import {
  SAVE_SEARCH_INPUT,
  GET_SEARCH_RESULTS,
  GET_SEARCH_INPUT,
  BOOK_PROPERTY,
  GET_SEARCH_RESULTS_BY_ID,
  RESET_BOOKING_STATUS,
  FILTER_SEARCH_RESULTS,
  RESET_FILTER_RESULTS
} from "./types";
import { setHeader } from "../components/common/auth";

const ROOT_URL = "http://localhost:3001";

export function saveSearchInput(values) {
  return {
    type: SAVE_SEARCH_INPUT,
    payload: values
  };
}

export function getSearchInput() {
  return {
    type: GET_SEARCH_INPUT
  };
}

export function resetBookingStatus() {
  return {
    type: RESET_BOOKING_STATUS
  };
}

export function filterSearchResults(values) {
  return {
    type: FILTER_SEARCH_RESULTS,
    payload: values
  };
}

export function resetFilterResults() {
  return {
    type: RESET_FILTER_RESULTS
  };
}

export const getSearchResults = (data, username) => async dispatch => {
  try {
    setHeader();
    const res = await axios.post(
      `${ROOT_URL}/searchProperty/${username}`,
      data
    );
    dispatch({
      type: GET_SEARCH_RESULTS,
      payload: res.data
    });
  } catch (e) {
    return {
      type: GET_SEARCH_RESULTS,
      payload: e
    };
  }
};

export const getSearchResultsByID = propertyID => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(`${ROOT_URL}/searchPropertyByID/${propertyID}`);
    dispatch({
      type: GET_SEARCH_RESULTS_BY_ID,
      payload: res.data
    });
  } catch (e) {
    return {
      type: GET_SEARCH_RESULTS_BY_ID,
      payload: e
    };
  }
};

export const bookProperty = (propertyID, username) => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(
      `${ROOT_URL}/bookProperty/${propertyID}/${username}`
    );
    dispatch({
      type: BOOK_PROPERTY,
      payload: res.data
    });
  } catch (e) {
    return {
      type: BOOK_PROPERTY,
      payload: e
    };
  }
};
