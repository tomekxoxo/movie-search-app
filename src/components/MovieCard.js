import React from "react";
import styled from "styled-components";
import {Link, withRouter} from 'react-router-dom';

const StyledCard = styled(Link)`
  width: 100%;
  height: 45rem;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  &:hover {
    box-shadow: 8px 8px 5px #eee;
    cursor: pointer;
  }

  h1 {
    margin-top: 1rem;
    color:#000;
  }
  img {
    max-width: 100%;
    height: 80%;
    object-fit: cover;
    transition: 0.3s ease;
    overflow: hidden;
    position:relative;
    &:hover {
      transform: scale(1.05);
    }
    &::before{
      position:absolute;
      width:100%;
      height:100%;
      content:'';
      top:0;
      left:0;
      background-color:rgba(0,0,0,.4);
    }
  }
  i {
    color: #cfb53b;
    font-size: 2rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
    -webkit-text-stroke-width: .5px;
    -webkit-text-stroke-color: #fff;
  }
`;

const MovieCard = (props) => {




  return (
    <div>
      <StyledCard to={`${props.isMovie?'movies':'series'}/${props.movieId}`} >
        <img src={props.poster} alt="move img" />
        <h1>{props.title}</h1>
        <i className="fas fa-star">{props.avg}</i>
      </StyledCard>
    </div>
  );
};

export default withRouter(MovieCard);
