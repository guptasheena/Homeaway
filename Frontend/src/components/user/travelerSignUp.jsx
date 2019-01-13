import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Navbar from "../common/navbar";
import { travelerSignUp } from "../../actions/travelerLoginActions";
import { getTravelerToken, getOwnerToken } from "../common/auth";

class TravelerSignUp extends Component {
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
    this.props.travelerSignUp(values, response => {
      if (response.data === "Traveler Sign-up successful.") {
        window.alert("Signed-up successfully!");
        this.props.history.push("/travelerlogin");
      } else {
        window.alert("Username already exists.");
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
          <div className="TL_login_one">Sign up for HomeAway</div>
          <br />
          <div className="TL_login_two">
            Already have an account? &nbsp;
            <a href="/travelerlogin">Log in</a>
          </div>
          <div className="form_container">
            <div className="form_header_one">Account Login</div>
            <hr />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                name="firstname"
                component={this.renderField}
                autoFocus
                label="First Name"
              />
              <Field
                name="lastname"
                component={this.renderField}
                label="Last Name"
              />
              <Field
                name="username"
                component={this.renderField}
                label="Email address"
              />
              <Field
                name="password"
                component={this.renderField}
                label="Password"
              />
              <button type="submit" className="btn mb-2 TL_login_btn">
                Sign Me Up
              </button>
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
            <a href="/travelersignup">Terms and Conditions </a>
            and <a href="/travelersignup">Privacy Policy</a>. <br />
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

  if (!values.firstname) {
    errors.firstname = "First Name cannot be empty";
  } else if (values.firstname.length > 15) {
    errors.firstname = "First Name cannot be more than 15 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.firstname)) {
    errors.firstname = "Incorrect First Name format";
  }

  if (!values.lastname) {
    errors.lastname = "Last Name cannot be empty";
  } else if (values.lastname.length > 15) {
    errors.lastname = "Last Name cannot be more than 15 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.lastname)) {
    errors.lastname = "Incorrect Last Name format";
  }

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

export default reduxForm({
  validate,
  form: "travelerSignUpForm"
})(
  connect(
    null,
    { travelerSignUp }
  )(TravelerSignUp)
);
