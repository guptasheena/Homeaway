import React, { Component } from "react";
import Navbar from "./common/navbar";
import "../App.css";

class TripBoard extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <hr />
        <div className="tripboard">
          <h2 className="tripboard_upper">Trip Boards </h2>
          <br />
          <div className="tripboard_lower">
            Trip Boards help you keep track of the places you love.{" "}
            <span className="heart">&hearts;</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TripBoard;
