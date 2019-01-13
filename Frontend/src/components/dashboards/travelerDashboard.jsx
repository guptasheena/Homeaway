import React from "react";
import Navbar from "../common/navbar";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {
  getTravelerDashboard,
  getSearchResultsByNameTraveler,
  filterTravelerByDate
} from "../../actions/DashboardActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { SearchUtils, renderDateTimePicker } from "../utils/searchUtils";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import {
  getAllPhotoNamesTraveler,
  downloadPhoto
} from "../../actions/listPropertyActions";
import { If } from "react-if";
import {
  getTravelerToken,
  getOwnerToken,
  getJWTUsername
} from "../common/auth";

class TravelerDashboard extends SearchUtils {
  state = {
    currentPage: 1,
    pageSize: 5,
    imageView: []
  };

  componentDidMount() {
    const username = getJWTUsername();
    this.props.getTravelerDashboard(username);
    this.props.getAllPhotoNamesTraveler(username, res => {
      const fileName = res.data;

      const fileNames = [];
      var length = fileName ? fileName.length : "";
      for (var index = 0; index < length; index++) {
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
  }

  onSubmit(values) {
    const username = getJWTUsername();
    this.setState({ currentPage: 1 }, function() {
      this.props.getSearchResultsByNameTraveler(values.property_name, username);
    });
  }

  handleFilter(values) {
    this.props.filterTravelerByDate(values);
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { traveler_dashboard } = this.props;
    const { handleSubmit } = this.props;

    let redirectVar = null;
    if (!getTravelerToken() && !getOwnerToken()) {
      redirectVar = <Redirect to="/home" />;
    }

    const paginatedData = paginate(
      traveler_dashboard ? traveler_dashboard : "",
      this.state.currentPage,
      this.state.pageSize
    );

    const paginatedDataImages = paginate(
      this.state.imageView,
      this.state.currentPage,
      this.state.pageSize
    );

    if (traveler_dashboard === "Could not fetch property details.") {
      return (
        <React.Fragment>
          {redirectVar}
          <Navbar />
          <p className="notfound">You don't have any previous trips.</p>
        </React.Fragment>
      );
    } else if (
      traveler_dashboard === "No records found." ||
      !traveler_dashboard ||
      traveler_dashboard == ""
    ) {
      return (
        <React.Fragment>
          {redirectVar}
          <Navbar />
          <p className="notfound">No records found.</p>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {redirectVar}
          <Navbar />

          <div className="dashboard_search_navbar">
            <nav className="navbar navbar-expand-lg navbar-light ">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <form
                  className="form-inline my-2 my-lg-0"
                  onSubmit={handleSubmit(this.onSubmit.bind(this))}
                >
                  <div className="searchbar_dashboard">
                    <Field
                      name="property_name"
                      component={this.renderField}
                      autoFocus
                      label="Property Name"
                    />
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </nav>
          </div>

          <div className="dashboard_filter_navbar">
            <form
              className="form-inline my-2 my-lg-0"
              onSubmit={handleSubmit(this.handleFilter.bind(this))}
            >
              <div className="filter_date_dashboard">
                <Field
                  name="arrivedate"
                  showTime={false}
                  component={renderDateTimePicker}
                  label="Arrive"
                />
              </div>
              <div className="filter_date_dashboard">
                <Field
                  name="departdate"
                  showTime={false}
                  component={renderDateTimePicker}
                  label="Depart"
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Filter
              </button>
            </form>
          </div>

          <div className="listing_main">
            <hr />
            {paginatedData.map((data, index1) => (
              <div key={data._id}>
                <div className="per_listing">
                  {" "}
                  {paginatedDataImages.map((image, index2) => (
                    <If condition={index1 === index2} key={index2}>
                      <img
                        src={image}
                        width="270"
                        height="160"
                        alt="User has not uploaded anything yet"
                      />
                    </If>
                  ))}
                  <div className="property_owner_dashboard">
                    <Link
                      to={{
                        pathname: "/viewdashboardproperty",
                        state: {
                          propertyID: data._id
                        }
                      }}
                    >
                      <h4>{data.headline ? data.headline : "No Name"}</h4>
                    </Link>
                    <br />
                    <div>
                      {data.city}, {data.state}, {data.zipcode}, {data.country}
                    </div>
                    HomeAway.com {data.propertyID}
                    <br />
                    <span className="fa fa-star " />
                    <span className="fa fa-star " />
                    <span className="fa fa-star " />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                    <br />
                    <br />
                    Property owned by:{" "}
                    <Link
                      to={{
                        pathname: "/viewdashboardprofile",
                        state: {
                          username: data.username
                        }
                      }}
                    >
                      {data.username}
                    </Link>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="general_pagination">
            <Pagination
              itemsCount={traveler_dashboard ? traveler_dashboard.length : ""}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

TravelerDashboard.propTypes = {
  getTravelerDashboard: PropTypes.func.isRequired,
  getSearchResultsByNameTraveler: PropTypes.func.isRequired,
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  filterTravelerByDate: PropTypes.func.isRequired,
  getAllPhotoNamesTraveler: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  traveler_dashboard: state.dashboard.traveler_dashboard
});

export default reduxForm({
  form: "TravelerDashboardSearch"
})(
  connect(
    mapStateToProps,
    {
      getTravelerDashboard,
      getSearchResultsByNameTraveler,
      filterTravelerByDate,
      getAllPhotoNamesTraveler,
      downloadPhoto
    }
  )(TravelerDashboard)
);
