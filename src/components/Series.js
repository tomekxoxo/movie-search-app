import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { API_KEY, IMG_PATH } from "../App";
import debounce from "lodash.debounce";
import useFetch from "../hooks/useFetch";
import useFetchFilter from "../hooks/useFetchFilter";
import Filter from "./Filter";

const StyledGridContainer = styled.div`
  margin-bottom: 5rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Series = (props) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("popularity.desc");
  const [mergedData, setMergedData] = useState([]);

  
  const [data, lastPage] = useFetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pl&sort_by=${filter}&include_adult=false&include_video=false&page=${page}`,
    [page]
  );

  const [filteredData] = useFetchFilter(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pl&sort_by=${filter}&include_adult=false&include_video=false&page=${page}`,
    [filter]
  );

  //tu jest błąd chcę zapisać filteredData do stanu
  setMergedData(data)


  const onChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      page < lastPage && setPage(page + 1);
    }
  }, 100);


  const cards = mergedData.map((movie) => (
    <MovieCard
      isMovie={false}
      key={movie.id}
      background={`${IMG_PATH}${movie.backdrop_path}`}
      movieId={movie.id}
      title={movie.name}
      desc={movie.overview}
      poster={`${IMG_PATH}${movie.poster_path}`}
      avg={movie.vote_average}
    />
  ));

  return (
    <React.Fragment>
      <Filter change={onChangeFilter} />
      <StyledGridContainer>{cards}</StyledGridContainer>
    </React.Fragment>
  );
};

export default Series;
