import * as actionTypes from "../actions/actionTypes";
import update from "react-addons-update";

const initialState = {
  authenticated: false,
  error: null,
  userId: null,
  idToken: null,
  rateData: null,
  userWatchList: null,
  userRatedList: null,
  redirectPath: "/",
  loadWatchListMovies: [],
  loadWatchListSeries: [],
  loadRatedMovies: [],
  loadRatedSeries: [],
  loadingRated: true,
  loadingWatchList: true,
  reloadAfterItemDelete: false,
  movieFilter: "popularity.desc",
  serieFilter: "popularity.desc",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        authenticated: true,
        error: null,
        userId: action.userId,
        idToken: action.idToken,
        redirectPath: "/",
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
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
        loadWatchListMovies: [
          ...state.loadWatchListMovies,
          action.loadWatchListMovies,
        ],
      };
    case actionTypes.FETCH_WATCH_LIST_SERIES:
      return {
        ...state,
        loadWatchListSeries: [
          ...state.loadWatchListSeries,
          action.loadWatchListSeries,
        ],
      };
    case actionTypes.FETCH_RATED_MOVIES:
      return {
        ...state,
        loadRatedMovies: [...state.loadRatedMovies, action.loadRatedMovies],
      };
    case actionTypes.FETCH_RATED_SERIES:
      return {
        ...state,
        loadRatedSeries: [...state.loadRatedSeries, action.loadRatedSeries],
      };
    case actionTypes.RELOAD_ACCOUNT_DATA:
      return {
        ...state,
        userWatchList: null,
        userRatedList: null,
        redirectPath: "/",
        loadWatchListMovies: [],
        loadWatchListSeries: [],
        loadRatedMovies: [],
        loadRatedSeries: [],
        loadingRated: true,
        loadingWatchList: true,
        reloadAfterItemDelete: false,
        movieFilter: state.movieFilter,
        serieFilter: state.serieFilter,
      };
    case actionTypes.LOADING_RATED:
      return {
        ...state,
        loadingRated: false,
      };
    case actionTypes.LOADING_WATCH_LIST:
      return {
        ...state,
        loadingWatchList: false,
      };
    case actionTypes.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        reloadAfterItemDelete: true,
      };
    case actionTypes.DELETE_ITEM_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.CLEAR_ERROR_STATE:
      return {
        ...state,
        error: null,
      };

    case actionTypes.CHANGE_MOVIE_FILTER:
      return {
        ...state,
        movieFilter: action.filter,
      };
    case actionTypes.CHANGE_SERIE_FILTER:
      return {
        ...state,
        serieFilter: action.filter,
      };
    default:
      return state;
  }
};

export default reducer;
