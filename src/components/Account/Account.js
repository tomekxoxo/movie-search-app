import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import MovieCard from "../Movies/MovieCard";
import { IMG_PATH } from "../../App";
import styled from "styled-components";
import { useForkRef } from "@material-ui/core";

const StyledGridContainer = styled.div`
  margin-bottom: 5rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const StyledContainer = styled.div`
  h1 {
    margin-bottom: 1rem;
  }
`;

const Account = (props) => {
  const {
    ondownloadFirebaseMovieWatchList,
    ondownloadFirebaseSeriesWatchList,
    userWatchList,
    userId,
    userRatedList,
    ondownloadFirebaseRatedMovies,
    ondownloadFirebaseRatedSeries,
    onloadWatchListFromDb,
    loadWatchListSeries,
    loadWatchListMovies,
    loadRatedMovies,
    loadRatedSeries,
    onloadRatedFromDb,
    onReloadData
  } = props;

  useEffect(() => {
    ondownloadFirebaseRatedMovies(userId);
    ondownloadFirebaseRatedSeries(userId);
    ondownloadFirebaseMovieWatchList(userId);
    ondownloadFirebaseSeriesWatchList(userId);
    return () => {
      onReloadData()
    }
  }, [userId]);

  useEffect(() => {
    if (userWatchList != undefined) {
      onloadWatchListFromDb(userWatchList);
    }
  }, [userWatchList]);

  useEffect(() => {
    if (userRatedList != undefined) {
      onloadRatedFromDb(userRatedList);
    }
  }, [userRatedList]);

  let watchListMovies, watchListSeries, ratedMoviesArr, ratedSeriesArr;

  if (loadWatchListMovies) {
    watchListMovies = loadWatchListMovies.map((movie) => {
      return (
        <MovieCard
          width="300px"
          isMovie={true}
          key={movie.id}
          movieId={movie.id}
          background={`${IMG_PATH}${movie.backdrop_path}`}
          title={movie.title}
          poster={movie.poster_path}
          poster={movie.poster_path}
          avg={movie.vote_average}
        />
      );
    });
  }

  if (loadWatchListSeries) {
    watchListSeries = loadWatchListSeries.map((serie) => {
      return (
        <MovieCard
          width="300px"
          isMovie={false}
          key={serie.id}
          movieId={serie.id}
          title={serie.original_name}
          background={`${IMG_PATH}${serie.backdrop_path}`}
          poster={serie.poster_path}
          avg={serie.vote_average}
        />
      );
    });
  }

  ratedMoviesArr = loadRatedMovies.map((movie) => {
    return (
      <MovieCard
        width="300px"
        isMovie={true}
        key={movie.id}
        movieId={movie.id}
        background={`${IMG_PATH}${movie.backdrop_path}`}
        title={movie.title}
        poster={movie.poster_path}
        poster={movie.poster_path}
        avg={movie.vote_average}
      />
    );
  });

  ratedSeriesArr = loadRatedSeries.map((serie) => {
    return (
      <MovieCard
        width="300px"
        isMovie={false}
        key={serie.id}
        movieId={serie.id}
        background={`${IMG_PATH}${serie.backdrop_path}`}
        title={serie.title}
        poster={serie.poster_path}
        poster={serie.poster_path}
        avg={serie.vote_average}
      />
    );
  });

  return (
    <React.Fragment>
      <StyledContainer>
        <h1>OCENIONE FILMY</h1>
        <StyledGridContainer>{ratedMoviesArr}</StyledGridContainer>
        <h1>NAJBARDZIEJ CHCĘ ZOBACZYĆ</h1>
        <StyledGridContainer>{watchListMovies}</StyledGridContainer>
        <h1>OCENIONE SERIALE</h1>
        <StyledGridContainer>{ratedSeriesArr}</StyledGridContainer>
        <h1>NAJBARDZIEJ CHCĘ ZOBACZYĆ</h1>
        <StyledGridContainer>{watchListSeries}</StyledGridContainer>
      </StyledContainer>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    userWatchList: state.userWatchList,
    userRatedList: state.userRatedList,
    loadWatchListMovies: state.loadWatchListMovies,
    loadWatchListSeries: state.loadWatchListSeries,
    loadRatedMovies: state.loadRatedMovies,
    loadRatedSeries: state.loadRatedSeries,
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
    onloadRatedFromDb: (userRatedList) => {
      dispatch(actions.loadRatedFromDb(userRatedList));
    },
    onReloadData: () => {
      dispatch(actions.reloadAccountData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
