import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, IMG_PATH } from "../App";
import styled from "styled-components";
import Loader from "./Loader";

const StyledWrapper = styled.div`
  margin-top: 10rem;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    img {
      object-fit: contain;
      width: 100%;
      height: auto;
    }
    .info {
      padding-top: 5rem;
      width: 100%;
      padding-bottom: 5rem;
      h1 {
        /* text-align:center; */
      }
    }
  }
  div {
    width: 50%;
    flex-grow: 1;
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
        margin: 1rem 1rem 0 0;
        background-color: #cfb53b;
        border-radius: 10px;
      }
    }
    .release-date {
      i {
        padding-right: 1rem;
      }
    }
  }
`;

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
      <StyledWrapper>
        <img src={`${IMG_PATH}${defaultMovies.poster_path}`}></img>
        <div className="info">
          <h1>
            {defaultMovies.title}(
            {new Date(defaultMovies.release_date).getFullYear()})
          </h1>
          <h1 className="genres">{genres}</h1>
          <p className="rating">
            <i className="material-icons">star</i>
            {defaultMovies.vote_average}
          </p>
          <p className="release-date">
            <i className="fas fa-video"></i>
            {defaultMovies.release_date}
          </p>
          <p>{defaultMovies.runtime} min</p>

          <p>{defaultMovies.overview}</p>
        </div>
      </StyledWrapper>
    );
  }
};

export default MovieDetail;
