import * as actionTypes from "./actionTypes";
import { API_KEY, IMG_PATH } from "../../App";

export const auth = (email, password, isSignupMode) => {
  return (dispatch) => {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJi2I_H_558BuqNZizn8Bf_B9R5yLci-A`;

    if (!isSignupMode) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJi2I_H_558BuqNZizn8Bf_B9R5yLci-A`;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        dispatch({
          type: actionTypes.AUTH_SUCCESS,
          idToken: data.idToken,
          userId: data.localId,
        });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.AUTH_FAIL, error: error.message });
      });
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const rateMovie = (movieId, isMovie, score, userId, token) => {
  return (dispatch) => {
    const data = {
      userId: userId,
      movieId: movieId,
      score: score,
    };

    let url = `https://movie-search-3d6f7.firebaseio.com/movies.json?auth=${token}`;

    if (!isMovie) {
      url = `https://movie-search-3d6f7.firebaseio.com/series.json?auth=${token}`;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: actionTypes.RATE_SUCCESS,
          rateData: data,
        })
      );
  };
};

export const addToWatchList = (movieId, isMovie, userId, token) => {
  return (dispatch) => {
    const data = {
      userId: userId,
      movieId: movieId,
    };

    let url = `https://movie-search-3d6f7.firebaseio.com/movies/watchlist.json?auth=${token}`;

    if (!isMovie) {
      url = `https://movie-search-3d6f7.firebaseio.com/series/watchlist.json?auth=${token}`;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: actionTypes.WATCHLIST_SUCCESS,
          rateData: data,
        })
      );
  };
};

export const downloadFirebaseMovieWatchList = (userId) => {
  return (dispatch) => {
    let url = `https://movie-search-3d6f7.firebaseio.com/movies/watchlist.json?orderBy="userId"&equalTo="${userId}"`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let fetchedData = [];
        for (let key in data) {
          fetchedData.push({
            hash: key,
            isMovie: true,
            movieId: Number(data[key]["movieId"]),
          });
        }
        dispatch({
          type: actionTypes.FETCH_MOVIE_WATCH_LIST,
          userWatchList: fetchedData,
        });
      });
  };
};

export const downloadFirebaseSeriesWatchList = (userId) => {
  return (dispatch) => {
    let url = `https://movie-search-3d6f7.firebaseio.com/series/watchlist.json?orderBy="userId"&equalTo="${userId}"`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let fetchedData = [];
        for (let key in data) {
          fetchedData.push({
            hash: key,
            isMovie: false,
            movieId: Number(data[key]["movieId"]),
          });
        }
        dispatch({
          type: actionTypes.FETCH_SERIES_WATCH_LIST,
          userWatchList: fetchedData,
        });
      });
  };
};

export const downloadFirebaseRatedMovies = (userId) => {
  return (dispatch) => {
    let url = `https://movie-search-3d6f7.firebaseio.com/movies.json?orderBy="userId"&equalTo="${userId}"`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let fetchedData = [];
        for (let key in data) {
          fetchedData.push({
            hash: key,
            isMovie: true,
            movieId: Number(data[key]["movieId"]),
            score: Number(data[key]["score"]),
          });
        }
        dispatch({
          type: actionTypes.FETCH_MOVIE_RATED_LIST,
          userRatedList: fetchedData,
        });
      });
  };
};

export const downloadFirebaseRatedSeries = (userId) => {
  return (dispatch) => {
    let url = `https://movie-search-3d6f7.firebaseio.com/series.json?orderBy="userId"&equalTo="${userId}"`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let fetchedData = [];
        for (let key in data) {
          fetchedData.push({
            hash: key,
            isMovie: false,
            movieId: Number(data[key]["movieId"]),
            score: Number(data[key]["score"]),
          });
        }
        dispatch({
          type: actionTypes.FETCH_SERIES_RATED_LIST,
          userRatedList: fetchedData,
        });
      });
  };
};

export const loadWatchListFromDb = (userWatchList) => {
  return (dispatch) => {
    let url;

    userWatchList.forEach((element) => {
      if (element.isMovie) {
        url = `https://api.themoviedb.org/3/movie/${element.movieId}?api_key=${API_KEY}&language=pl`;
      } else {
        url = `https://api.themoviedb.org/3/tv/${element.movieId}?api_key=${API_KEY}&language=pl`;
      }
      fetch(url)
        .then((data) => data.json())
        .then((res) => {
          res.firebaseHash = element.hash;
          if (res.first_air_date) {
            dispatch({
              type: actionTypes.FETCH_WATCH_LIST_SERIES,
              loadWatchListSeries: res,
            });
          } else {
            dispatch({
              type: actionTypes.FETCH_WATCH_LIST_MOVIES,
              loadWatchListMovies: res,
            });
          }
        })
        .catch((err) => err);
    });
    dispatch({ type: actionTypes.LOADING_WATCH_LIST });
  };
};

export const loadRatedFromDb = (userRatedList) => {
  return (dispatch) => {
    let url;

    userRatedList.forEach((element) => {
      if (element.isMovie) {
        url = `https://api.themoviedb.org/3/movie/${element.movieId}?api_key=${API_KEY}&language=pl`;
      } else {
        url = `https://api.themoviedb.org/3/tv/${element.movieId}?api_key=${API_KEY}&language=pl`;
      }
      fetch(url)
        .then((data) => data.json())
        .then((res) => {
          res.vote_average = element.score;
          res.firebaseHash = element.hash;
          if (res.first_air_date) {
            dispatch({
              type: actionTypes.FETCH_RATED_SERIES,
              loadRatedSeries: res,
            });
          } else {
            dispatch({
              type: actionTypes.FETCH_RATED_MOVIES,
              loadRatedMovies: res,
            });
          }
        })
        .catch((err) => err);
    });
    dispatch({ type: actionTypes.LOADING_RATED });
  };
};

export const reloadAccountData = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RELOAD_ACCOUNT_DATA });
  };
};

export const deleteItemFromDb = (hash, isMovie, isRated, token) => {
  return (dispatch) => {
    let url = null;
    if (!isMovie) {
      url = `https://movie-search-3d6f7.firebaseio.com/series/${hash}.json?auth=${token}`;
      if (!isRated) {
        url = `https://movie-search-3d6f7.firebaseio.com/series/watchlist/${hash}.json?auth=${token}`;
      }
    } else {
      url = `https://movie-search-3d6f7.firebaseio.com/movies/${hash}.json?auth=${token}`;
      if (!isRated) {
        url = `https://movie-search-3d6f7.firebaseio.com/movies/watchlist/${hash}.json?auth=${token}`;
      }
    }
    fetch(url, { method: "DELETE" })
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: actionTypes.DELETE_ITEM_SUCCESS });
        } else {
          throw new Error(data.error.message);
        }
      })
      .catch((error) => {
        dispatch({ type: actionTypes.DELETE_ITEM_FAIL, error: error.message });
      });
  };
};

export const clearErrorState = () => {
  return { type: actionTypes.CLEAR_ERROR_STATE };
};
