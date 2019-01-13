import axios from "axios";
import {
  CHECK_IS_OWNER,
  GET_OWNER_DASHBOARD,
  GET_OWNER_DASHBOARD_BY_ID,
  GET_TRAVELER_DASHBOARD,
  GET_SEARCH_RESULTS_BY_NAME_TRAVELER,
  GET_SEARCH_RESULTS_BY_NAME_OWNER,
  FILTER_DATE_TRAVELER_DASHBOARD,
  FILTER_DATE_OWNER_DASHBOARD
} from "./types";
import { setHeader } from "../components/common/auth";

const ROOT_URL = "http://localhost:3001";

export const checkIsOwner = username => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(`${ROOT_URL}/checkIsOwner/${username}`);
    dispatch({
      type: CHECK_IS_OWNER,
      payload: res.data
    });
  } catch (e) {
    return {
      type: CHECK_IS_OWNER,
      payload: e
    };
  }
};

export const getOwnerDashboard = username => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(
      `${ROOT_URL}/getOwnerDashboardProperty/${username}`
    );
    dispatch({
      type: GET_OWNER_DASHBOARD,
      payload: res.data
    });
  } catch (e) {
    return {
      type: GET_OWNER_DASHBOARD,
      payload: e
    };
  }
};

export const searchPropertyByID = propertyID => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(`${ROOT_URL}/searchPropertyByID/${propertyID}`);
    dispatch({
      type: GET_OWNER_DASHBOARD_BY_ID,
      payload: res.data
    });
  } catch (e) {
    return {
      type: GET_OWNER_DASHBOARD_BY_ID,
      payload: e
    };
  }
};

export const getSearchResultsByNameOwner = (
  name,
  username
) => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(
      `${ROOT_URL}/searchOwnerPropertyByName/${name}/${username}`
    );
    dispatch({
      type: GET_SEARCH_RESULTS_BY_NAME_OWNER,
      payload: res.data
    });
  } catch (e) {
    return {
      type: GET_SEARCH_RESULTS_BY_NAME_OWNER,
      payload: e
    };
  }
};

export const getSearchResultsByNameTraveler = (
  name,
  username
) => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(
      `${ROOT_URL}/searchTravelerPropertyByName/${name}/${username}`
    );
    dispatch({
      type: GET_SEARCH_RESULTS_BY_NAME_TRAVELER,
      payload: res.data
    });
  } catch (e) {
    return {
      type: GET_SEARCH_RESULTS_BY_NAME_TRAVELER,
      payload: e
    };
  }
};

export const getTravelerDashboard = username => async dispatch => {
  try {
    setHeader();
    const res = await axios.get(
      `${ROOT_URL}/getTravelerDashboardProperty/${username}`
    );
    dispatch({
      type: GET_TRAVELER_DASHBOARD,
      payload: res.data
    });
  } catch (e) {
    return {
      type: GET_TRAVELER_DASHBOARD,
      payload: e
    };
  }
};

export function filterTravelerByDate(values) {
  return {
    type: FILTER_DATE_TRAVELER_DASHBOARD,
    payload: values
  };
}

export function filterOwnerByDate(values) {
  return {
    type: FILTER_DATE_OWNER_DASHBOARD,
    payload: values
  };
}
