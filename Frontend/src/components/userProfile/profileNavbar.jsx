import React, { Component } from "react";

class ProfileNavbar extends Component {
  render() {
    return (
      <div className="profile_navbar">
        <nav className="navbar navbar-expand-lg">
          <div className="navbar-collapse">
            <ul className="navbar-nav ">
              <li className="link_text">
                <a href="/myprofile">Inbox</a>
              </li>
              <li className="link_text">
                <a href="/myprofile">My Trips</a>
              </li>
              <li className="link_text">
                <a href="/myprofile" className="profile">
                  Profile
                </a>
              </li>

              <li className="link_text">
                <a href="/myprofile">Account</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default ProfileNavbar;
