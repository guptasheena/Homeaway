import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { validateTravelerLogin } from "../../actions/travelerLoginActions";
import Navbar from "../common/navbar";
import { saveUsername } from "../../actions/UsernameActions";
import PropTypes from "prop-types";
import { getTravelerToken, getOwnerToken } from "../common/auth";

class TravelerLogin extends Component {
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    var type = "text";
    if (field.label === "Password") {
      type = "password";
    }

    return (
      <div className={className}>
        <input
          className="form-control"
          type={type}
          {...field.input}
          placeholder={field.label}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.validateTravelerLogin(values, response => {
      if (response.data.length === 0) {
        window.alert("Username and/or Password is incorrect.");
      } else if (response.data.token !== "Bearer ") {
        console.log("Traveler Login successful.");

        const token = response.data;
        localStorage.setItem("travelerToken", token);

        this.props.saveUsername(values.username);
        this.props.history.push("/home");
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;

    let redirectVar = null;
    if (getTravelerToken() || getOwnerToken()) {
      redirectVar = <Redirect to="/home" />;
    }

    return (
      <React.Fragment>
        {redirectVar}
        <Navbar />
        <div className="TL_container">
          <div className="TL_login_one">Log in to HomeAway</div>
          <br />
          <div className="TL_login_two">
            Need an account? <a href="/travelersignup">Sign Up</a>
          </div>
          <div className="form_container">
            <div className="form_header_one">Account Login</div>
            <hr />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                name="username"
                component={this.renderField}
                autoFocus
                label="Email address"
              />
              <Field
                name="password"
                component={this.renderField}
                label="Password"
              />
              <button type="submit" className="btn mb-2 TL_login_btn">
                Log In
              </button>
              <input type="checkbox" />
              <label> &nbsp; Keep me signed in</label>
            </form>
            <div className="centered-hr text-center">
              <span className="before" />
              <span className="text-center">
                <em>or</em>
              </span>
            </div>

            <a className="btn btn-block btn-social btn-facebook">
              <span className="fa fa-facebook" />
              <span className="facebook">Log in with Facebook</span>
            </a>

            <a className="btn btn-block btn-social btn-google">
              <span className="fa fa-google" />
              <span className="google_text">Log in with Google</span>
            </a>
            <div className="closing_line">
              We don't post anything without your permission.
            </div>
          </div>

          <div className="TL_login_footer">
            Use of this Web site constitutes acceptance of the HomeAway.com{" "}
            <a href="/travelerlogin">Terms and Conditions </a>
            and <a href="/travelerlogin">Privacy Policy</a>. <br />
            <div className="TL_login_sub_footer">
              ©2018 HomeAway. All rights reserved.
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Email address cannot be empty";
  } else if (values.username.length > 30) {
    errors.username = "Email address  cannot be more than 30 characters long";
  } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.username)) {
    errors.username = "Incorrect Email address format";
  }
  if (!values.password) {
    errors.password = "Password cannot be empty";
  } else if (values.password.length > 20) {
    errors.password = "Password cannot be more than 20 characters long";
  }

  return errors;
}

TravelerLogin.propTypes = {
  saveUsername: PropTypes.func.isRequired
};

export default reduxForm({
  validate,
  form: "travelerLoginForm"
})(
  connect(
    null,
    { validateTravelerLogin, saveUsername }
  )(TravelerLogin)
);
