import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import StyledGridContainer from "../common/StyledGridContainer";
import MovieCard from "../Movies/MovieCard";
import { API_KEY, IMG_PATH } from "../../App";
import styled from "styled-components";

const StyledContainer = styled.div`
  h1 {
    margin-bottom: 1rem;
  }
`;

const Account = (props) => {
  const {
    onShowMovieWatchList,
    onShowSeriesWatchList,
    userWatchList,
    userId,
    userRatedList,
    onShowMovieRatedList,
    onShowSeriesRatedList,
    onLoadWatchList,
    loadWatchListSeries,
    loadWatchListMovies
  } = props;

  useEffect(() => {
    onShowMovieWatchList(userId);
    onShowSeriesWatchList(userId);
    onShowMovieRatedList(userId);
    onShowSeriesRatedList(userId);
  }, [userId]);

  useEffect(() => {
    if (userWatchList) {
      console.log(userWatchList);
      onLoadWatchList(userWatchList);
    }
  }, [userWatchList]);

  // useEffect(() => {
  //   if (userWatchList) {
  //     console.log(userWatchList);
  //     let url = "";
  //     userWatchList.forEach((element) => {
  //       if (element.isMovie) {
  //         url = `https://api.themoviedb.org/3/movie/${element.movieId}?api_key=${API_KEY}&language=pl`;
  //       } else {
  //         url = `https://api.themoviedb.org/3/tv/${element.movieId}?api_key=${API_KEY}&language=pl`;
  //       }
  //       fetch(url)
  //         .then((data) => data.json())
  //         .then((res) => {
  //           if (res.first_air_date) {
  //             setSeries((series) => [...series, res]);
  //           } else {
  //             setMovies((movies) => [...movies, res]);
  //           }
  //         })
  //         .catch((err) => err);
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (userRatedList) {
  //     let url = "";
  //     userRatedList.forEach((element) => {
  //       if (element.isMovie) {
  //         url = `https://api.themoviedb.org/3/movie/${element.movieId}?api_key=${API_KEY}&language=pl`;
  //       } else {
  //         url = `https://api.themoviedb.org/3/tv/${element.movieId}?api_key=${API_KEY}&language=pl`;
  //       }
  //       fetch(url)
  //         .then((data) => data.json())
  //         .then((res) => {
  //           res.vote_average = element.score;
  //           if (res.first_air_date) {
  //             console.log("serial", res);
  //             setRatedSeries((series) => [...series, res]);
  //           } else {
  //             console.log("film", res);
  //             setRatedMovies((movies) => [...movies, res]);
  //           }
  //         })
  //         .catch((err) => err);
  //     });
  //   }
  // }, []);

  let watchListMovies, watchListSeries, ratedMoviesArr, ratedSeriesArr;

  if (loadWatchListMovies) {
    watchListMovies = loadWatchListMovies.map((movie) => {
      return (
        <MovieCard
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


  // ratedMoviesArr = ratedMovies.map((movie) => {
  //   console.log(movie);
  //   return (
  //     <MovieCard
  //       isMovie={true}
  //       key={movie.id}
  //       movieId={movie.id}
  //       background={`${IMG_PATH}${movie.backdrop_path}`}
  //       title={movie.title}
  //       poster={movie.poster_path}
  //       poster={movie.poster_path}
  //       avg={movie.vote_average}
  //     />
  //   );
  // });

  // ratedSeriesArr = ratedSeries.map((serie) => {
  //   console.log(serie);
  //   return (
  //     <MovieCard
  //       isMovie={false}
  //       key={serie.id}
  //       movieId={serie.id}
  //       background={`${IMG_PATH}${serie.backdrop_path}`}
  //       title={serie.title}
  //       poster={serie.poster_path}
  //       poster={serie.poster_path}
  //       avg={serie.vote_average}
  //     />
  //   );
  // });

  return (
    <React.Fragment>
      <StyledContainer>
        <h1>OCENIONE FILMY</h1>
        {/* <StyledGridContainer>{ratedMoviesArr}</StyledGridContainer> */}
        <h1>NAJBARDZIEJ CHCĘ ZOBACZYĆ</h1>
        <StyledGridContainer>{watchListMovies}</StyledGridContainer>
        <h1>OCENIONE SERIALE</h1>
        {/* <StyledGridContainer>{ratedSeriesArr}</StyledGridContainer> */}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShowMovieWatchList: (userId) => {
      dispatch(actions.showMovieWatchList(userId));
    },
    onShowSeriesWatchList: (userId) => {
      dispatch(actions.showSeriesWatchList(userId));
    },
    onShowMovieRatedList: (userId) => {
      dispatch(actions.showRatedMovies(userId));
    },
    onShowSeriesRatedList: (userId) => {
      dispatch(actions.showRatedSeries(userId));
    },
    onLoadWatchList: (userWatchList) => {
      dispatch(actions.loadWatchList(userWatchList));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
