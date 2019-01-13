import React from "react";
import Navbar from "../common/navbar";
import {
  getTravelerToken,
  getOwnerToken,
  getJWTUsername
} from "../common/auth";
import { Redirect } from "react-router";
import {
  bookProperty,
  saveSearchInput,
  getSearchResultsByID,
  getSearchResults,
  getSearchInput,
  resetBookingStatus
} from "../../actions/searchPropertyActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import {
  SearchUtils,
  validate,
  renderDateTimePicker
} from "../utils/searchUtils";
import { If, Else } from "react-if";
import {
  getPhotoNamesByPropertyID,
  downloadPhoto,
  getAllPhotoNamesSearch
} from "../../actions/listPropertyActions";
import { sendQuestion } from "../../actions/inboxActions";

class PropertyView extends SearchUtils {
  state = {
    imageView: [],
    photos: [],
    currentPhoto: ""
  };

  componentDidMount() {
    this.props.getSearchResultsByID(
      this.props.location.state ? this.props.location.state.propertyID : ""
    );

    this.props.getPhotoNamesByPropertyID(
      this.props.location.state ? this.props.location.state.propertyID : "",
      res => {
        this.setState({ photos: res.data.photos.split(",") });
        this.setState({ currentPhoto: res.data.photos.split(",")[0] });
        this.getBasePhoto(res.data.photos.split(",")[0]);
      }
    );
  }

  messageOwner = () => {
    var message = prompt("Please enter your message");

    var data = {
      message: message,
      propertyID: this.props.results[0]._id,
      askedTo: this.props.results[0].username,
      askedBy: getJWTUsername()
    };

    this.props.sendQuestion(data);
    window.alert("Message sent successfully!");
  };

  getBasePhoto = fileName => {
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
    this.getBasePhoto(this.state.photos[index]);
  };

  displayRightImage = () => {
    let index = this.state.photos.indexOf(this.state.currentPhoto);
    if (index === 0) index = this.state.photos.length - 1;
    else index--;
    this.setState({ currentPhoto: this.state.photos[index] });
    this.getBasePhoto(this.state.photos[index]);
  };

  onSubmitBookProperty = () => {
    const username = getJWTUsername();
    this.props.bookProperty(this.props.results[0]._id, username);
  };

  render() {
    let redirectVar = null;
    if (!getTravelerToken() && !getOwnerToken()) {
      redirectVar = <Redirect to="/home" />;
    }
    const { results } = this.props;
    const { search_input } = this.props;
    const { handleSubmit } = this.props;

    var arriveDate = this.formatDate(search_input.arrivedate);
    var departDate = this.formatDate(search_input.departdate);

    if (this.props.booking_status.nModified === 1) {
      window.alert("Property booked successfully!");
      this.props.resetBookingStatus();
      window.location.reload();
    }

    return (
      <React.Fragment>
        {redirectVar}
        <Navbar />
        <br />
        <div className="search_navbar">
          <nav className="navbar navbar-expand-lg navbar-light ">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <form
                className="form-inline my-2 my-lg-0"
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
              >
                <div className="searchbar_location">
                  <Field
                    name="location"
                    component={this.renderField}
                    autoFocus
                    label="Where do you want to go?"
                  />
                </div>
                <div className="searchbar_date">
                  <Field
                    name="arrivedate"
                    showTime={false}
                    component={renderDateTimePicker}
                    label="Arrive"
                  />
                </div>
                <div className="searchbar_date">
                  <Field
                    name="departdate"
                    showTime={false}
                    component={renderDateTimePicker}
                    label="Depart"
                  />
                </div>
                <div className="searchbar_location">
                  <Field
                    name="guests"
                    component={this.renderField}
                    label="Guests"
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </form>
            </div>
          </nav>
        </div>

        <If condition={results == ""}>
          <p className="notfound">No property found.</p>
        </If>
        <Else>
          {results &&
            results.map(result => (
              <div className="property_view_container" key={result._id}>
                <hr />

                <div className="fixed_slider">
                  <span className="price1">
                    {result.currency} {""}
                    {result.nightlyrate}
                  </span>{" "}
                  per night
                  <div className="ratings_search">
                    <span className="fa fa-star star " />
                    <span className="fa fa-star star" />
                    <span className="fa fa-star star" />
                    <span className="fa fa-star star" />
                    <span className="fa fa-star" /> &nbsp; 4 Reviews
                  </div>
                  <br />
                  <br />
                  &#9989;Your dates are{" "}
                  <span className="available">Available!</span>
                  <table border="1" className="booking_table">
                    <tbody>
                      <tr>
                        <td>
                          Check In <br />
                          <span className="data">{arriveDate}</span>
                        </td>
                        <td>
                          Check Out <br />
                          <span className="data">{departDate}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          Guests <br />
                          <span className="data">
                            {search_input.guests} guests
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <table>
                    <tbody>
                      <tr>
                        <td>Total</td>
                        <td className="align_right">
                          {result.currency} {result.nightlyrate}
                        </td>
                      </tr>
                      <tr>
                        <td>Includes taxes and fees</td>
                        <td className="align_right">
                          <a href="#overview">View details</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onSubmitBookProperty}
                  >
                    Request to Book
                  </button>
                  <hr />
                  <br />
                  For booking assistance, call{" "}
                  <span className="bold">888-640-7927 </span>
                  <br />
                  <div className="align_center">
                    <span className="bold">Property #</span> {result._id}
                  </div>
                  <br />
                  <hr />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.messageOwner}
                  >
                    Message Owner
                  </button>
                </div>
                <div className="image_body">
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
                    <div>{result.headline}</div>
                    <span className="fa">
                      {" "}
                      &#xf041; {result.city}, {result.state}, {result.country}
                    </span>
                  </div>

                  <div className="property_symbols">
                    <div className="property_symbol1">
                      <span className="fa fa-home" />
                      <div>{result.type}</div>
                      <p>1022 sq. ft.</p>
                    </div>

                    <div className="property_symbol2">
                      <span className="fa fa-bed" />
                      <div>Bedrooms</div>
                      <p>
                        &ensp;
                        {result.bedrooms}
                      </p>
                    </div>

                    <div className="property_symbol3">
                      <span className="fa fa-male" />
                      <div>Sleeps</div>
                      <p>
                        &ensp;
                        {result.accommodates}
                      </p>
                    </div>

                    <div className="property_symbol4">
                      <span className="fa fa-bath" />
                      <div>Bathrooms</div>
                      <p>
                        &ensp;
                        {result.bathrooms}
                      </p>
                    </div>

                    <div className="property_symbol5">
                      <span>&#9790;</span>
                      <div>Min Stay</div>
                      <p>
                        &ensp;
                        {result.minimumstay}
                      </p>
                    </div>
                  </div>

                  <div className="property_description">
                    <h4>{result.headline}</h4>
                    <span>{result.description}</span>
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
        </Else>
      </React.Fragment>
    );
  }
}

PropertyView.propTypes = {
  // results: PropTypes.array.isRequired,
  search_input: PropTypes.object.isRequired,
  booking_status: PropTypes.string.isRequired,
  getSearchResultsByID: PropTypes.func.isRequired,
  getPhotoNamesByPropertyID: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired,
  sendQuestion: PropTypes.func.isRequired,
  sendQugetAllPhotoNamesSearchestion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  results: state.search.search_results,
  search_input: state.search.search_input,
  booking_status: state.search.booking_status
});

export default reduxForm({
  validate,
  form: "propertyView"
})(
  connect(
    mapStateToProps,
    {
      bookProperty,
      saveSearchInput,
      getSearchResultsByID,
      getSearchResults,
      getSearchInput,
      resetBookingStatus,
      getPhotoNamesByPropertyID,
      downloadPhoto,
      sendQuestion,
      getAllPhotoNamesSearch
    }
  )(PropertyView)
);
