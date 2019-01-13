import jwt_decode from "jwt-decode";
import axios from "axios";

export function getTravelerToken() {
  const token = localStorage.getItem("travelerToken");
  if (token && token !== "Bearer undefined") return true;
}

export function getOwnerToken() {
  const token = localStorage.getItem("ownerToken");
  if (token && token !== "Bearer undefined") return true;
}

export function getJWTUsername() {
  const token = localStorage.getItem("travelerToken");

  if (token) return jwt_decode(token).username;
  else {
    const token = localStorage.getItem("ownerToken");
    if (token) return jwt_decode(token).username;
  }
}

export function setHeader() {
  if (getTravelerToken()) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "travelerToken"
    );
  } else if (getOwnerToken()) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "ownerToken"
    );
  }
}
