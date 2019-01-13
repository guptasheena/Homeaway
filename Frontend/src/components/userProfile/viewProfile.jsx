import React from "react";
import Navbar from "../common/navbar";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { getProfile, getUserPhotoName } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SearchUtils } from "../utils/searchUtils";
import { downloadPhoto } from "../../actions/listPropertyActions";
import {
  getTravelerToken,
  getOwnerToken,
  getJWTUsername
} from "../common/auth";

class ViewProfile extends SearchUtils {
  state = {
    imageView: ""
  };

  componentDidMount() {
    const username = getJWTUsername();
    this.props.getProfile(username);

    this.props.getUserPhotoName(username, res => {
      const fileName = res.data.photo ? res.data.photo : "noPhotoFound.jpg";

      this.props.downloadPhoto(fileName, response => {
        let imagePreview = "data:image/jpg;base64, " + response.data;
        this.setState({
          imageView: imagePreview
        });
      });
    });
  }

  render() {
    let redirectVar = null;
    if (!getTravelerToken() && !getOwnerToken()) {
      redirectVar = <Redirect to="/home" />;
    }

    const { profile } = this.props;

    if (profile === null) {
      return (
        <React.Fragment>
          {redirectVar}
          <Navbar />
          <p className="notfound">Profile not found</p>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {redirectVar}
          <Navbar />
          <div className="view_profile_container">
            <div className="view_photo">
              <img
                src={this.state.imageView}
                alt="The Traveler hasn't uploaded anything yet"
              />
              <div className="ratings">
                <span className="fa fa-star " />
                <span className="fa fa-star " />
                <span className="fa fa-star " />
                <span className="fa fa-star" />
                <span className="fa fa-star" />
              </div>
              <p>No Rating</p>
            </div>
            <div className="traveler_verification">
              <span className="headings">&#10004; Email Address</span>{" "}
              &nbsp;Verified
              <br /> <span className="headings">&#10004; Facebook</span>{" "}
              &nbsp;Verified <br />
              <span className="headings">&#10004; Phone Number</span>{" "}
              &nbsp;Verified
            </div>
            <div className="profile_fullname">
              <span>
                Hi, I'm {profile ? profile.firstname : ""} {""}
                {profile ? profile.lastname : ""}
              </span>
              <p> Member since {profile ? profile.creationyear : ""}</p>
            </div>
            <div className="profile_about">
              <span>About me</span> <br />
              <br />
              {(profile
              ? profile.about
              : "")
                ? profile.about
                : "The traveler hasn't written anything personal"}
              <br />
              <br />
              <div>Hometown: {profile ? profile.hometown : ""} </div>
              <div>Company: {profile ? profile.company : ""}</div>
              <div>School: {profile ? profile.school : ""} </div>
              <div>Languages: {profile ? profile.languages : ""}</div>
            </div>
            <div className="edit_profile">
              &#9998;
              <Link to="/myprofile">Edit Profile</Link>
            </div>{" "}
          </div>
        </React.Fragment>
      );
    }
  }
}

ViewProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  getUserPhotoName: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired,
  photo: PropTypes.string
};

const mapStateToProps = state => ({
  profile: state.userProfile.profile,
  photo: state.userProfile.photo
});

export default connect(
  mapStateToProps,
  { getProfile, getUserPhotoName, downloadPhoto }
)(ViewProfile);
