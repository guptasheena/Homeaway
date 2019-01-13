import {
  SAVE_SEARCH_INPUT,
  GET_SEARCH_RESULTS,
  GET_SEARCH_INPUT,
  BOOK_PROPERTY,
  GET_SEARCH_RESULTS_BY_ID,
  RESET_BOOKING_STATUS,
  FILTER_SEARCH_RESULTS,
  RESET_FILTER_RESULTS
} from "../actions/types";

const initialState = {
  search_input: {},
  search_results: [],
  booking_status: "",
  filtered_search_results: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_SEARCH_INPUT:
      return {
        ...state,
        search_input: action.payload
      };

    case RESET_FILTER_RESULTS:
      return {
        ...state,
        filtered_search_results: ""
      };

    case FILTER_SEARCH_RESULTS:
      if (state.search_results && state.search_results.length !== 0) {
        var a_date = new Date(action.payload.arrivedate_filter),
          mnth = ("0" + (a_date.getMonth() + 1)).slice(-2),
          day = ("0" + a_date.getDate()).slice(-2);
        var arriveDate = [a_date.getFullYear(), mnth, day].join("-");

        var d_date = new Date(action.payload.departdate_filter),
          mnth = ("0" + (d_date.getMonth() + 1)).slice(-2),
          day = ("0" + d_date.getDate()).slice(-2);
        var departDate = [d_date.getFullYear(), mnth, day].join("-");

        var result = [];
        var result_index = 0;

        for (var index = 0; index < state.search_results.length; index++) {
          if (
            state.search_results[index].nightlyrate >=
              action.payload.minPrice &&
            state.search_results[index].nightlyrate <=
              action.payload.maxPrice &&
            state.search_results[index].bedrooms >= action.payload.bedrooms &&
            state.search_results[index].country.toUpperCase() ===
              action.payload.location_filter.toUpperCase() &&
            state.search_results[index].startdate <= arriveDate &&
            state.search_results[index].enddate >= departDate
          ) {
            result[result_index] = state.search_results[index];
            result_index += 1;
          }
        }

        return {
          ...state,
          filtered_search_results: result
        };
      }

    case GET_SEARCH_INPUT:
      return {
        ...state
      };

    case RESET_BOOKING_STATUS:
      return {
        ...state,
        booking_status: null
      };

    case GET_SEARCH_RESULTS:
      return {
        ...state,
        search_results: action.payload
      };

    case GET_SEARCH_RESULTS_BY_ID:
      return {
        ...state,
        search_results: action.payload
      };

    case BOOK_PROPERTY:
      return {
        ...state,
        booking_status: action.payload
      };

    default:
      return state;
  }
}
