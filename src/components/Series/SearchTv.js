import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, IMG_PATH } from "../../App";
import genres from "../common/genres";
import Loader from "../UI/Loader";
import StyledWrapper from "../common/StyledWrapper";
import CastSwiper from "../Swiper/CastSwiper";
import HoverRating from '../Rating/Rating';

const SearchTv = (props) => {
  let { id } = useParams();

  const [defaultMovies, setDefaultMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seriesID, setSeriesID] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=pl&query=${id}&page=1&include_adult=false`
    )
      .then((data) => data.json())
      .then((res) => {
        const firsRecord = [res.results[0]];
        const seriesId = [res.results[0].id];
        setSeriesID(seriesId)
        setDefaultMovies(firsRecord);
        setError(false);
        setLoading(false);
      })
      .catch((err) => setError(`data couldn't be loaded...`));
  }, [id]);

  let parsedData;

  parsedData = defaultMovies.map((defaultMovies) => {
    
    const dateStart = new Date(defaultMovies.first_air_date).getFullYear();
    const dateEnd = new Date(defaultMovies.last_air_date).getFullYear();
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
            {defaultMovies.original_name}({dateStart}-
            {!isNaN(dateEnd) && dateEnd})
          </h1>
          <h1 className="genres">{genreFound}</h1>
          <HoverRating movieId={id} isMovie={false}/>
          <p className="rating">
            <i className="material-icons">star</i>
            {defaultMovies.vote_average}
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
        <CastSwiper id={seriesID} type="tv" />
      </React.Fragment>
    );
  }
};

export default SearchTv;
