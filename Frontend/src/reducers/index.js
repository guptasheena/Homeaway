import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import travelerLoginReducer from "./travelerLoginReducer";
import userNameReducer from "./usernameReducer";
import profileReducer from "./profileReducer";
import searchPropertyReducer from "./searchPropertyReducer";
import dashboardReducer from "./DashboardReducer";
import listPropertyReducer from "./listPropertyReducer";
import inboxReducer from "./inboxReducer";

export default combineReducers({
  travelerLogin: travelerLoginReducer,
  username: userNameReducer,
  form: formReducer,
  userProfile: profileReducer,
  search: searchPropertyReducer,
  dashboard: dashboardReducer,
  listProperty: listPropertyReducer,
  inbox: inboxReducer
});
