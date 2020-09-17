import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, IMG_PATH } from "../App";
import styled from "styled-components";

const StyledWrapper = styled.div`
  margin-top: 5rem;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  div {
    flex-grow:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      padding:0 2rem;
      font-size: 2.5rem;
    }
    i {
      margin-top: 2rem;
      color: #cfb53b;
      font-size: 2rem;
      top: 1rem;
      left: 1rem;
      -webkit-text-stroke-width: 0.5px;
      -webkit-text-stroke-color: #000;
    }
    p {
      font-size: 2rem;
      padding: 2rem 2rem 0;
    }
    .genres{
      margin-top:1rem;
      font-weight:normal;
      display:flex;
      justify-content:center;
      align-items:center;
      p{
        padding:.5rem 1rem;
        margin-right:1rem;
        background-color: #cfb53b;
        border-radius:10px;
      }
    }
  }
`;

const MovieDetail = () => {
  let { id } = useParams();

  const [defaultMovies, setDefaultMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pl`
    )
      .then((data) => data.json())
      .then((res) => {
        setDefaultMovies(res);
        setError(false);
      })
      .catch((err) => setError(`data couldn't be loaded...`));
  }, []);

  useEffect(() => {
    console.log(defaultMovies);
  }, [defaultMovies]);

  let genres =[]


  for(let key in defaultMovies.genres) {
    genres.push(defaultMovies.genres[key].name);
  }
  
  genres = genres.map((genre,id) => {
    return (<p key={id}>{genre}</p>)
  })
   

  return (
    <StyledWrapper>
      <img src={`${IMG_PATH}${defaultMovies.poster_path}`}></img>
      <div>
        <h1>{defaultMovies.title}({new Date(defaultMovies.release_date).getFullYear()})</h1>
        <h1 className="genres">{genres}</h1>
        <i className="fas fa-star">{defaultMovies.vote_average}</i>
        <p>{defaultMovies.release_date}</p>
        <p>{defaultMovies.runtime} min</p>

        <p>{defaultMovies.overview}</p>
      </div>
    </StyledWrapper>
  );
};

export default MovieDetail;
