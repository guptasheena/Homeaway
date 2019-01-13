import React, { Component } from "react";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { listProperty, getPhotoName } from "../../actions/listPropertyActions";
import Navbar from "../common/navbar";
import {
  getTravelerToken,
  getOwnerToken,
  getJWTUsername
} from "../common/auth";

const renderDateTimePicker = ({
  input: { onChange, value },
  showTime,
  label
}) => (
  <DateTimePicker
    onChange={onChange}
    format="MM/DD/YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
    placeholder={label}
    className="datepicker_pricing"
  />
);

class ListPropertyPricing extends Component {
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

  componentDidMount() {
    this.props.getPhotoName();
  }

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
    window.location.reload();
  };

  handleSuccess = () => {
    this.props.history.push("/listpropertysuccess");
  };

  onSubmit(values) {
    values.photos = this.props.photos ? this.props.photos : "noPhotoFound.jpg";

    const username = getJWTUsername();
    this.props.listProperty(values, username, res => {
      if (res.data === "Error") window.alert("Cannot save property.");
      else this.handleSuccess();
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { listPropertyData } = this.props;

    let redirectVar = null;
    if (!getTravelerToken() && !getOwnerToken()) {
      redirectVar = <Redirect to="/ownersignup" />;
    }

    if (listPropertyData === "OK") {
      this.handleSuccess();
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
          <a href="#">
            <span className="active_link" onClick={this.handlePricingSubmit}>
              Pricing
            </span>
          </a>
        </div>

        <div className="list_property_pricing">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <h4>Pricing</h4>
            <hr />
            <br />
            <Field
              name="startdate"
              showTime={false}
              component={renderDateTimePicker}
              label="Start Date"
            />
            <br />
            <Field
              name="enddate"
              showTime={false}
              component={renderDateTimePicker}
              label="End Date"
            />

            <Field
              name="currency"
              component={this.renderField}
              autoFocus
              label="Currency"
            />
            <Field
              name="nightlyrate"
              component={this.renderField}
              autoFocus
              label="Nightly Base Rate"
            />
            <Field
              name="minimumstay"
              component={this.renderField}
              autoFocus
              label="Minimum stay"
            />

            <Field
              name="cleaningfee"
              component={this.renderField}
              autoFocus
              label="Cleaning Fee"
            />
            <Field
              name="pets"
              component={this.renderField}
              autoFocus
              label="Are pets allowed?"
            />
            <hr className="last_hr" />
            <button
              type="button"
              className="btn_pricing_back"
              onClick={this.handlePhotosSubmit}
            >
              Back
            </button>

            <button type="submit" className="btn_pricing_next">
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

  if (!values.currency) {
    errors.currency = "Currency cannot be empty";
  } else if (values.currency.length > 5) {
    errors.currency = "Currency cannot be more than 5 characters long";
  } else if (!/^[a-zA-Z]*$/.test(values.currency)) {
    errors.currency = "Incorrect Currency format";
  }

  if (!values.nightlyrate) {
    errors.nightlyrate = "Nightly Base Rate cannot be empty";
  } else if (values.nightlyrate.length > 5) {
    errors.nightlyrate = "Nightly Base Rate cannot be more than 5 digits long";
  } else if (!/^[0-9.]*$/.test(values.nightlyrate)) {
    errors.nightlyrate = "Nightly Base Rate should contain digits only";
  }

  if (!values.minimumstay) {
    errors.minimumstay = "Minimum Stay cannot be empty";
  } else if (values.minimumstay.length > 2) {
    errors.minimumstay = "Minimum Stay cannot be more than 2 digits long";
  } else if (!/^[0-9]*$/.test(values.minimumstay)) {
    errors.minimumstay = "Minimum Stay should contain digits only";
  }

  if (!values.cleaningfee) {
    errors.cleaningfee = "Cleaning Fee cannot be empty";
  } else if (values.cleaningfee.length > 5) {
    errors.cleaningfee = "Cleaning Fee cannot be more than 5 digits long";
  } else if (!/^[0-9.]*$/.test(values.cleaningfee)) {
    errors.cleaningfee = "Cleaning Fee should contain digits only";
  }

  if (!values.pets) {
    errors.pets = "Are pets allowed? cannot be empty";
  } else if (values.pets.length > 3) {
    errors.pets = "Are pets allowed? cannot be more than 3 characters long";
  } else if (!/^(?:Yes|No|yes|no|YES|NO)$/.test(values.pets)) {
    errors.pets = "Only yes and no is allowed";
  }

  if (!values.startdate) {
    errors.currency = "Start Date cannot be empty";
  } else if (!values.enddate) {
    errors.currency = "End Date cannot be empty";
  } else if (values.startdate < new Date()) {
    errors.currency = "Start Date cannot be less than today's date";
  } else if (values.startdate > values.enddate) {
    errors.currency = "End Date cannot be less than Start date";
  }

  return errors;
}

ListPropertyPricing.propTypes = {
  // listPropertyData: PropTypes.array.isRequired,
  listProperty: PropTypes.func.isRequired,
  getPhotoName: PropTypes.func.isRequired,
  photos: PropTypes.array
};

const mapStateToProps = state => ({
  listPropertyData: state.listProperty.listPropertyData,
  photos: state.listProperty.photos
});

export default reduxForm({
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: "listPropertyForm"
})(
  connect(
    mapStateToProps,
    { listProperty, getPhotoName }
  )(ListPropertyPricing)
);
