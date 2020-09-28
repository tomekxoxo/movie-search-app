import React, { useState} from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import ImageNotFound from "../../assets/images/image-not-found.png";
import { IMG_PATH } from "../../App";
import Loader from "../UI/Loader";

const StyledCard = styled(Link)`
  width: 100%;
  height: auto;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  &:hover {
    box-shadow: 0px 0px 15px 10px #eee;
    cursor: pointer;
    img {
      transform: scale(1.05);
    }
  }
  h1 {
    margin-top: 1rem;
    color: #000;
  }
  img {
    width: 100%;
    height: 80%;
    object-fit: cover;
    transition: 0.3s ease;
    overflow: hidden;
    position: relative;
  }
  p {
    text-align: left;
    background-color: rgba(0, 0, 0, 0.5);
    padding-left: 1rem;
    z-index: 6;
    color: #cfb53b;
    font-size: 3rem;
    font-weight: 700;
    position: absolute;
    width: 100%;
    top: 0rem;
    left: 0rem;
  }
`;

const MovieCard = (props) => {
  return (
    <div>
      <StyledCard
        to={`${props.isMovie ? "movies" : "series"}/${props.movieId}`}
      >
        {props.poster ? (
          <img src={`${IMG_PATH}${props.poster}`} alt="movie img" />
        ) : (
          <img
            style={{ objectFit: "contain" }}
            src={ImageNotFound}
            alt="movie img"
          />
        )}
        <h1>{props.title}</h1>
        <p>
          <i className="material-icons">star</i>
          {props.avg}
        </p>
      </StyledCard>
    </div>
  );
};

export default withRouter(MovieCard);
