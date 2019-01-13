import React, { Component } from "react";
import Navbar from "./navbar";

class NotFound extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <p className="notfound">Page Not Found</p>
      </div>
    );
  }
}

export default NotFound;
