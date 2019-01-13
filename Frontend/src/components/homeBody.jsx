import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { getTravelerToken, getOwnerToken } from "./common/auth";
import { withRouter } from "react-router-dom";
import moment from "moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { saveSearchInput } from "../actions/searchPropertyActions";
import momentLocaliser from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";

momentLocaliser(moment);

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
    className="datepicker"
  />
);

class HomeBody extends Component {
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    let cname = "";
    if (field.label === "Guests") {
      cname = "form-control";
    }

    return (
      <div className={className}>
        <input
          className={cname}
          type="text"
          {...field.input}
          placeholder={field.label}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    if (!getTravelerToken() && !getOwnerToken()) {
      window.alert("Please login to continue searching for properties.");
      this.props.history.push("/travelerlogin");
    } else {
      this.props.saveSearchInput(values);
      this.props.history.push("/search");
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <React.Fragment>
        <div className="homebody">
          <div className="homebody_text">
            Book beach houses cabins, <br />
            condos and more, worldwide
          </div>
          <div className="homebody_text_form">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className="location_search">
                <Field
                  name="location"
                  component={this.renderField}
                  autoFocus
                  label="Where do you want to go?"
                />
              </div>
              <div className="arrivedate_search">
                <Field
                  name="arrivedate"
                  showTime={false}
                  component={renderDateTimePicker}
                  label="Arrive"
                />
              </div>

              <div className="arrivedate_search">
                <Field
                  name="departdate"
                  showTime={false}
                  component={renderDateTimePicker}
                  label="Depart"
                />
              </div>
              <div className="guests_search">
                <Field
                  name="guests"
                  component={this.renderField}
                  label="Guests"
                />
              </div>
              <div className=" search_button">
                <button type="submit" className="btn btn-primary mb-2">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="homebody_footers">
          <div className="footer1">
            <div className="footer1_1">Your whole vacation starts here</div>
            <br />
            <div className="footer1_2">
              Choose a rental from the world's best selection
            </div>
          </div>
          <div className="footer2">
            <div className="footer1_1">Book and stay with confidence</div>
            <br />
            <div className="footer2_2">
              <a href="/home">Secure payments, peace of mind</a>
            </div>
          </div>
          <div className="footer3">
            <div className="footer3_1">Your vacation your way</div>
            <br />
            <div className="footer2_2">
              More space, more privacy, no compromises
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.location) {
    errors.location = "Location cannot be empty";
  } else if (values.location.length > 30) {
    errors.location = "Location cannot be more than 15 characters long";
  } else if (!/^[a-zA-Z0-9\s]*$/.test(values.location)) {
    errors.location = "Incorrect Location format";
  } else if (!values.arrivedate) {
    errors.location = "Arrive Date cannot be empty";
  } else if (values.arrivedate < new Date()) {
    errors.location = "Arrive Date cannot be less than today's date";
  } else if (values.arrivedate > values.departdate) {
    errors.location = "Depart Date cannot be less than Arrive";
  }

  if (!values.guests) {
    errors.guests = "Guests cannot be empty";
  } else if (values.guests >= 100 || values.guests <= 0) {
    errors.guests = "Guests should be between 1 and 100";
  } else if (!/^[0-9]*$/.test(values.guests)) {
    errors.guests = "Guests should contain numbers only";
  } else if (!values.departdate) {
    errors.guests = "Depart Date cannot be empty";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "searchProperty"
})(
  withRouter(
    connect(
      null,
      { saveSearchInput }
    )(HomeBody)
  )
);
