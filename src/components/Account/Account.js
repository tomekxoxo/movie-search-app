import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import StyledGridContainer from "../common/StyledGridContainer";
import MovieCard from "../Movies/MovieCard";
import { API_KEY, IMG_PATH } from "../../App";
import styled from "styled-components";

const Account = (props) => {
  useEffect(() => {
    // props.ondownloadFirebaseSeriesWatchList(props.userId);

    props.onloadWatchListFromDb([
      { isMovie: false, movieId: 63174 },
      { isMovie: false, movieId: 456 },
      { isMovie: false, movieId: 1399 },
      { isMovie: false, movieId: 62286 },
    ]);
  }, []);

  return <div>Witać</div>;
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    userWatchList: state.userWatchList,
    userRatedList: state.userRatedList,
    loadWatchListMovies: state.loadWatchListMovies,
    loadWatchListSeries: state.loadWatchListSeries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ondownloadFirebaseMovieWatchList: (userId) => {
      dispatch(actions.downloadFirebaseMovieWatchList(userId));
    },
    ondownloadFirebaseSeriesWatchList: (userId) => {
      dispatch(actions.downloadFirebaseSeriesWatchList(userId));
    },
    ondownloadFirebaseRatedMovies: (userId) => {
      dispatch(actions.downloadFirebaseRatedMovies(userId));
    },
    ondownloadFirebaseRatedSeries: (userId) => {
      dispatch(actions.downloadFirebaseRatedSeries(userId));
    },
    onloadWatchListFromDb: (userWatchList) => {
      dispatch(actions.loadWatchListFromDb(userWatchList));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
