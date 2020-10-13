import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, IMG_PATH } from "../../App";
import genres from "../common/genres";
import Loader from "../UI/Loader";
import StyledWrapper from "../common/StyledWrapper";
import CastSwiper from "../Swiper/CastSwiper";
import HoverRating from '../Rating/Rating';

const SearchMovie = (props) => {
  let { id } = useParams();

  const [defaultMovies, setDefaultMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [movieID, setMovieId] = useState(null);


  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pl&query=${id}&page=1&include_adult=false`
    )
      .then((data) => data.json())
      .then((res) => {
        const firsRecord = [res.results[0]];
        const movieId = [res.results[0].id];
        setMovieId(movieId)
        setDefaultMovies(firsRecord);
        setError(false);
        setLoading(false);
      })
      .catch((err) => setError(`data couldn't be loaded...`));
  }, [id]);

  let parsedData;

  parsedData = defaultMovies.map((defaultMovies) => {
    const genreArr = defaultMovies.genre_ids;
    let genreFound = [];
    genreFound = genreArr.map((genreId) => {
      return genres.map((element) => {
        if (genreId == element.id) {
          return <p key={element.id}>{element.name}</p>;
        }
      });
    });
    return (
      <React.Fragment key={defaultMovies.id}>
        <img src={`${IMG_PATH}${defaultMovies.poster_path}`}></img>
        <div className="info">
          <h1>
            {defaultMovies.title}(
            {new Date(defaultMovies.release_date).getFullYear()})
          </h1>
          <h1 className="genres">{genreFound}</h1>
          <HoverRating movieId={movieID} isMovie={true}/>
          <p className="rating">
            <i className="material-icons">star</i>
            {defaultMovies.vote_average}
          </p>
          <p className="release-date">
            <i className="fas fa-video"></i>
            {defaultMovies.release_date}
          </p>
          <p>{defaultMovies.overview}</p>
        </div>
      </React.Fragment>
    );
  });
  if (loading) {
    return <Loader />;
  } else {
    return (
      <React.Fragment>
        <StyledWrapper>{parsedData}</StyledWrapper>
        <CastSwiper id={movieID} type="movie" />
      </React.Fragment>
    );
  }
};

export default SearchMovie;
