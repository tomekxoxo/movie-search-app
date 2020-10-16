import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, IMG_PATH } from "../../App";
import Loader from "../UI/Loader";
import StyledWrapper from "../common/StyledWrapper";
import CastSwiper from "../Swiper/CastSwiper";
import HoverRating from "../Rating/Rating";
import Container from "../common/Container";
import Footer from "../footer/Footer";

const MovieDetail = () => {
  let { id } = useParams();

  const [defaultMovies, setDefaultMovies] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pl`
    )
      .then((data) => data.json())
      .then((res) => {
        setDefaultMovies(res);
        setLoader(false);
      })
      .catch((err) => err);
  }, []);

  let genres = [];

  for (let key in defaultMovies.genres) {
    genres.push(defaultMovies.genres[key].name);
  }

  genres = genres.map((genre, id) => {
    return <p key={id}>{genre}</p>;
  });

  if (loader) {
    return <Loader />;
  } else {
    return (
      <React.Fragment>
        <Container>
          <StyledWrapper>
            <img src={`${IMG_PATH}${defaultMovies.poster_path}`}></img>
            <div className="info">
              <h1>
                {defaultMovies.title}(
                {new Date(defaultMovies.release_date).getFullYear()})
              </h1>
              <h1 className="genres">{genres}</h1>
              <HoverRating movieId={id} isMovie={true} />
              <p className="rating">
                <i className="material-icons">star</i>
                {defaultMovies.vote_average}
                <span className="vote-count">Ilość ocen: {defaultMovies.vote_count?defaultMovies.vote_count: 0}</span>
              </p>
              <p className="release-date">
                <i className="fas fa-video"></i>
                {defaultMovies.release_date}
              </p>
              <p>{defaultMovies.runtime} min</p>

              <p>{defaultMovies.overview}</p>
            </div>
          </StyledWrapper>
          <CastSwiper id={id} type="movie" />
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
};

export default MovieDetail;
