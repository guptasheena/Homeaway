import React, { Component } from "react";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
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
    className="datepicker"
  />
);

class SearchUtils extends Component {
  state = { imageView: [] };

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input type="text" {...field.input} placeholder={field.label} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  formatDate(user_date) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var date = new Date(user_date);
    var year = date.getFullYear();
    var day = date.getDate();
    var newDate = monthNames[date.getMonth()] + " " + day + " " + year;
    return newDate;
  }

  onSubmit(values) {
    if (!getTravelerToken() && !getOwnerToken()) {
      window.alert("Please login to continue searching for properties.");
      this.props.history.push("/travelerlogin");
    } else {
      const username = getJWTUsername();
      this.props.saveSearchInput(values);
      this.props.getSearchResults(values, username);

      this.props.getAllPhotoNamesSearch(values, username, res => {
        const fileName = res.data;
        const fileNames = [];
        const len = fileName.length;
        for (var index = 0; index < len; index++) {
          fileNames[index] = fileName[index].photos
            ? fileName[index].photos.split(",")[0]
            : "";
        }

        this.props.downloadPhoto(fileNames, response => {
          let imagePreview = [];
          for (var index = 0; index < response.data.length; index++) {
            imagePreview[index] =
              "data:image/jpg;base64, " + response.data[index];
          }

          this.setState({
            imageView: imagePreview
          });
        });
      });

      this.props.history.push("/search");
    }
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

export { SearchUtils, validate, renderDateTimePicker };
