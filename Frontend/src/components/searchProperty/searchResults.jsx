import React from "react";
import Navbar from "../common/navbar";
import {
  getTravelerToken,
  getOwnerToken,
  getJWTUsername
} from "../common/auth";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {
  getSearchResults,
  getSearchInput,
  saveSearchInput,
  filterSearchResults,
  resetFilterResults
} from "../../actions/searchPropertyActions";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { SearchUtils, renderDateTimePicker } from "../utils/searchUtils";
import { If, Else, Then } from "react-if";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import Slider from "react-rangeslider";
import {
  getAllPhotoNamesSearch,
  downloadPhoto
} from "../../actions/listPropertyActions";

class SearchResults extends SearchUtils {
  state = {
    currentPage: 1,
    pageSize: 10,
    minPrice: 0,
    maxPrice: 0,
    bedrooms: 0,
    imageView: []
  };

  componentDidMount() {
    this.props.getSearchInput();
    const username = getJWTUsername();
    this.props.getSearchResults(this.props.search_input, username);

    this.props.getAllPhotoNamesSearch(
      this.props.search_input,
      username,
      res => {
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
      }
    );
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleMinPriceSliderChange = value => {
    this.setState({
      minPrice: value
    });
  };

  handleMaxPriceSliderChange = value => {
    this.setState({
      maxPrice: value
    });
  };

  handleBedroomsSliderChange = value => {
    this.setState({
      bedrooms: value
    });
  };

  resetFilter() {
    this.props.resetFilterResults();
  }

  handleFilter(values) {
    const { minPrice, maxPrice, bedrooms } = this.state;
    const { search_input } = this.props;

    if (minPrice > maxPrice) {
      window.alert("Minimum Price cannot be more than Maximum Price.");
    }

    if (maxPrice === 0) {
      values.maxPrice = 100000;
    } else {
      values.maxPrice = maxPrice;
    }

    values.minPrice = minPrice;
    values.bedrooms = bedrooms;

    if (!values.arrivedate_filter) {
      values.arrivedate_filter = search_input.arrivedate;
    }

    if (!values.departdate_filter) {
      values.departdate_filter = search_input.departdate;
    }

    if (!values.location_filter) {
      values.location_filter = search_input.location;
    }

    this.setState({ currentPage: 1 }, function() {
      this.props.filterSearchResults(values);
    });
  }

  render() {
    let redirectVar = null;
    if (!getTravelerToken() && !getOwnerToken()) {
      redirectVar = <Redirect to="/home" />;
    }

    const { results, filter_results, handleSubmit } = this.props;

    const paginatedData = paginate(
      filter_results.length === 0 ? results : filter_results,
      this.state.currentPage,
      this.state.pageSize
    );

    const paginatedDataImages = paginate(
      this.state.imageView,
      this.state.currentPage,
      this.state.pageSize
    );

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

        <div className="filters">
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={handleSubmit(this.handleFilter.bind(this))}
          >
            <div className="minPrice">
              <input
                type="text"
                className="slider_input"
                disabled
                value={
                  this.state.minPrice === 0
                    ? "Minimum Price"
                    : this.state.minPrice
                }
              />
              <Slider
                min={0}
                max={100000}
                step={0.5}
                value={this.state.minPrice}
                onChange={this.handleMinPriceSliderChange}
              />
            </div>
            <div className="maxPrice">
              <input
                type="text"
                className="slider_input"
                disabled
                value={
                  this.state.maxPrice === 0
                    ? "Maximum Price"
                    : this.state.maxPrice
                }
              />
              <Slider
                min={0}
                max={100000}
                step={0.5}
                value={this.state.maxPrice}
                onChange={this.handleMaxPriceSliderChange}
              />
            </div>
            <div className="bedrooms">
              <input
                type="text"
                className="slider_input"
                disabled
                value={
                  this.state.bedrooms === 0 ? "Bedrooms" : this.state.bedrooms
                }
              />
              <Slider
                min={0}
                max={100}
                value={this.state.bedrooms}
                onChange={this.handleBedroomsSliderChange}
              />
            </div>
            <button className="btn btn-primary filter_searchpage" type="submit">
              Filter
            </button>
          </form>
        </div>
        <div className="filters2">
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={handleSubmit(this.resetFilter.bind(this))}
          >
            <div className="filter_location">
              <Field
                name="location_filter"
                component={this.renderField}
                autoFocus
                label="Location"
              />
            </div>
            <div className="filter_date">
              <Field
                name="arrivedate_filter"
                showTime={false}
                component={renderDateTimePicker}
                label="Arrive"
              />
            </div>
            <div className="filter_date">
              <Field
                name="departdate_filter"
                showTime={false}
                component={renderDateTimePicker}
                label="Depart"
              />
            </div>
            <button className="btn btn-primary reset_filters" type="submit">
              Reset All Filters
            </button>
          </form>
        </div>
        <If condition={results === "Error" || results.length === 0}>
          <Then>
            <div className="search_main_container">
              <p className="notfound">No property found.</p>
            </div>
          </Then>

          <Else>
            <div className="search_main_container">
              {paginatedData.map((result, index1) => (
                <div className="search_container" key={result._id}>
                  <div className="property_container">
                    {paginatedDataImages.map((image, index2) => (
                      <If condition={index1 === index2} key={index2}>
                        <img
                          src={image}
                          width="240"
                          height="240"
                          alt="Nothing has been uploaded yet"
                        />
                      </If>
                    ))}
                    <div className="search_details">
                      <Link
                        className="building"
                        to={{
                          pathname: "/propertyview",
                          state: { propertyID: result._id }
                        }}
                      >
                        {result.headline}
                      </Link>

                      <div className="property_type">
                        {result.type} &nbsp;
                        <span className="bullet">&#9679;</span> &nbsp;{" "}
                        {result.bedrooms}
                        BR &nbsp;
                        <span className="bullet">&#9679;</span> &nbsp;{" "}
                        {result.bathrooms}
                        BA &nbsp;
                        <span className="bullet">&#9679;</span> &nbsp; Sleeps{" "}
                        {result.accommodates}
                      </div>

                      <div className="gray_area">
                        <span className="price">
                          {result.currency} {result.nightlyrate}
                        </span>{" "}
                        per night
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Pagination
                itemsCount={
                  filter_results.length === 0
                    ? results.length
                    : filter_results.length
                }
                pageSize={this.state.pageSize}
                onPageChange={this.handlePageChange}
                currentPage={this.state.currentPage}
              />
            </div>
            <div className="map">
              <img
                src={require("../../images/map.png")}
                width="850"
                height="1150"
                alt="User has not uploaded anything yet"
                className="map_image"
              />
            </div>
          </Else>
        </If>
      </React.Fragment>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values.location && values.location.length > 30) {
    errors.location = "Location cannot be more than 15 characters long";
  } else if (!/^[a-zA-Z0-9\s]*$/.test(values.location)) {
    errors.location = "Incorrect Location format";
  } else if (values.arrivedate < new Date()) {
    errors.location = "Arrive Date cannot be less than today's date";
  } else if (values.arrivedate > values.departdate) {
    errors.location = "Depart Date cannot be less than Arrive";
  }

  if (values.guests >= 100 || values.guests <= 0) {
    errors.guests = "Guests should be between 1 and 100";
  }

  return errors;
}

SearchResults.propTypes = {
  // results: PropTypes.object.isRequired,
  search_input: PropTypes.object.isRequired,
  getSearchResults: PropTypes.func.isRequired,
  getSearchInput: PropTypes.func.isRequired,
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  filterSearchResults: PropTypes.func.isRequired,
  getAllPhotoNamesSearch: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  results: state.search.search_results,
  search_input: state.search.search_input,
  filter_results: state.search.filtered_search_results
});

export default reduxForm({
  validate,
  form: "searchProperty"
})(
  connect(
    mapStateToProps,
    {
      getSearchResults,
      getSearchInput,
      saveSearchInput,
      filterSearchResults,
      getAllPhotoNamesSearch,
      downloadPhoto,
      resetFilterResults
    }
  )(SearchResults)
);
