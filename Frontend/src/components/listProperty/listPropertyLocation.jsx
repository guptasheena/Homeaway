import React, { Component } from "react";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../common/navbar";
import { getTravelerToken, getOwnerToken } from "../common/auth";

class ListPropertyLocation extends Component {
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <input
          className="form-control"
          type="text"
          {...field.input}
          placeholder={field.label}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  handleWelcomeSubmit = () => {
    this.props.history.push("/listproperty");
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

          <a href="#">
            <span className="active_link">Location</span>
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

        <div className="list_property_location">
          <form>
            <Field
              name="country"
              component={this.renderField}
              autoFocus
              label="Country"
            />
            <Field
              name="streetaddress"
              component={this.renderField}
              autoFocus
              label="Street Address"
            />
            <Field
              name="building"
              component={this.renderField}
              autoFocus
              label="Unit,Suite,Building,Etc."
            />
            <Field
              name="city"
              component={this.renderField}
              autoFocus
              label="City"
            />
            <Field
              name="state"
              component={this.renderField}
              autoFocus
              label="State"
            />
            <Field
              name="zipcode"
              component={this.renderField}
              autoFocus
              label="Zip Code"
            />

            <button
              type="button"
              className="btn btn-primary btn_cancel"
              onClick={this.handleWelcomeSubmit}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn_save"
              onClick={this.handleDetailsSubmit}
            >
              Save
            </button>
          </form>
        </div>
        <div className="location_footer">
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

function validate(values) {
  const errors = {};

  if (!values.country) {
    errors.country = "Country cannot be empty";
  } else if (values.country.length > 20) {
    errors.country = "Country cannot be more than 20 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.country)) {
    errors.country = "Incorrect Country format";
  }

  if (!values.streetaddress) {
    errors.streetaddress = "Street Address cannot be empty";
  } else if (values.streetaddress.length > 30) {
    errors.streetaddress =
      "Street Address cannot be more than 30 characters long";
  }

  if (!values.building) {
    errors.building = "Unit,Suite,Building,Etc. cannot be empty";
  } else if (values.building.length > 20) {
    errors.building =
      "Unit,Suite,Building,Etc. cannot be more than 20 characters long";
  } else if (!/^[a-zA-Z0-9\s]*$/.test(values.building)) {
    errors.building = "Incorrect Unit,Suite,Building,Etc. format";
  }

  if (!values.city) {
    errors.city = "City cannot be empty";
  } else if (values.city.length > 20) {
    errors.city = "City cannot be more than 20 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.city)) {
    errors.city = "Incorrect City format";
  }

  if (!values.state) {
    errors.state = "State cannot be empty";
  } else if (values.state.length > 20) {
    errors.state = "State cannot be more than 20 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.state)) {
    errors.state = "Incorrect State format";
  }

  if (!values.zipcode) {
    errors.zipcode = "Zip Code cannot be empty";
  } else if (values.zipcode.length < 5 || values.zipcode.length > 6) {
    errors.zipcode = "Zip Code should be or 5 or 6 characters";
  } else if (!/^[0-9]*$/.test(values.zipcode)) {
    errors.zipcode = "Zip Code should contain only digits";
  }

  return errors;
}

ListPropertyLocation.propTypes = {
  listPropertyData: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  listPropertyData: state.listProperty.listPropertyData
});

export default reduxForm({
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "listPropertyForm"
})(
  connect(
    mapStateToProps,
    null
  )(ListPropertyLocation)
);
