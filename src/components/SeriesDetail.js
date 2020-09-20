import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, IMG_PATH } from "../App";
import styled from "styled-components";

const StyledWrapper = styled.div`
  margin-top: 10rem;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  div {
    width:50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      padding: 0 2rem;
      font-size: 2.5rem;
    }
    .rating {
      display: flex;
      align-items: center;
      color: #cfb53b;
      font-size: 3rem;
      i {
        font-size: 3rem;
        top: 1rem;
        left: 1rem;
      }
    }
    p {
      font-size: 2rem;
      padding: 2rem 2rem 0;
    }
    .genres {
      margin-top: 1rem;
      font-weight: normal;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      p {
        padding: 0.5rem 1rem;
        margin-top: 1rem;
        margin-right: 1rem;
        background-color: #cfb53b;
        border-radius: 10px;
      }
    }
    .seasons {
      margin-top: 1rem;
      font-weight: normal;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      p {
        margin-top: 1rem;
        margin-right: 1rem;
        padding: 0.5rem 1rem;
        border: 1px solid #cccccc;
        border-radius: 2px;
        font-weight: normal;
      }
    }
  }
`;

const SeriesDetail = () => {
  let { id } = useParams();

  const [defaultMovies, setDefaultMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=pl`
    )
      .then((data) => data.json())
      .then((res) => {
        setDefaultMovies(res);
        setError(false);
      })
      .catch((err) => setError(`data couldn't be loaded...`));
  }, []);

  // useEffect(() => {
  //   console.log(defaultMovies);
  // }, [defaultMovies]);

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

  return (
    <StyledWrapper>
      <img src={`${IMG_PATH}${defaultMovies.poster_path}`}></img>
      <div>
        <h1>
          {defaultMovies.name}({dateStart}-{!isNaN(dateEnd)&&dateEnd})
        </h1>
        <h1 className="genres">{genres}</h1>
        <p className="rating">
          <i className="material-icons">star</i>
          {defaultMovies.vote_average}
        </p>
        <h1 className="seasons">{seasons}</h1>
        <p>{defaultMovies.release_date}</p>
        <p>{defaultMovies.overview}</p>
      </div>
    </StyledWrapper>
  );
};

export default SeriesDetail;
