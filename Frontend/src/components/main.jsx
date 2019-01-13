import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./home";
import TripBoard from "./tripboard";
import NotFound from "./common/notFound";
//user
import TravelerLogin from "./user/travelerLogin";
import TravelerSignUp from "./user/travelerSignUp";
import OwnerLogin from "./user/ownerLogin";
import OwnerSignUp from "./user/ownerSignUp";
//dashboards
import OwnerDashboard from "./dashboards/ownerDashboard";
import TravelerDashboard from "./dashboards/travelerDashboard";
import viewDashboardProperty from "./dashboards/viewDashboardProperty";
import viewDashboardProfile from "./dashboards/viewDashboardProfile";
//userProfile
import Profile from "./userProfile/myprofile";
import ViewProfile from "./userProfile/viewProfile";
//searchProperty
import SearchResults from "./searchProperty/searchResults";
import PropertyView from "./searchProperty/propertyView";
//listProperty
import ListPropertyWelcome from "./listProperty/listPropertyWelcome";
import ListPropertyLocation from "./listProperty/listPropertyLocation";
import ListPropertyPhotos from "./listProperty/listPropertyPhotos";
import ListPropertyPricing from "./listProperty/listPropertyPricing";
import ListPropertySuccess from "./listProperty/listPropertySuccess";
import ListPropertyDetails from "./listProperty/listPropertyDetails";
//inbox
import Inbox from "./inbox/inbox";

import store from "../store";
import { Provider } from "react-redux";

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/tripboard" exact component={TripBoard} />
            <Route path="/travelerlogin" exact component={TravelerLogin} />
            <Route path="/travelersignup" exact component={TravelerSignUp} />
            <Route path="/ownerlogin" exact component={OwnerLogin} />
            <Route path="/ownersignup" exact component={OwnerSignUp} />
            <Route path="/inbox" exact component={Inbox} />
            <Route path="/listproperty" exact component={ListPropertyWelcome} />
            <Route
              path="/listpropertylocation"
              exact
              component={ListPropertyLocation}
            />
            <Route
              path="/listpropertydetails"
              exact
              component={ListPropertyDetails}
            />
            <Route
              path="/listpropertyphotos"
              exact
              component={ListPropertyPhotos}
            />
            <Route
              path="/listpropertypricing"
              exact
              component={ListPropertyPricing}
            />
            <Route
              path="/listpropertysuccess"
              exact
              component={ListPropertySuccess}
            />
            <Route path="/myprofile" exact component={Profile} />
            <Route path="/viewprofile" exact component={ViewProfile} />
            <Route path="/ownerdashboard" exact component={OwnerDashboard} />
            <Route
              path="/viewdashboardproperty"
              exact
              component={viewDashboardProperty}
            />
            <Route
              path="/travelerdashboard"
              exact
              component={TravelerDashboard}
            />
            <Route path="/propertyview" exact component={PropertyView} />
            <Route
              path="/viewdashboardprofile"
              exact
              component={viewDashboardProfile}
            />
            <Route path="/search" exact component={SearchResults} />
            <Route path="/not-found" exact component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default Main;
