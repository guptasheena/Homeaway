import React, { Component } from "react";
import Navbar from "../common/navbar";
import { getTravelerToken, getOwnerToken } from "../common/auth";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchPropertyByID } from "../../actions/DashboardActions";
import {
  getPhotoNamesByPropertyID,
  downloadPhoto
} from "../../actions/listPropertyActions";

class viewDashboardProperty extends Component {
  state = {
    imageView: [],
    photos: [],
    currentPhoto: ""
  };

  componentDidMount() {
    this.props.searchPropertyByID(
      this.props.location.state ? this.props.location.state.propertyID : ""
    );

    this.props.getPhotoNamesByPropertyID(
      this.props.location.state ? this.props.location.state.propertyID : "",
      res => {
        const file = res.data.photos.split(",")[0];
        this.setState({ photos: res.data.photos.split(",") });
        this.setState({ currentPhoto: file });
        this.getPhoto(file);
      }
    );
  }

  getPhoto = fileName => {
    this.props.downloadPhoto(fileName, response => {
      let imagePreview = [];
      for (var index = 0; index < response.data.length; index++) {
        imagePreview[index] = "data:image/jpg;base64, " + response.data[index];
      }
      this.setState({
        imageView: imagePreview
      });
    });
  };

  displayLeftImage = () => {
    let index = this.state.photos.indexOf(this.state.currentPhoto);
    if (index === this.state.photos.length - 1) index = 0;
    else index++;
    this.setState({ currentPhoto: this.state.photos[index] });
    this.getPhoto(this.state.photos[index]);
  };

  displayRightImage = () => {
    let index = this.state.photos.indexOf(this.state.currentPhoto);
    if (index === 0) index = this.state.photos.length - 1;
    else index--;
    this.setState({ currentPhoto: this.state.photos[index] });
    this.getPhoto(this.state.photos[index]);
  };

  render() {
    let redirectVar = null;
    if (!getTravelerToken() && !getOwnerToken()) {
      redirectVar = <Redirect to="/home" />;
    }

    const { owner_dashboard } = this.props;

    if (owner_dashboard && owner_dashboard.length === 0) {
      return (
        <React.Fragment>
          {redirectVar}
          <Navbar />
          <p className="notfound">No property found</p>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {redirectVar}
          <Navbar />
          <br />
          {owner_dashboard &&
            owner_dashboard.map(data => (
              <div className="property_view_container" key={data._id}>
                <hr />

                <div className="image_body1">
                  <div className="left_arrow">
                    <button onClick={this.displayLeftImage}>
                      <img
                        src={require("../../images/leftArrow.jpg")}
                        width="80"
                        height="80"
                        alt="Nothing has been uploaded yet"
                      />
                    </button>
                  </div>

                  <img
                    src={this.state.imageView}
                    width="940"
                    height="440"
                    alt="Nothing has been uploaded yet"
                  />

                  <div className="right_arrow">
                    <button onClick={this.displayRightImage}>
                      <img
                        src={require("../../images/rightArrow.jpg")}
                        width="80"
                        height="80"
                        alt="Nothing has been uploaded yet"
                      />
                    </button>
                  </div>
                </div>
                <div className="property_details_container" id="overview">
                  <div className="fixed_menu">
                    <div className="display_property_menu">
                      <a href="#overview">Overview</a>
                      <a href="#amenities">Amenities</a>
                      <a href="#overview">Reviews</a>
                      <a href="#overview">Map</a>
                      <a href="#overview">Rates and Availability</a>
                    </div>
                    <hr />
                  </div>

                  <div className="display_address">
                    <img
                      src={require("../../images/small_map.png")}
                      width="100"
                      height="100"
                      alt="User has not uploaded anything yet"
                    />
                    <div>{data.headline}</div>
                    <span className="fa">
                      {" "}
                      &#xf041; {data.city}, {data.state}, {data.country}
                    </span>
                  </div>

                  <div className="property_symbols">
                    <div className="property_symbol1">
                      <span className="fa fa-home" />
                      <div>{data.type}</div>
                      <p>1022 sq. ft.</p>
                    </div>

                    <div className="property_symbol2">
                      <span className="fa fa-bed" />
                      <div>Bedrooms</div>
                      <p>
                        &ensp;
                        {data.bedrooms}
                      </p>
                    </div>

                    <div className="property_symbol3">
                      <span className="fa fa-male" />
                      <div>Sleeps</div>
                      <p>
                        &ensp;
                        {data.accommodates}
                      </p>
                    </div>

                    <div className="property_symbol4">
                      <span className="fa fa-bath" />
                      <div>Bathrooms</div>
                      <p>
                        &ensp;
                        {data.bathrooms}
                      </p>
                    </div>

                    <div className="property_symbol5">
                      <span>&#9790;</span>
                      <div>Min Stay</div>
                      <p>
                        &ensp;
                        {data.minimumstay}
                      </p>
                    </div>
                  </div>

                  <div className="property_description">
                    <h4>{data.headline}</h4>
                    <span>{data.description}</span>
                  </div>
                  <hr />
                  <br />
                  <h3 id="amenities">Amenities</h3>
                  <hr />
                  <div className="amenities">
                    <table>
                      <tbody>
                        <tr>
                          <td>Swimming pool</td>
                          <td>TV</td>
                          <td>Children Welcome</td>
                        </tr>
                        <tr>
                          <td>Internet</td>
                          <td>Satellite or Cable</td>
                          <td>Parking</td>
                        </tr>
                        <tr>
                          <td>Air Conditioning</td>
                          <td>Washer and Dryer</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <hr />
                  <h3>General</h3>
                  <div className="amenities">
                    <table>
                      <tbody>
                        <tr>
                          <td>Iron and Board</td>
                          <td>Internet</td>
                          <td>Ceiling Fans</td>
                        </tr>
                        <tr>
                          <td>Telephone</td>
                          <td>Towels Provided</td>
                          <td>Local Activities Guide</td>
                        </tr>
                        <tr>
                          <td>Linens Provided</td>
                          <td>Sunbed</td>
                          <td>Local Maps</td>
                        </tr>
                        <tr>
                          <td>Washing Machine</td>
                          <td>Air Conditioning</td>
                          <td>Local Restaurant Guide</td>
                        </tr>
                        <tr>
                          <td>Tumble Dryer</td>
                          <td>Activities Guide</td>
                          <td>Security System</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <hr />
                  <h3>Kitchen</h3>
                  <div className="amenities">
                    <table>
                      <tbody>
                        <tr>
                          <td>Cooking Utensils</td>
                          <td>4 Ring Stove</td>
                          <td>Toaster</td>
                        </tr>
                        <tr>
                          <td>Refrigerator</td>
                          <td>Kitchenette</td>
                          <td>Stove</td>
                        </tr>
                        <tr>
                          <td>Oven</td>
                          <td>Freezer</td>
                          <td>Dishes and Utensils</td>
                        </tr>
                        <tr>
                          <td>Microwave</td>
                          <td>Coffee Maker</td>
                          <td>4 range cooking range</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          ;
        </React.Fragment>
      );
    }
  }
}

viewDashboardProperty.propTypes = {
  // owner_dashboard: PropTypes.array.isRequired,
  searchPropertyByID: PropTypes.func.isRequired,
  getPhotoNamesByPropertyID: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  owner_dashboard: state.dashboard.owner_dashboard
});

export default connect(
  mapStateToProps,
  { searchPropertyByID, getPhotoNamesByPropertyID, downloadPhoto }
)(viewDashboardProperty);
