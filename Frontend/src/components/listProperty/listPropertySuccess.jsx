import React, { Component } from "react";
import { getTravelerToken, getOwnerToken } from "../common/auth";
import { Redirect } from "react-router";
import Navbar from "../common/navbar";

class ListPropertySuccess extends Component {
  handleWelcomeSubmit = () => {
    this.props.history.push("/listproperty");
  };

  handleLocationSubmit = () => {
    this.props.history.push("/listpropertylocation");
  };

  handleDetailsSubmit = () => {
    this.props.history.push("/listpropertydetails");
  };

  handlePhotosSubmit = () => {
    this.props.history.push("/listpropertyphotos");
  };

  handlePricingSubmit = () => {
    this.props.history.push("/listpropertypricing");
  };

  render() {
    let redirectVar = null;
    if (!getTravelerToken() && !getOwnerToken()) {
      redirectVar = <Redirect to="/ownersignup" />;
    }

    return (
      <div className="list_property_body">
        {redirectVar}
        <Navbar />
        <div className="sidenav">
          <a href="#" onClick={this.handleWelcomeSubmit}>
            Welcome
          </a>
          <a href="#" onClick={this.handleLocationSubmit}>
            Location
          </a>
          <a href="#" onClick={this.handleDetailsSubmit}>
            Details
          </a>
          <a href="#">Booking options</a>
          <a href="#" onClick={this.handlePhotosSubmit}>
            Photos
          </a>
          <a href="#">Security</a>
          <a href="#">Payment</a>
          <a href="#" onClick={this.handlePricingSubmit}>
            Pricing
          </a>
        </div>

        <div className="list_property_success">
          <img
            src={require("../../images/success_logo.png")}
            width="160"
            height="140"
            alt="User has not uploaded anything yet"
          />
          <h2>
            <span className="tick">&#10004;</span>
            You have finished setting up your rates!{" "}
          </h2>
          <h6>
            Looking for more rates settings, like additional fees or weekend
            pricing? Visit the <a href="/listproperty">rates editor</a> for more
            options.
          </h6>
          <hr />
          <button type="button" className="btn_success_continue">
            <a href="/home">Continue</a>
          </button>
        </div>
        <div className="photos_footer">
          Use of this Web site constitutes acceptance of the HomeAway.com
          <a href="/listproperty"> Terms and conditions</a> and{" "}
          <a href="/listproperty">Privacy policy</a>.
          <p> ©2018 HomeAway. All rights reserved</p>
          <a href="/listproperty">Start Co-browse</a>
        </div>
      </div>
    );
  }
}

export default ListPropertySuccess;
