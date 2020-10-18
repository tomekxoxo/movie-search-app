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
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        dispatch({
          type: actionTypes.RATE_SUCCESS,
          rateData: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.RATE_MOVIE_ERROR,
          error: err,
        });
      });
  };
};

export const updateRating = (hash, isMovie, token, newValue) => {
  return (dispatch) => {
    const data = {
      score: newValue,
    };
    let url = null;
    if (!isMovie) {
      url = `https://movie-search-3d6f7.firebaseio.com/series/${hash}.json?auth=${token}`;
    } else {
      url = `https://movie-search-3d6f7.firebaseio.com/movies/${hash}.json?auth=${token}`;
    }
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: actionTypes.RATE_UPDATE_SUCCESS });
        } else {
          throw new Error(data.error.message);
        }
      })
      .catch((error) => {
        dispatch({ type: actionTypes.RATE_UPDATE_FAIL, error: error.message });
      });
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
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        dispatch({
          type: actionTypes.WATCHLIST_SUCCESS,
          rateData: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.WATCHLIST_ERROR,
          error: err,
        });
      });
  };
};

export const downloadFirebaseMovieWatchList = (userId) => {
  return (dispatch) => {
    let url = `https://movie-search-3d6f7.firebaseio.com/movies/watchlist.json?orderBy="userId"&equalTo="${userId}"`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
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
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FIREBASE_DOWNLOAD_ERROR,
          error: err,
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
        if (data.error) {
          throw new Error(data.error.message);
        }
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
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FIREBASE_DOWNLOAD_ERROR,
          error: err,
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
        if (data.error) {
          throw new Error(data.error.message);
        }
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
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FIREBASE_DOWNLOAD_ERROR,
          error: err,
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
        if (data.error) {
          throw new Error(data.error.message);
        }
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
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FIREBASE_DOWNLOAD_ERROR,
          error: err,
        });
      });
  };
};

export const loadWatchListFromDb = (userWatchList) => {
  return (dispatch) => {
    let url;

    if (userWatchList) {
      userWatchList.forEach((element) => {
        if (element.isMovie) {
          url = `https://api.themoviedb.org/3/movie/${element.movieId}?api_key=${API_KEY}&language=pl`;
        } else {
          url = `https://api.themoviedb.org/3/tv/${element.movieId}?api_key=${API_KEY}&language=pl`;
        }
        fetch(url)
          .then((data) => data.json())
          .then((res) => {
            if (res.error) {
              throw new Error(res.error.message);
            }
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
          .catch((err) => {
            dispatch({
              type: actionTypes.API_DOWNLOAD_ERROR,
              error: err,
            });
          });
      });
      dispatch({ type: actionTypes.LOADING_WATCH_LIST });
    }
  };
};

export const loadRatedFromDb = (userRatedList) => {
  return (dispatch) => {
    let url;

    if (userRatedList) {
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
    }
  };
};

export const reloadAccountData = () => {
  return { type: actionTypes.RELOAD_ACCOUNT_DATA };
};

export const changeMovieFilter = (filter) => {
  return { type: actionTypes.CHANGE_MOVIE_FILTER, filter: filter };
};

export const changeSerieFilter = (filter) => {
  return { type: actionTypes.CHANGE_SERIE_FILTER, filter: filter };
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
