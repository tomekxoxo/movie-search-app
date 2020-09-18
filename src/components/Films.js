import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { API_KEY, IMG_PATH } from "../App";
import debounce from "lodash.debounce";


const StyledGridContainer = styled.div`
  margin-top:10rem;
  margin-bottom:5rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;  
`;

const Films = (props) => {
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pl&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    )
      .then((data) => data.json())
      .then((res) => {
        setDefaultMovies(prevMovies => [...prevMovies, ...res.results]);
        setLastPage(res.total_pages);
        setError(false);
        setLoading(false)
      })
      .catch((err) => setError(`data couldn't be loaded...`));
  }, [page]);


  let cards = defaultMovies.map((movie) => (
    <MovieCard
      isMovie={true}
      key={movie.id}
      background={`${IMG_PATH}${movie.backdrop_path}`}
      movieId={movie.id}
      title={movie.title}
      desc={movie.overview}
      poster={`${IMG_PATH}${movie.poster_path}`}
      avg={movie.vote_average}
    />
  ));

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      page < lastPage && setPage(page + 1);
      
    }
  }, 100);

  

  return <StyledGridContainer>{cards}</StyledGridContainer>;
};

export default Films;
