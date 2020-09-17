import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/images/tmdb.svg";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  padding: 1rem 0.5rem;
  font-size: 1.5rem;
  background-color: transparent;
  border-bottom: 2px solid black;
`;

const StyledList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  li {
    margin: 0 2rem;
    a {
      font-size: 1.4rem;
      color: black;
    }
  }
`;
const LogoWrapper = styled.a`
  width:12rem;
  margin-top:1rem;
  img{
    width:100%;
    color:purple;
  }
`;

const NavBar = ({ submitted }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    submitted(inputValue);
  }, [inputValue]);

  return (
    <StyledHeader>
      <LogoWrapper href="">
        <img src={logo} alt="api provider logo"/>
      </LogoWrapper>

      <StyledList>
        <li>
          <a href="">Popularne</a>
        </li>
        <li>
          <a href="">Filmy</a>
        </li>
        <li>
          <a href="">Seriale</a>
        </li>
        <li>
          <a href="">Gatunki</a>
        </li>
      </StyledList>
      <StyledInput
        type="text"
        placeholder="Type Movie Title..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </StyledHeader>
  );
};

export default NavBar;
