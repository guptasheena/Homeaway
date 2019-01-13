import React, { Component } from "react";
import { getTravelerToken, getOwnerToken } from "../common/auth";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import Navbar from "../common/navbar";

class ListPropertyWelcome extends Component {
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
          <a href="#">
            <span className="active_link">Welcome</span>
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

        <div className="list_property_welcome">
          <div className="welcome">
            <h2>
              Welcome! Verify the location of your <br />
              rental
            </h2>{" "}
            <h6>Just 4 steps remaining.</h6>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleLocationSubmit}
            >
              Continue
            </button>
            <div className="welcome_sub_footer">
              Use of this Web site constitutes acceptance of the HomeAway.com
              <a href="/listproperty"> Terms and conditions</a> and{" "}
              <a href="/listproperty">Privacy policy</a>. ©2018 HomeAway. All
              rights reserved{" "}
              <p>
                <a href="/listproperty">Start Co-browse</a>
              </p>
            </div>
          </div>
        </div>

        <div className="welcome_footer">
          You will <a href="/listproperty">pay-per-booking</a>. Consider a{" "}
          <a href="/listproperty">subscription</a> if you plan to book
          frequently.
        </div>
      </div>
    );
  }
}

export default withRouter(ListPropertyWelcome);
