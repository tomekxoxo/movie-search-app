import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 1.4rem;
  padding: 0.5rem 1rem;
  margin:2rem 0 0 0 ;
  display:flex;
  align-items:center;
  cursor:pointer;
  background-color:transparent;
  border:1px solid black;
  border-radius:5px;
  &:hover, &:focus{
      i{
        color:#cfb53b;
      }
    }
  i{
    margin-right:1rem;
  }
`;

const ButtonWatchList = (props) => {
  return (
    <StyledButton onClick={props.addMovie}>
      <i className="material-icons">remove_red_eye</i>
      Chce obejrzeć
    </StyledButton>
  );
};

export default ButtonWatchList;
