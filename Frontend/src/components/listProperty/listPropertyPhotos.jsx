import React, { Component } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  savePhotoName,
  downloadPhoto,
  uploadPhoto
} from "../../actions/listPropertyActions";
import Navbar from "../common/navbar";
import { getTravelerToken, getOwnerToken } from "../common/auth";

class ListPropertyPhotos extends Component {
  state = {
    photos: [],
    imageView: [],
    fileFormatError: false
  };

  handleLocationSubmit = () => {
    this.props.history.push("/listpropertylocation");
  };

  handleDetailsSubmit = () => {
    this.props.history.push("/listpropertydetails");
  };

  handleWelcomeSubmit = () => {
    this.props.history.push("/listproperty");
  };

  handlePricingSubmit = () => {
    if (this.state.fileFormatError === true) {
      this.props.savePhotoName(null);
      window.alert(
        "Image format can only be jpeg/jpg/png. Image name cannot contain dot."
      );
    } else if (
      this.state.photos.length === 0 ||
      (this.state.photos.length >= 2 && this.state.photos.length <= 5)
    ) {
      this.props.history.push("/listpropertypricing");
    } else if (this.state.photos.length < 2) {
      window.alert("Please upload more than 2 photos.");
    } else if (this.state.photos.length > 5) {
      window.alert("You can upload a maximum of 5 photos.");
    }
  };

  getPhoto = e => {
    const fileNames = [];
    for (var index = 0; index < this.state.photos.length; index++) {
      fileNames[index] = this.state.photos[index].name;
    }

    this.props.downloadPhoto(fileNames, response => {
      let imagePreview = [];
      for (var index = 0; index < response.data.length; index++) {
        imagePreview[index] = "data:image/jpg;base64, " + response.data[index];
      }
      this.props.savePhotoName(fileNames);
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
        let fileFormatError = false;

        for (var index = 0; index < files.length; index++) {
          if (
            files[index].name.split(".")[1] == "jpg" ||
            files[index].name.split(".")[1] == "jpeg" ||
            files[index].name.split(".")[1] == "png"
          ) {
            fileFormatError = false;
            formData.append("files", files[index]);
          } else {
            fileFormatError = true;
            break;
          }
        }

        this.setState({ fileFormatError: fileFormatError });
        if (fileFormatError === false) {
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
      }
    );
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
          <a href="#" onClick={this.handleDetailsSubmit}>
            Details
          </a>
          <a href="#">Booking options</a>
          <a href="#">
            <span className="active_link">Photos</span>
          </a>
          <a href="#">Security</a>
          <a href="#">Payment</a>
          <a href="#" onClick={this.handlePricingSubmit}>
            Pricing
          </a>
        </div>
        <div className="list_property_photos">
          <h2>Add up to 5 photos of your property</h2>
          <hr />

          <h5>
            Showcase your property’s best features (no pets or people, please).
            Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file
            size, 2 photos minimum.
            <a href="/listproperty"> Need photos? Hire a professional.</a>
          </h5>
          <p className="dashed_border">
            Drop photos here <br />
            or <br />
            <input
              type="file"
              multiple
              name="files"
              onChange={this.onPhotoChange}
            />
            <br />
            <span>
              0 of 5 uploaded. 2 are required. You can choose to upload more
              than one photo at a time.
            </span>
          </p>
          <div className="display_photo">
            {this.state.imageView.map(image => (
              <img
                src={image}
                alt="Nothing has been uploaded yet"
                key={image}
              />
            ))}
          </div>
          <hr />
          <button
            type="button"
            className="btn_photo_back"
            onClick={this.handleDetailsSubmit}
          >
            Back
          </button>
          <button
            type="button"
            className="btn_photo_next"
            onClick={this.handlePricingSubmit}
          >
            Next
          </button>
        </div>
        <div className="photos_footer">
          Use of this Web site constitutes acceptance of the HomeAway.com
          <a href="/listproperty"> Terms and conditions</a> and
          <a href="/listproperty">Privacy policy</a>.
          <p> ©2018 HomeAway. All rights reserved</p>
          <a href="/listproperty">Start Co-browse</a>
        </div>
      </div>
    );
  }
}

ListPropertyPhotos.propTypes = {
  savePhotoName: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired,
  uploadPhoto: PropTypes.func.isRequired
};

export default connect(
  null,
  { savePhotoName, downloadPhoto, uploadPhoto }
)(ListPropertyPhotos);
