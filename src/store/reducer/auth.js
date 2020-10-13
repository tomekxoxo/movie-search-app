import * as actionTypes from "../actions/actionTypes";
import update from "react-addons-update";

const initialState = {
  authenticated: false,
  userId: null,
  idToken: null,
  rateData: null,
  userWatchList: null,
  userRatedList: null,
  redirectPath: "/",
  loadWatchListMovies: [],
  loadWatchListSeries: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        authenticated: true,
        userId: action.userId,
        idToken: action.idToken,
        redirectPath: "/",
      };
    case actionTypes.RATE_SUCCESS:
      return {
        ...state,
        rateData: action.rateData,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        authenticated: false,
        userId: null,
        idToken: null,
        rateData: null,
      };
    case actionTypes.WATCHLIST_SUCCESS:
      return {
        ...state,
        rateData: action.rateData,
      };
    case actionTypes.FETCH_MOVIE_WATCH_LIST:
      return {
        ...state,
        userWatchList: action.userWatchList,
      };
    case actionTypes.FETCH_SERIES_WATCH_LIST:
      return {
        ...state,
        userWatchList: action.userWatchList,
      };
    case actionTypes.FETCH_MOVIE_RATED_LIST:
      return {
        ...state,
        userRatedList: action.userRatedList,
      };
    case actionTypes.FETCH_SERIES_RATED_LIST:
      return {
        ...state,
        userRatedList: action.userRatedList,
      };
    case actionTypes.FETCH_WATCH_LIST_MOVIES:
      return {
        ...state,
        loadWatchListMovies: [action.loadWatchListMovies],
      };
    case actionTypes.FETCH_WATCH_LIST_SERIES:
      return {
        ...state,
        loadWatchListSeries : [action.loadWatchListSeries]// chcę na tym zrobić concat lecz nie działa 
      }
    default:
      return state;
  }
};

export default reducer;
