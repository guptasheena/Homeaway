import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Navbar from "../common/navbar";
import ProfileNavbar from "./profileNavbar";
import {
  getProfile,
  saveProfile,
  getUserPhotoName
} from "../../actions/profileActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { downloadPhoto, uploadPhoto } from "../../actions/listPropertyActions";
import {
  getTravelerToken,
  getOwnerToken,
  getJWTUsername
} from "../common/auth";

class Profile extends Component {
  state = {
    photos: [],
    imageView: ""
  };

  getPhoto = e => {
    const fileName = this.state.photos[0].name;

    this.props.downloadPhoto(fileName, response => {
      let imagePreview = "data:image/jpg;base64, " + response.data[0];

      this.setState({
        imageView: imagePreview
      });
    });
  };

  onPhotoChange = e => {
    const files = e.target.files;
    this.setState(
      {
        photos: files
      },
      function() {
        const files = this.state.photos;
        let formData = new FormData();

        for (var index = 0; index < files.length; index++) {
          formData.append("files", files[index]);
        }

        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };

        this.props.uploadPhoto(formData, config, response => {
          if (response.status === 200) {
            this.getPhoto();
          } else {
            window.alert(
              "Could not upload photos at this time. Please try again later."
            );
          }
        });
      }
    );
  };

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;

    let className = `form-group ${touched && error ? "has-danger" : ""}`;

    if (field.label === "Contact Number") {
      className = `contact_field form-group ${
        touched && error ? "has-danger" : ""
      }`;
    }

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
          rows="5"
          {...field.input}
          placeholder={field.label}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  componentDidMount() {
    const username = getJWTUsername();

    this.props.getUserPhotoName(username, res => {
      const fileName = res.data ? res.data.photo : "noPhotoFound.jpg";

      this.props.downloadPhoto(fileName, response => {
        let imagePreview = "data:image/jpg;base64, " + response.data;
        this.setState({
          imageView: imagePreview
        });
      });
    });

    this.props.getProfile(username);
  }

  onSubmit(values) {
    const username = getJWTUsername();

    let fileName = this.state.photos[0]
      ? this.state.photos[0].name
      : "noPhotoFound.jpg";

    if (fileName === "noPhotoFound.jpg") {
      this.props.getUserPhotoName(username, res => {
        fileName = res.data.user.photo
          ? res.data.user.photo
          : "noPhotoFound.jpg";

        values.photo = fileName;
      });
    } else {
      values.photo = fileName;
    }

    this.props.saveProfile(values, username);

    window.location.reload();
    window.alert("Profile updated!");
  }

  render() {
    const { handleSubmit } = this.props;
    const username = getJWTUsername();

    let redirectVar = null;
    if (!getTravelerToken() && !getOwnerToken()) {
      redirectVar = <Redirect to="/home" />;
    }

    const { profile } = this.props;

    return (
      <React.Fragment>
        {redirectVar}
        <Navbar />
        <hr />
        <ProfileNavbar />
        <hr />
        <div>
          <div className="profileName">
            <div className="profilephoto">
              <input
                type="file"
                className="upload_profile_photo"
                name="files"
                onChange={this.onPhotoChange}
              />
              <img
                src={this.state.imageView}
                width="300"
                height="200"
                alt="User has not uploaded anything yet"
              />
            </div>
            <br />
            <h2 className="full_name">
              <span>
                {profile ? profile.firstname : ""}{" "}
                {profile ? profile.lastname : ""}
              </span>
            </h2>
            <div className="member_since">
              Member since {profile ? profile.creationyear : ""}
            </div>
          </div>
          <div className="profile_body">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className="profile_information">
                <h3>Profile Information</h3>
                <a href="/myprofile" className="import">
                  Import
                  <button className="fa fa-facebook" />
                </a>
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
                  name="about"
                  component={this.renderTextArea}
                  label="About me"
                />

                <Field
                  name="city"
                  component={this.renderField}
                  label="My city,country"
                />
                <Field
                  name="company"
                  component={this.renderField}
                  label="Company"
                />
                <Field
                  name="school"
                  component={this.renderField}
                  label="School"
                />
                <Field
                  name="hometown"
                  component={this.renderField}
                  label="Hometown"
                />
                <Field
                  name="languages"
                  component={this.renderField}
                  label="Languages"
                />

                <Field
                  name="gender"
                  component="select"
                  className="form-control"
                >
                  <option />
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </Field>
                <small className="form-text text-muted">
                  This is never shared
                </small>

                <img
                  src={require("../../images/sms.png")}
                  width="55"
                  height="60"
                  alt="Couldn't found anything"
                />

                <div className="mobile_text">
                  <div>Send me texts about my bookings</div>
                  <span>
                    Only available for mobile phones in select countries.
                    Standard messaging <br />
                    rates apply. See{" "}
                    <a href="/myprofile">terms and conditions</a> and
                    <a href="/myprofile"> privacy policy</a>.
                  </span>
                </div>
                <div className="contact_number">
                  <img
                    src={require("../../images/usa_flag.png")}
                    width="55"
                    height="40"
                    alt="User has not uploaded anything yet."
                  />
                </div>
                <div className="contact">
                  <Field
                    name="phone"
                    component={this.renderField}
                    label="Contact Number"
                  />
                </div>
                <a href="/myprofile">Add another phone number</a>
              </div>
              <div className="verifications">
                <h3>Verifications</h3>
                <span className="verifications_headings">
                  Email Address
                </span>{" "}
                <span className="verifications_status">Verified &#10004;</span>{" "}
                <br />
                <br />
                <div className="verifications_headings">
                  Social Account Verifications
                </div>
                <span className="verification_body">
                  Verifying one or more social accounts improves your
                  trustworthiness to owners. We'll never post anything without
                  your permission.{" "}
                </span>
                <br />
                <br />
                <span className="verifications_headings">Facebook</span>{" "}
                <span className="verifications_status">Verified &#10004;</span>
                <a className="btn btn-block btn-social btn-google">
                  <span className="fa fa-google" />
                  <span className="google_text">Verify with Google</span>
                </a>
              </div>
              <div className="view_profile">
                <Link
                  className="btn btn-primary"
                  to={{
                    pathname: "/viewprofile",
                    state: { username: username }
                  }}
                >
                  View profile
                </Link>
              </div>
              <div className="helpful_tips">
                <img
                  className="person"
                  src={require("../../images/person_logo.png")}
                  width="70"
                  height="80"
                  alt="User has not uploaded anything yet."
                />
                <br />
                <h4>Helpful tips</h4>
                <div className="tips_body">
                  <span className="numbers"> 1</span> &nbsp; Add a photo of
                  yourself
                  <br />
                  <br />
                  <span className="numbers"> 2</span> &nbsp; Verify your
                  identity
                  <br />
                  <br />
                  <span className="numbers"> 3</span>{" "}
                  <div className="tips_interest">
                    Describe your interests, hobbies, and why you like to travel
                  </div>
                </div>
                <img
                  src={require("../../images/tips.png")}
                  width="397"
                  height="250"
                  className="tips_logo"
                  alt="User has not uploaded anything yet."
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>{" "}
            </form>
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
  } else if (values.firstname.length > 20) {
    errors.firstname = "First Name cannot be more than 20 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.firstname)) {
    errors.firstname = "Incorrect First Name format";
  }

  if (!values.lastname) {
    errors.lastname = "Last Name cannot be empty";
  } else if (values.lastname.length > 20) {
    errors.lastname = "Last Name cannot be more than 20 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.lastname)) {
    errors.lastname = "Incorrect Last Name format";
  }

  if (values.about && values.about.length > 100) {
    errors.about = "About me cannot be more than 100 characters long";
  }

  if (values.city && values.city.length > 20) {
    errors.city = "My city,country cannot be more than 20 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.city)) {
    errors.city = "Incorrect My city,country format";
  }

  if (values.company && values.company.length > 30) {
    errors.company = "Company cannot be more than 30 characters long";
  }

  if (values.school && values.school.length > 30) {
    errors.school = "School cannot be more than 30 characters long";
  }

  if (values.hometown && values.hometown.length > 20) {
    errors.hometown = "Hometown cannot be more than 20 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.hometown)) {
    errors.hometown = "Incorrect Hometown format";
  }

  if (values.languages && values.languages.length > 50) {
    errors.languages = "Languages cannot be more than 50 characters long";
  } else if (!/^[a-zA-Z,\s]*$/.test(values.languages)) {
    errors.languages = "Incorrect Languages format";
  }

  if (!/^[0-9]*$/.test(values.phone)) {
    errors.phone = "Contact Number should contain only digits";
  }
  // else if (values.phone && values.phone.length !== 10) {
  //   errors.phone = "Contact Number should be of 10 characters";
  // }

  return errors;
}

Profile.propTypes = {
  profile: PropTypes.object,
  getProfile: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
  getUserPhotoName: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
  photo: PropTypes.string
};

Profile = reduxForm({
  validate,
  form: "profileForm"
})(Profile);

Profile = connect(
  state => ({
    profile: state.userProfile.profile,
    initialValues: state.userProfile.profile
  }),
  { getProfile, saveProfile, getUserPhotoName, downloadPhoto, uploadPhoto }
)(Profile);

export default Profile;
