import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import MovieCard from "../Movies/MovieCard";
import { IMG_PATH } from "../../App";
import styled from "styled-components";
import Loader from "../UI/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import "./CastSwiperCustom.css";
import "firebase/auth";
import "firebase/database";
import Container from "../common/Container";
import Footer from "../footer/Footer";

const StyledGridContainer = styled.div`
  margin-bottom: 5rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const StyledContainer = styled.div`
  h1 {
    margin: 1rem;
  }
`;

const DeleteButton = styled.button`
  margin-top: 1rem;
  font-size: 2.5rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
  i {
    color: red;
    &:hover {
      color: #960000;
    }
  }
`;

const Account = (props) => {
  const {
    ondownloadFirebaseMovieWatchList,
    ondownloadFirebaseSeriesWatchList,
    userWatchList,
    userId,
    idToken,
    userRatedList,
    ondownloadFirebaseRatedMovies,
    ondownloadFirebaseRatedSeries,
    onloadWatchListFromDb,
    loadWatchListSeries,
    loadWatchListMovies,
    loadRatedMovies,
    loadRatedSeries,
    onloadRatedFromDb,
    onDeleteItemFromDb,
    onReloadData,
    loadingRated,
    loadingWatchList,
    reloadAfterItemDelete,
  } = props;

  useEffect(() => {
    if (reloadAfterItemDelete) {
      onReloadData();
      ondownloadFirebaseRatedMovies(userId);
      ondownloadFirebaseRatedSeries(userId);
      ondownloadFirebaseMovieWatchList(userId);
      ondownloadFirebaseSeriesWatchList(userId);
    }
  }, [reloadAfterItemDelete]);

  useEffect(() => {
    ondownloadFirebaseRatedMovies(userId);
    ondownloadFirebaseRatedSeries(userId);
    ondownloadFirebaseMovieWatchList(userId);
    ondownloadFirebaseSeriesWatchList(userId);
    return () => {
      onReloadData();
    };
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

  if (loadRatedMovies) {
    ratedMoviesArr = loadRatedMovies.map((movie) => {
      return (
        <SwiperSlide key={movie.id}>
          <MovieCard
            width="180px"
            height="29rem"
            isMovie={true}
            movieId={movie.id}
            background={`${IMG_PATH}${movie.backdrop_path}`}
            title={movie.title}
            poster={movie.poster_path}
            poster={movie.poster_path}
            avg={movie.vote_average}
          />
          <DeleteButton
            onClick={() =>
              onDeleteItemFromDb(movie.firebaseHash, true, true, idToken)
            }
          >
            <i className="fas fa-trash-alt"></i>
          </DeleteButton>
        </SwiperSlide>
      );
    });
  }

  if (loadWatchListMovies) {
    watchListMovies = loadWatchListMovies.map((movie) => {
      return (
        <SwiperSlide key={movie.id}>
          <MovieCard
            width="180px"
            height="29rem"
            isMovie={true}
            movieId={movie.id}
            background={`${IMG_PATH}${movie.backdrop_path}`}
            title={movie.title}
            poster={movie.poster_path}
            poster={movie.poster_path}
            avg={movie.vote_average}
          />
          <DeleteButton
            onClick={() =>
              onDeleteItemFromDb(movie.firebaseHash, true, false, idToken)
            }
          >
            <i className="fas fa-trash-alt"></i>
          </DeleteButton>
        </SwiperSlide>
      );
    });
  }

  if (loadWatchListSeries) {
    watchListSeries = loadWatchListSeries.map((serie) => {
      return (
        <SwiperSlide key={serie.id}>
          <MovieCard
            width="180px"
            height="29rem"
            isMovie={false}
            movieId={serie.id}
            title={serie.original_name}
            background={`${IMG_PATH}${serie.backdrop_path}`}
            poster={serie.poster_path}
            avg={serie.vote_average}
          />
          <DeleteButton
            onClick={() =>
              onDeleteItemFromDb(serie.firebaseHash, false, false, idToken)
            }
          >
            <i className="fas fa-trash-alt"></i>
          </DeleteButton>
        </SwiperSlide>
      );
    });
  }
  ratedSeriesArr = loadRatedSeries.map((serie) => {
    return (
      <SwiperSlide key={serie.id}>
        <MovieCard
          width="180px"
          height="29rem"
          isMovie={false}
          movieId={serie.id}
          background={`${IMG_PATH}${serie.backdrop_path}`}
          title={serie.original_name}
          poster={serie.poster_path}
          poster={serie.poster_path}
          avg={serie.vote_average}
        />
        <DeleteButton
          onClick={() =>
            onDeleteItemFromDb(serie.firebaseHash, false, true, idToken)
          }
        >
          <i className="fas fa-trash-alt"></i>
        </DeleteButton>
      </SwiperSlide>
    );
  });

  return (
    <React.Fragment>
      <Container>
        <StyledContainer>
          <h1>FILMY: TWOJA OCENA</h1>
          <Swiper
            className="swiper-custom"
            spaceBetween={50}
            slidesPerView={6}
            scrollbar={{ draggable: true }}
            navigation
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetweenSlides: 5,
              },
              480: {
                slidesPerView: 2,
                spaceBetweenSlides: 15,
              },
              610: {
                slidesPerView: 3,
                spaceBetweenSlides: 25,
              },
              768: {
                slidesPerView: 4,
                spaceBetweenSlides: 25,
              },
              900: {
                slidesPerView: 5,
                spaceBetweenSlides: 50,
              },
            }}
          >
            {loadingRated ? <Loader /> : ratedMoviesArr}
          </Swiper>
          <h1>FILMY: CHCĘ ZOBACZYĆ</h1>
          <Swiper
            className="swiper-custom"
            spaceBetween={50}
            slidesPerView={6}
            scrollbar={{ draggable: true }}
            navigation
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetweenSlides: 5,
              },
              480: {
                slidesPerView: 2,
                spaceBetweenSlides: 15,
              },
              610: {
                slidesPerView: 3,
                spaceBetweenSlides: 25,
              },
              768: {
                slidesPerView: 4,
                spaceBetweenSlides: 25,
              },
              900: {
                slidesPerView: 5,
                spaceBetweenSlides: 50,
              },
            }}
          >
            {loadingWatchList ? <Loader /> : watchListMovies}
          </Swiper>
          <h1>SERIALE: TWOJA OCENA</h1>
          <Swiper
            className="swiper-custom"
            spaceBetween={50}
            slidesPerView={6}
            scrollbar={{ draggable: true }}
            navigation
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetweenSlides: 5,
              },
              480: {
                slidesPerView: 2,
                spaceBetweenSlides: 15,
              },
              610: {
                slidesPerView: 3,
                spaceBetweenSlides: 25,
              },
              768: {
                slidesPerView: 4,
                spaceBetweenSlides: 25,
              },
              900: {
                slidesPerView: 5,
                spaceBetweenSlides: 50,
              },
            }}
          >
            {loadingRated ? <Loader /> : ratedSeriesArr}
          </Swiper>
          <h1>SERIALE: CHCĘ ZOBACZYĆ</h1>
          <Swiper
            className="swiper-custom"
            spaceBetween={50}
            slidesPerView={6}
            scrollbar={{ draggable: true }}
            navigation
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetweenSlides: 5,
              },
              480: {
                slidesPerView: 2,
                spaceBetweenSlides: 15,
              },
              610: {
                slidesPerView: 3,
                spaceBetweenSlides: 25,
              },
              768: {
                slidesPerView: 4,
                spaceBetweenSlides: 25,
              },
              900: {
                slidesPerView: 5,
                spaceBetweenSlides: 50,
              },
            }}
          >
            {loadingWatchList ? <Loader /> : watchListSeries}
          </Swiper>
        </StyledContainer>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    idToken: state.idToken,
    userWatchList: state.userWatchList,
    userRatedList: state.userRatedList,
    loadWatchListMovies: state.loadWatchListMovies,
    loadWatchListSeries: state.loadWatchListSeries,
    loadRatedMovies: state.loadRatedMovies,
    loadRatedSeries: state.loadRatedSeries,
    loadingRated: state.loadingRated,
    loadingWatchList: state.loadingWatchList,
    reloadAfterItemDelete: state.reloadAfterItemDelete,
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
    onDeleteItemFromDb: (hash, isMovie, isRated, token) => {
      dispatch(actions.deleteItemFromDb(hash, isMovie, isRated, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
