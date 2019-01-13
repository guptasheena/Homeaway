import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { Redirect } from "react-router";
import { getUsername } from "../../actions/UsernameActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { downloadPhoto } from "../../actions/listPropertyActions";
import { getUserPhotoName } from "../../actions/profileActions";
import { getTravelerToken, getOwnerToken, getJWTUsername } from "./auth";

class Navbar extends Component {
  state = {
    imageView: ""
  };

  handleLogout = () => {
    localStorage.removeItem("travelerToken");
    localStorage.removeItem("ownerToken");
    console.log("Logged out successfully.");
    return <Redirect to="/home" />;
  };

  componentDidMount() {
    const username = getJWTUsername();

    if (getTravelerToken() || getOwnerToken()) {
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
  }

  render() {
    let colorStyle = {};

    if (
      // window.location.href === "http://localhost:3000/" ||
      // window.location.href === "http://localhost:3000/#"
      window.location.href.includes("home")
    ) {
      colorStyle = {
        color: "white"
      };
    } else {
      colorStyle = {
        color: "#0067db"
      };
    }

    if (getTravelerToken() || getOwnerToken()) {
      return (
        <nav className="navbar navbar-expand-lg navbar-light ">
          <a className="navbar-home" href="/home" style={colorStyle}>
            HomeAway
          </a>
          <div className="nav-item dropdown country-link_login">
            <a
              className="nav-link country-link-text "
              href="/home"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={colorStyle}
            >
              <img
                src={require("../../images/usa_flag.png")}
                width="25"
                height="20"
                alt="Couldn't found anything"
              />
            </a>
            <div
              className="dropdown-menu dropdown-content dd_content_login"
              aria-labelledby="navbarDropdown"
            >
              <a className="dropdown-item" href="/home">
                United States
              </a>
              <a className="dropdown-item" href="/home">
                Brasil
              </a>
              <a className="dropdown-item " href="/home">
                Chile
              </a>
              <a className="dropdown-item" href="/home">
                Deutschland
              </a>
              <a className="dropdown-item" href="/home">
                France
              </a>
              <a className="dropdown-item" href="/home">
                Indonesia
              </a>
              <a className="dropdown-item" href="/home">
                Mexico
              </a>
              <a className="dropdown-item" href="/home">
                Norge
              </a>
              <a className="dropdown-item" href="/home">
                Polska
              </a>
              <a className="dropdown-item" href="/home">
                Sri Lanka
              </a>
              <a className="dropdown-item" href="/home">
                United Kingdom
              </a>
              <a className="dropdown-item" href="/home">
                Osterreich
              </a>
            </div>
          </div>
          <Link
            to="/tripboard"
            className="nav-link tripBoards-link"
            style={colorStyle}
          >
            Trip Boards
          </Link>
          <img
            src={this.state.imageView}
            width="35"
            height="30"
            // alt="Couldn't found anything"
            className="profile_photo_navbar"
          />
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle login-link"
              href="/home"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={colorStyle}
            >
              {getJWTUsername()}
            </a>
            <div
              className="dropdown-menu dropdown-content"
              aria-labelledby="navbarDropdown"
            >
              <a className="dropdown-item" href="/inbox">
                Inbox
              </a>

              <Link
                className="dropdown-item"
                to={{
                  pathname: "/travelerdashboard"
                }}
              >
                Traveler Dashboard
              </Link>

              <Link
                className="dropdown-item"
                to={{
                  pathname: "/ownerdashboard"
                }}
              >
                Owner Dashboard
              </Link>
              <Link
                className="dropdown-item"
                to={{
                  pathname: "/viewprofile"
                }}
              >
                My profile
              </Link>
              <a className="dropdown-item" href="/home">
                Account
              </a>
              <div className="dropdown-divider" />
              <a
                className="dropdown-item"
                href="/home"
                onClick={this.handleLogout}
              >
                Logout
              </a>
            </div>
          </div>
          <a href="/inbox">
            <img
              src={require("../../images/mail.png")}
              width="40"
              height="25"
              className="mail"
              alt="Couldn't found anything"
            />
          </a>
          <div className="nav-item dropdown help_dd">
            <a
              className="nav-link dropdown-toggle login-link"
              href="/home"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={colorStyle}
            >
              Help
            </a>
            <div
              className="dropdown-menu dropdown-content"
              aria-labelledby="navbarDropdown"
            >
              <a className="dropdown-item" href="/home">
                Visit help center
              </a>
              <div className="dropdown-divider" />
              <div className="dd-divider-custom">
                <a className="dropdown-item" href="/home">
                  Travelers
                </a>
              </div>
              <a className="dropdown-item" href="/home">
                How it works
              </a>
              <a className="dropdown-item" href="/home">
                Security Center
              </a>
              <div className="dropdown-divider" />
              <div className="dd-divider-custom">
                <a className="dropdown-item" href="/home">
                  Homeowners
                </a>
              </div>
              <a className="dropdown-item" href="/home">
                How it works
              </a>
              <a className="dropdown-item" href="/home">
                List your property
              </a>
              <a className="dropdown-item" href="/home">
                Community
              </a>
              <a className="dropdown-item" href="/home">
                Discovery Hub
              </a>
              <div className="dropdown-divider" />
              <div className="dd-divider-custom">
                <a className="dropdown-item" href="/home">
                  Property managers
                </a>
              </div>
              <a className="dropdown-item" href="/home">
                List your properties
              </a>
            </div>
          </div>
          <button className="btn_custom">
            <Link className="a_list" to="/ownersignup">
              List your property
            </Link>
          </button>
          <div className="nav-item dropdown">
            <a
              className="nav-link"
              href="/home"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={colorStyle}
            >
              <img
                src={require("../../images/logo_blue.svg")}
                width="70"
                height="60"
                alt="Couldn't find anything"
              />
            </a>
            <div className="dropdown-menu p-4 text-muted">
              <p>
                HomeAway is the world leader in vacation rentals. We offer the
                largest selection of properties for any travel occasion and
                every budget. We're committed to helping families and friends
                find a perfect vacation rental to create unforgettable travel
                experiences together.
              </p>
              <p className="mb-0">
                <a href="/home">Learn more</a>
              </p>
            </div>
          </div>
        </nav>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light ">
        <a className="navbar-home" href="/home" style={colorStyle}>
          HomeAway
        </a>
        <div className="nav-item dropdown country-link">
          <a
            className="nav-link  country-link-text "
            href="/home"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={colorStyle}
          >
            <img
              src={require("../../images/usa_flag.png")}
              width="25"
              height="20"
              alt="Couldn't found anything"
            />
          </a>
          <div
            className="dropdown-menu dropdown-content"
            aria-labelledby="navbarDropdown"
          >
            <a className="dropdown-item" href="/home">
              United States
            </a>
            <a className="dropdown-item" href="/home">
              Brasil
            </a>
            <a className="dropdown-item " href="/home">
              Chile
            </a>
            <a className="dropdown-item" href="/home">
              Deutschland
            </a>
            <a className="dropdown-item" href="/home">
              France
            </a>
            <a className="dropdown-item" href="/home">
              Indonesia
            </a>
            <a className="dropdown-item" href="/home">
              Mexico
            </a>
            <a className="dropdown-item" href="/home">
              Norge
            </a>
            <a className="dropdown-item" href="/home">
              Polska
            </a>
            <a className="dropdown-item" href="/home">
              Sri Lanka
            </a>
            <a className="dropdown-item" href="/home">
              United Kingdom
            </a>
            <a className="dropdown-item" href="/home">
              Osterreich
            </a>
          </div>
        </div>
        <Link
          to="/tripboard"
          className="nav-link tripBoards-link"
          style={colorStyle}
        >
          Trip Boards
        </Link>
        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle login-link"
            href="/home"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={colorStyle}
          >
            Login
          </a>
          <div
            className="dropdown-menu dropdown-content"
            aria-labelledby="navbarDropdown"
          >
            <a className="dropdown-item" href="/travelerlogin">
              Traveler Login
            </a>
            <a className="dropdown-item" href="/ownerlogin">
              Owner Login
            </a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle login-link"
            href="/home"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={colorStyle}
          >
            Help
          </a>
          <div
            className="dropdown-menu dropdown-content"
            aria-labelledby="navbarDropdown"
          >
            <a className="dropdown-item" href="/home">
              Visit help center
            </a>
            <div className="dropdown-divider" />
            <div className="dd-divider-custom">
              <a className="dropdown-item" href="/home">
                Travelers
              </a>
            </div>
            <a className="dropdown-item" href="/home">
              How it works
            </a>
            <a className="dropdown-item" href="/home">
              Security Center
            </a>
            <div className="dropdown-divider" />
            <div className="dd-divider-custom">
              <a className="dropdown-item" href="/home">
                Homeowners
              </a>
            </div>
            <a className="dropdown-item" href="/home">
              How it works
            </a>
            <a className="dropdown-item" href="/home">
              List your property
            </a>
            <a className="dropdown-item" href="/home">
              Community
            </a>
            <a className="dropdown-item" href="/home">
              Discovery Hub
            </a>
            <div className="dropdown-divider" />
            <div className="dd-divider-custom">
              <a className="dropdown-item" href="/home">
                Property managers
              </a>
            </div>
            <a className="dropdown-item" href="/home">
              List your properties
            </a>
          </div>
        </div>
        <button className="btn_custom">
          <a href="/ownersignup">List your property</a>
        </button>

        <div className="nav-item dropdown">
          <a
            className="nav-link"
            href="/home"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={colorStyle}
          >
            <img
              src={require("../../images/logo_blue.svg")}
              width="70"
              height="60"
              alt="Couldn't found anything"
            />
          </a>
          <div className="dropdown-menu p-4 text-muted">
            <p>
              HomeAway is the world leader in vacation rentals. We offer the
              largest selection of properties for any travel occasion and every
              budget. We're committed to helping families and friends find a
              perfect vacation rental to create unforgettable travel experiences
              together.
            </p>
            <p className="mb-0">
              <a href="/home">Learn more</a>
            </p>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  username: PropTypes.string.isRequired,
  getUserPhotoName: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { username: state.username.username };
}

export default connect(
  mapStateToProps,
  { getUsername, getUserPhotoName, downloadPhoto }
)(Navbar);
