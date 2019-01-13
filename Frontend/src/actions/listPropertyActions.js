import axios from "axios";
import {
  LIST_PROPERTY,
  SAVE_PHOTO_NAME,
  GET_PHOTO_NAME,
  GET_ALL_PHOTO_NAMES_OWNER,
  GET_ALL_PHOTO_NAMES_TRAVELER,
  GET_PHOTO_NAMES_BY_PROPERTY_ID,
  GET_ALL_PHOTO_NAMES_SEARCH,
  DOWNLOAD_PHOTO,
  UPLOAD_PHOTO
} from "./types";
import { setHeader } from "../components/common/auth";

const ROOT_URL = "http://localhost:3001";

export function listProperty(data, username, callback) {
  try {
    setHeader();
    const request = axios
      .post(`${ROOT_URL}/listproperty/${username}`, data)
      .then(res => callback(res));

    return {
      type: LIST_PROPERTY,
      payload: request
    };
  } catch (e) {
    return {
      type: LIST_PROPERTY,
      payload: e
    };
  }
}

export function savePhotoName(values) {
  return {
    type: SAVE_PHOTO_NAME,
    payload: values
  };
}

export function getPhotoName() {
  return {
    type: GET_PHOTO_NAME
  };
}

export function getAllPhotoNamesTraveler(username, callback) {
  try {
    setHeader();
    const request = axios
      .get(`${ROOT_URL}/getAllPhotoNamesTraveler/${username}`)
      .then(res => callback(res));

    return {
      type: GET_ALL_PHOTO_NAMES_TRAVELER,
      payload: request
    };
  } catch (e) {
    return {
      type: GET_ALL_PHOTO_NAMES_TRAVELER,
      payload: e
    };
  }
}

export function getAllPhotoNamesOwner(username, callback) {
  try {
    setHeader();
    const request = axios
      .get(`${ROOT_URL}/getAllPhotoNamesOwner/${username}`)
      .then(res => callback(res));

    return {
      type: GET_ALL_PHOTO_NAMES_OWNER,
      payload: request
    };
  } catch (e) {
    return {
      type: GET_ALL_PHOTO_NAMES_OWNER,
      payload: e
    };
  }
}

export function getAllPhotoNamesSearch(search_input, username, callback) {
  try {
    setHeader();
    const request = axios
      .post(`${ROOT_URL}/getAllPhotoNamesSearch/${username}`, search_input)
      .then(res => callback(res));

    return {
      type: GET_ALL_PHOTO_NAMES_SEARCH,
      payload: request
    };
  } catch (e) {
    return {
      type: GET_ALL_PHOTO_NAMES_SEARCH,
      payload: e
    };
  }
}

export function getPhotoNamesByPropertyID(propertyID, callback) {
  try {
    setHeader();
    const request = axios
      .get(`${ROOT_URL}/getPhotoNamesByPropertyID/${propertyID}`)
      .then(res => callback(res));

    return {
      type: GET_PHOTO_NAMES_BY_PROPERTY_ID,
      payload: request
    };
  } catch (e) {
    return {
      type: GET_PHOTO_NAMES_BY_PROPERTY_ID,
      payload: e
    };
  }
}

export function downloadPhoto(photoName, callback) {
  try {
    setHeader();
    const request = axios
      .post(`${ROOT_URL}/download/${photoName}`)
      .then(res => callback(res));

    return {
      type: DOWNLOAD_PHOTO,
      payload: request
    };
  } catch (e) {
    return {
      type: DOWNLOAD_PHOTO,
      payload: e
    };
  }
}

export function uploadPhoto(formData, config, callback) {
  try {
    setHeader();
    const request = axios
      .post(`${ROOT_URL}/upload`, formData, config)
      .then(res => callback(res));

    return {
      type: UPLOAD_PHOTO,
      payload: request
    };
  } catch (e) {
    return {
      type: UPLOAD_PHOTO,
      payload: e
    };
  }
}
