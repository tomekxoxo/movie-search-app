import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, IMG_PATH } from "../App";
import genres from './common/genres';
import styled from "styled-components";
import Loader from "./Loader";

const StyledWrapper = styled.div`
  margin-top: 10rem;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  @media screen and (max-width:768px){
    flex-direction:column;
    img{
      object-fit:contain;
      width:100%;
      height:auto;
    }
    .info{
      padding-top:5rem;
      width:100%;
      padding-bottom:5rem;
      h1{
        text-align:center;
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
      justify-content: center;
      align-items: center;
      p {
        padding: 0.5rem 1rem;
        margin: 1rem 1rem 0 0;
        background-color: #cfb53b;
        border-radius: 10px;
      }
    }
    .production {
      width: 200px;
      display: flex;
      img {
        width: 10rem;
        object-fit: contain;
      }
    }
    .release-date{
      i{
        padding-right:1rem;
      }
    }
  }
`;

const SearchTv = (props) => {
  let { id } = useParams();

  const [defaultMovies, setDefaultMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=pl&query=${id}&page=1&include_adult=false`
    )
      .then((data) => data.json())
      .then((res) => {
        const firsRecord = [res.results[0]];
        setDefaultMovies(firsRecord);
        setError(false);
        setLoading(false)
      })
      .catch((err) => setError(`data couldn't be loaded...`));
  }, [id]);


  let parsedData;

  parsedData = defaultMovies.map((defaultMovies) => {
    const dateStart = new Date(defaultMovies.first_air_date).getFullYear();
    const dateEnd = new Date(defaultMovies.last_air_date).getFullYear();
    const genreArr = defaultMovies.genre_ids;
    let genreFound = []
    genreFound = genreArr.map(genreId => {
      return genres.map(element => {
        if (genreId == element.id) {
          return <p key={element.id}>{element.name}</p>
        }
      })
    })

    return (
      <React.Fragment key={defaultMovies.id}>
        <img src={`${IMG_PATH}${defaultMovies.poster_path}`}></img>
        <div className="info">
          <h1>
            {defaultMovies.original_name}({dateStart}-{!isNaN(dateEnd)&&dateEnd})
          </h1>
          <h1 className="genres">{genreFound}</h1>
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
    return <StyledWrapper>{parsedData}</StyledWrapper>;
  }
};

export default SearchTv;
