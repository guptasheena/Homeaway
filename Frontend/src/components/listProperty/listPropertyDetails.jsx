import React, { Component } from "react";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../common/navbar";
import { getTravelerToken, getOwnerToken } from "../common/auth";

class ListPropertyDetails extends Component {
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

  renderTextArea(field) {
    const {
      meta: { touched, error }
    } = field;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <textarea
          className="form-control"
          rows="8"
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

  handleLocationSubmit = () => {
    this.props.history.push("/listpropertylocation");
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
          <a href="#">
            <span className="active_link">Details</span>
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

        <div className="list_property_details">
          <form className="details_form">
            <h5>Describe your property</h5>
            <hr />
            <div className="headline">
              Start out with a descriptive headline and a detailed summary of
              your property.
            </div>
            <Field
              name="headline"
              component={this.renderField}
              autoFocus
              label="Headline"
            />

            <Field
              name="description"
              component={this.renderTextArea}
              label="Property description"
            />

            <Field
              name="type"
              component={this.renderField}
              autoFocus
              label="Property type"
            />

            <Field
              name="bedrooms"
              component={this.renderField}
              autoFocus
              label="Bedrooms"
            />

            <Field
              name="accommodates"
              component={this.renderField}
              autoFocus
              label="Accommodates"
            />

            <Field
              name="bathrooms"
              component={this.renderField}
              autoFocus
              label="Bathrooms"
            />

            <hr />
            <button
              type="button"
              className="btn btn-primary btn_back"
              onClick={this.handleLocationSubmit}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary btn_next"
              onClick={this.handlePhotosSubmit}
            >
              Next
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

  if (!values.headline) {
    errors.headline = "Headline cannot be empty";
  } else if (values.headline.length > 30) {
    errors.headline = "Headline cannot be more than 30 characters long";
  }

  if (!values.description) {
    errors.description = "Property Description cannot be empty";
  } else if (values.description.length > 180) {
    errors.description =
      "Property Description cannot be more than 180 characters long";
  }

  if (!values.type) {
    errors.type = "Property Type cannot be empty";
  } else if (values.type.length > 20) {
    errors.type = "Property Type cannot be more than 20 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.type)) {
    errors.type = "Incorrect Property Type format";
  }

  if (!values.bedrooms) {
    errors.bedrooms = "Bedrooms cannot be empty";
  } else if (values.bedrooms.length > 2) {
    errors.bedrooms = "Bedrooms cannot be more than 2 digits long";
  } else if (!/^[0-9]*$/.test(values.bedrooms)) {
    errors.bedrooms = "Bedrooms should contain digits only";
  }

  if (!values.accommodates) {
    errors.accommodates = "Accommodates cannot be empty";
  } else if (values.accommodates.length > 2) {
    errors.accommodates = "Accommodates cannot be more than 2 digits long";
  } else if (!/^[0-9]*$/.test(values.accommodates)) {
    errors.accommodates = "Accommodates should contain digits only";
  }

  if (!values.bathrooms) {
    errors.bathrooms = "Bathrooms cannot be empty";
  } else if (values.bathrooms.length > 2) {
    errors.bathrooms = "Bathrooms cannot be more than 2 digits long";
  } else if (!/^[0-9]*$/.test(values.bathrooms)) {
    errors.bathrooms = "Bathrooms should contain digits only";
  }

  return errors;
}

ListPropertyDetails.propTypes = {
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
  )(ListPropertyDetails)
);
