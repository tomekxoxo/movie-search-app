import React, { useState, useEffect } from "react";
import MovieCard from "../Movies/MovieCard";
import { API_KEY, IMG_PATH } from "../../App";
import InfiniteScroll from "react-infinite-scroll-component";
import Filter from "../Filter/Filter";
import Loader from "../UI/Loader";
import StyledGridContainer from "../common/StyledGridContainer";
import Container from '../common/Container';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const Films = (props) => {
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pl&sort_by=${props.movieFilter}&include_adult=false&include_video=false&page=${page}`
    )
      .then((data) => data.json())
      .then((res) => {
        setDefaultMovies((prevMovies) => [...prevMovies, ...res.results]);
        setLastPage(res.total_pages);
        setLoading(false);
      })
      .catch((err) => err);
  }, [page]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pl&sort_by=${props.movieFilter}&include_adult=false&include_video=false&page=${page}`
    )
      .then((data) => data.json())
      .then((res) => {
        setDefaultMovies(res.results);
        setLastPage(res.total_pages);
        setLoading(false);
      })
      .catch((err) => err);
  }, [props.movieFilter]);

  let cards = defaultMovies.map((movie) => (
    <MovieCard
      isMovie={true}
      key={movie.id}
      background={`${IMG_PATH}${movie.backdrop_path}`}
      movieId={movie.id}
      title={movie.title}
      desc={movie.overview}
      poster={movie.poster_path}
      avg={movie.vote_average}
    />
  ));

  const onChangeFilter = (e) => {
    props.onChangeMovieFilter(e.target.value);
  };

  return (
    <Container>
      <Filter change={onChangeFilter} value={props.movieFilter}/>
      {loading && <Loader />}

      <InfiniteScroll
        dataLength={defaultMovies.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={page < lastPage}
        loader={<h4>Loading...</h4>}
      >
        <StyledGridContainer> {cards}</StyledGridContainer>
      </InfiniteScroll>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    movieFilter: state.movieFilter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeMovieFilter: (movieFilter) => {
      dispatch(actions.changeMovieFilter(movieFilter));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Films);
