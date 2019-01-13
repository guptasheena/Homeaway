import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Navbar from "../common/navbar";
import { ownerSignUp } from "../../actions/travelerLoginActions";
import { getOwnerToken, getJWTUsername } from "../common/auth";

class OwnerSignUp extends Component {
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
    this.props.ownerSignUp(values, getJWTUsername(), response => {
      if (response.data.length === 0) {
        window.alert("Username and/or Password is incorrect.");
      } else if (response.data.token !== "Bearer ") {
        console.log("Sign-up successful.");

        const token = response.data;
        localStorage.setItem("ownerToken", token);

        this.props.history.push("/listproperty");
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;

    let redirectVar = null;
    if (getOwnerToken()) {
      redirectVar = <Redirect to="/listproperty" />;
    }

    return (
      <React.Fragment>
        {redirectVar}
        <Navbar />
        <div className="TL_container">
          <div className="TL_login_one">Log in to HomeAway</div>
          <br />
          <img
            src={require("../../images/owner_login.png")}
            width="450"
            height="300"
            alt="User has not uploaded anything yet"
          />
          <div className="form_container_OS">
            <div className="form_header_one">Owner Login</div>
            <hr />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                name="username"
                autoFocus
                component={this.renderField}
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
            <hr />

            <div className="closing_line">
              Want to list your property?
              <a href="/ownersignup"> Learn More</a>
            </div>
          </div>

          <div className="TL_login_footer">
            Use of this Web site constitutes acceptance of the HomeAway.com{" "}
            <a href="/ownersignup">Terms and Conditions </a>
            and <a href="/ownersignup">Privacy Policy</a>. <br />
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

export default reduxForm({
  validate,
  form: "ownerSignUpForm"
})(
  connect(
    null,
    { ownerSignUp }
  )(OwnerSignUp)
);
