import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { API_KEY, IMG_PATH } from "../App";
import debounce from "lodash.debounce";
import Filter from "./Filter";
import Loader from "./Loader";
import StyledGridContainer from "./common/StyledGridContainer";

const Series = (props) => {
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [filter, setFilter] = useState("popularity.desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pl&sort_by=${filter}&include_adult=false&include_video=false&page=${page}`
    )
      .then((data) => data.json())
      .then((res) => {
        setDefaultMovies((prevMovies) => [...prevMovies, ...res.results]);
        setLastPage(res.total_pages);
        setLoading(false);
      })
      .catch((err) => err);
    window.onscroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        page < lastPage && setPage(page + 1);
      }
    }, 100);
  }, [page]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pl&sort_by=${filter}&include_adult=false&include_video=false&page=${page}`
    )
      .then((data) => data.json())
      .then((res) => {
        setDefaultMovies(res.results);
        setLastPage(res.total_pages);
        setLoading(false);
      })
      .catch((err) => err);
  }, [filter]);

  const onChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const cards = defaultMovies.map((movie) => (
    <MovieCard
      isMovie={false}
      key={movie.id}
      background={`${IMG_PATH}${movie.backdrop_path}`}
      movieId={movie.id}
      title={movie.name}
      desc={movie.overview}
      poster={movie.poster_path}
      avg={movie.vote_average}
    />
  ));

  return (
    <React.Fragment>
      <Filter change={onChangeFilter} />
      {loading && <Loader />}
      <StyledGridContainer>{cards}</StyledGridContainer>
    </React.Fragment>
  );
};

export default Series;
