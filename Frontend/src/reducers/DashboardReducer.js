import {
  CHECK_IS_OWNER,
  GET_OWNER_DASHBOARD,
  GET_OWNER_DASHBOARD_BY_ID,
  GET_TRAVELER_DASHBOARD,
  GET_SEARCH_RESULTS_BY_NAME_TRAVELER,
  GET_SEARCH_RESULTS_BY_NAME_OWNER,
  FILTER_DATE_TRAVELER_DASHBOARD,
  FILTER_DATE_OWNER_DASHBOARD
} from "../actions/types";

const initialState = {
  owner_dashboard: [],
  isOwner: "",
  traveler_dashboard: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECK_IS_OWNER:
      return {
        ...state,
        isOwner: action.payload
      };
    case GET_OWNER_DASHBOARD:
      return {
        ...state,
        owner_dashboard: action.payload
      };
    case GET_OWNER_DASHBOARD_BY_ID:
      return {
        ...state,
        owner_dashboard: action.payload
      };
    case GET_TRAVELER_DASHBOARD:
      return {
        ...state,
        traveler_dashboard: action.payload
      };

    case GET_SEARCH_RESULTS_BY_NAME_OWNER:
      return {
        ...state,
        owner_dashboard: action.payload
      };

    case GET_SEARCH_RESULTS_BY_NAME_TRAVELER:
      return {
        ...state,
        traveler_dashboard: action.payload
      };

    case FILTER_DATE_TRAVELER_DASHBOARD:
      if (state.traveler_dashboard && state.traveler_dashboard.length !== 0) {
        var a_date = new Date(action.payload.arrivedate),
          month = ("0" + (a_date.getMonth() + 1)).slice(-2),
          day = ("0" + a_date.getDate()).slice(-2);
        var arriveDate = [a_date.getFullYear(), month, day].join("-");

        var d_date = new Date(action.payload.departdate),
          month = ("0" + (d_date.getMonth() + 1)).slice(-2),
          day = ("0" + d_date.getDate()).slice(-2);
        var departDate = [d_date.getFullYear(), month, day].join("-");
        var result = [];
        var result_index = 0;

        for (var index = 0; index < state.traveler_dashboard.length; index++) {
          var arrive_flag = false;
          var depart_flag = false;

          if (
            action.payload.arrivedate &&
            state.traveler_dashboard[index].startdate <= arriveDate
          ) {
            arrive_flag = true;
          } else if (!action.payload.arrivedate) {
            arrive_flag = true;
          }

          if (
            action.payload.departdate &&
            state.traveler_dashboard[index].enddate >= departDate
          ) {
            depart_flag = true;
          } else if (!action.payload.departdate) {
            depart_flag = true;
          }

          if (arrive_flag == true && depart_flag == true) {
            result[result_index] = state.traveler_dashboard[index];
            result_index += 1;
          }
        }
      }

      return {
        ...state,
        traveler_dashboard: result
      };

    case FILTER_DATE_OWNER_DASHBOARD:
      if (state.owner_dashboard && state.owner_dashboard.length !== 0) {
        var a_date = new Date(action.payload.arrivedate),
          month = ("0" + (a_date.getMonth() + 1)).slice(-2),
          day = ("0" + a_date.getDate()).slice(-2);
        var arriveDate = [a_date.getFullYear(), month, day].join("-");

        var d_date = new Date(action.payload.departdate),
          month = ("0" + (d_date.getMonth() + 1)).slice(-2),
          day = ("0" + d_date.getDate()).slice(-2);
        var departDate = [d_date.getFullYear(), month, day].join("-");

        var result = [];
        var result_index = 0;

        for (var index = 0; index < state.owner_dashboard.length; index++) {
          var arrive_flag = false;
          var depart_flag = false;

          if (
            action.payload.arrivedate &&
            state.owner_dashboard[index].startdate <= arriveDate
          ) {
            arrive_flag = true;
          } else if (!action.payload.arrivedate) {
            arrive_flag = true;
          }

          if (
            action.payload.departdate &&
            state.owner_dashboard[index].enddate >= departDate
          ) {
            depart_flag = true;
          } else if (!action.payload.departdate) {
            depart_flag = true;
          }

          if (arrive_flag == true && depart_flag == true) {
            result[result_index] = state.owner_dashboard[index];
            result_index += 1;
          }
        }
      }

      return {
        ...state,
        owner_dashboard: result
      };

    default:
      return state;
  }
}
