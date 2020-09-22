import React from "react";
import styled from "styled-components";

const StyledBtn = styled.div`
  font-size: 3.5rem;
  cursor:pointer;
  order:3;
  @media screen and (min-width: 768px){
    display:none;
  }
`;

const SideDrawerButton = ({ type, clicked }) => {
  return (
    <StyledBtn onClick={clicked}>
      <i className={type}></i>
    </StyledBtn>
  );
};

export default SideDrawerButton;
