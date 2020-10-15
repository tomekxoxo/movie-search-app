import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, IMG_PATH } from "../../App";
import Loader from "../UI/Loader";
import StyledWrapper from "../common/StyledWrapper";
import CastSwiper from "../Swiper/CastSwiper";
import HoverRating from "../Rating/Rating";
import Container from "../common/Container";
import Footer from "../footer/Footer";

const SeriesDetail = () => {
  let { id } = useParams();

  const [defaultMovies, setDefaultMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=pl`
    )
      .then((data) => data.json())
      .then((res) => {
        setDefaultMovies(res);
        setError(false);
        setLoader(false);
      })
      .catch((err) => setError(`data couldn't be loaded...`));
  }, []);

  let genres = [];

  for (let key in defaultMovies.genres) {
    genres.push(defaultMovies.genres[key].name);
  }

  genres = genres.map((genre, id) => {
    return <p key={id}>{genre}</p>;
  });

  let seasons = [];

  for (let key in defaultMovies.seasons) {
    seasons.push({
      airDate: defaultMovies.seasons[key].air_date,
      episodeCount: defaultMovies.seasons[key].episode_count,
    });
  }

  seasons = seasons.map((season, id) => {
    return (
      <p key={id}>
        Sezon {id + 1} odc {season.episodeCount}
      </p>
    );
  });

  const dateStart = new Date(defaultMovies.first_air_date).getFullYear();
  const dateEnd = new Date(defaultMovies.last_air_date).getFullYear();

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
                {defaultMovies.name}({dateStart}-{!isNaN(dateEnd) && dateEnd})
              </h1>
              <h1 className="genres">{genres}</h1>
              <HoverRating movieId={id} isMovie={false} />
              <p className="rating">
                <i className="material-icons">star</i>
                {defaultMovies.vote_average}
              </p>
              <h1 className="seasons">{seasons}</h1>
              <p>{defaultMovies.release_date}</p>
              <p>{defaultMovies.overview}</p>
            </div>
          </StyledWrapper>
          <CastSwiper id={id} type="tv" />
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
};

export default SeriesDetail;
