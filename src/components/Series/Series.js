import React, { useState, useEffect } from "react";
import MovieCard from "../Movies/MovieCard";
import { API_KEY, IMG_PATH } from "../../App";
import InfiniteScroll from "react-infinite-scroll-component";
import Filter from "../Filter/Filter";
import Loader from "../UI/Loader";
import StyledGridContainer from "../common/StyledGridContainer";
import Container from "../common/Container";

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
      <Container>
        <Filter change={onChangeFilter} />
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
    </React.Fragment>
  );
};

export default Series;
