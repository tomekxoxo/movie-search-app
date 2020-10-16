import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 1.4rem;
  outline-color: #cfb53b;
  padding: 0.5rem 1rem;
  margin: 2rem 0 0 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 5px;
  &:hover,
  &:focus,
  &::not([DISABLED]) {
    cursor: default;

    i {
      color: #cfb53b;
    }
  }
  &:disabled {
    border: none;
  }
  i {
    margin-right: 1rem;
  }
`;

const ButtonWatchList = (props) => {
  return (
    <StyledButton onClick={props.addMovie} disabled={props.disable}>
      <i className="material-icons">remove_red_eye</i>
      {props.text}
    </StyledButton>
  );
};

export default ButtonWatchList;
