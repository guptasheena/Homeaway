import React from "react";
import Navbar from "../common/navbar";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {
  checkIsOwner,
  getOwnerDashboard,
  getSearchResultsByNameOwner,
  filterOwnerByDate
} from "../../actions/DashboardActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { SearchUtils, renderDateTimePicker } from "../utils/searchUtils";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import {
  getAllPhotoNamesOwner,
  downloadPhoto
} from "../../actions/listPropertyActions";
import { If } from "react-if";
import {
  getTravelerToken,
  getOwnerToken,
  getJWTUsername
} from "../common/auth";

class OwnerDashboard extends SearchUtils {
  state = {
    currentPage: 1,
    pageSize: 5,
    imageView: []
  };

  componentDidMount() {
    const username = getJWTUsername();
    this.props.checkIsOwner(username);
    this.props.getOwnerDashboard(username);
    this.props.getAllPhotoNamesOwner(username, res => {
      const fileName = res.data;
      const fileNames = [];
      const len = fileName ? fileName.length : 0;

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
  }

  onSubmit(values) {
    const username = getJWTUsername();
    this.setState({ currentPage: 1 }, function() {
      this.props.getSearchResultsByNameOwner(values.property_name, username);
    });
  }

  handleFilter(values) {
    this.props.filterOwnerByDate(values);
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    let redirectVar = null;
    if (!getTravelerToken() && !getOwnerToken()) {
      redirectVar = <Redirect to="/home" />;
    }

    const { isOwner } = this.props;
    const { owner_dashboard } = this.props;
    const { handleSubmit } = this.props;

    const paginatedData = paginate(
      owner_dashboard ? owner_dashboard : "",
      this.state.currentPage,
      this.state.pageSize
    );

    const paginatedDataImages = paginate(
      this.state.imageView,
      this.state.currentPage,
      this.state.pageSize
    );

    if (isOwner.length === 0 || isOwner === "No Owner found") {
      return (
        <React.Fragment>
          {redirectVar}
          <Navbar />
          <p className="notfound">
            Please register as Owner to continue to Owner Dashboard
          </p>
        </React.Fragment>
      );
    } else if (owner_dashboard === "Could not fetch property details.") {
      return (
        <React.Fragment>
          {redirectVar}
          <Navbar />
          <p className="notfound">You don't have any property bookings.</p>
        </React.Fragment>
      );
    } else if (
      owner_dashboard === "No records found." ||
      !owner_dashboard ||
      owner_dashboard == ""
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
                    HomeAway.com {data._id}
                    <br />
                    <span className="fa fa-star " />
                    <span className="fa fa-star " />
                    <span className="fa fa-star " />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                    <br />
                    <br />
                    Property booked by:{" "}
                    <Link
                      to={{
                        pathname: "/viewdashboardprofile",
                        state: {
                          username: data.bookedby
                        }
                      }}
                    >
                      {data.bookedby}
                    </Link>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="general_pagination">
            <Pagination
              itemsCount={owner_dashboard ? owner_dashboard.length : ""}
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

function validate(values) {
  const errors = {};

  if (values.arrivedate < new Date()) {
    window.alert("Arrive Date cannot be less than today's date");
  } else if (values.arrivedate > values.departdate) {
    window.alert("Depart Date cannot be less than Arrive Date");
  }

  return errors;
}

OwnerDashboard.propTypes = {
  getOwnerDashboard: PropTypes.func.isRequired,
  checkIsOwner: PropTypes.func.isRequired,
  getSearchResultsByNameOwner: PropTypes.func.isRequired,
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  filterOwnerByDate: PropTypes.func.isRequired,
  getAllPhotoNamesOwner: PropTypes.func.isRequired,
  downloadPhoto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  owner_dashboard: state.dashboard.owner_dashboard,
  isOwner: state.dashboard.isOwner
});

export default reduxForm({
  validate,
  form: "OwnerDashboardSearch"
})(
  connect(
    mapStateToProps,
    {
      checkIsOwner,
      getOwnerDashboard,
      getSearchResultsByNameOwner,
      filterOwnerByDate,
      getAllPhotoNamesOwner,
      downloadPhoto
    }
  )(OwnerDashboard)
);
