import axios from "axios";
import {
  VALIDATE_TRAVELER_LOGIN,
  TRAVELER_SIGN_UP,
  VALIDATE_OWNER_LOGIN,
  OWNER_SIGN_UP
} from "./types";

const ROOT_URL = "http://localhost:3001";

export function validateTravelerLogin(data, callback) {
  try {
    const request = axios
      .post(`${ROOT_URL}/travelerlogin`, data)
      .then(response => callback(response));
    return {
      type: VALIDATE_TRAVELER_LOGIN,
      payload: request
    };
  } catch (e) {
    return {
      type: VALIDATE_TRAVELER_LOGIN,
      payload: e
    };
  }
}

export function travelerSignUp(data, callback) {
  try {
    const request = axios
      .post(`${ROOT_URL}/travelersignup`, data)
      .then(response => callback(response));
    return {
      type: TRAVELER_SIGN_UP,
      payload: request
    };
  } catch (e) {
    return {
      type: TRAVELER_SIGN_UP,
      payload: e
    };
  }
}

export function validateOwnerLogin(data, callback) {
  try {
    const request = axios
      .post(`${ROOT_URL}/ownerlogin`, data)
      .then(response => callback(response));
    return {
      type: VALIDATE_OWNER_LOGIN,
      payload: request
    };
  } catch (e) {
    return {
      type: VALIDATE_OWNER_LOGIN,
      payload: e
    };
  }
}

export function ownerSignUp(data, current_user, callback) {
  try {
    const request = axios
      .post(`${ROOT_URL}/ownersignup/${current_user}`, data)
      .then(response => callback(response));
    return {
      type: OWNER_SIGN_UP,
      payload: request
    };
  } catch (e) {
    return {
      type: OWNER_SIGN_UP,
      payload: e
    };
  }
}
