import React, { Component } from "react";
import HomeBody from "./homeBody";
import Navbar from "./common/navbar";

class Home extends Component {
  render() {
    return (
      <div className="home_body">
        <Navbar />
        <HomeBody />
      </div>
    );
  }
}

export default Home;
