import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/images/tmdb.svg";
import { NavLink, Link } from "react-router-dom";
import { Container } from "../App";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index:200;
  background-color:rgba(255,255,255,0.97)
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
      &:hover {
        border-bottom: 2px solid black;
      }
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
  .active {
    font-weight: 700;
    border-bottom: 2px solid black;
  }
`;
const LogoWrapper = styled(Link)`
  width: 12rem;
  margin-top: 1rem;
  img {
    width: 100%;
    color: purple;
  }
`;

const NavBar = ({ submitted }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    submitted(inputValue);
  }, [inputValue]);

  return (
    <FixedHeader>
      <Container>
        <StyledHeader>
          <LogoWrapper to="/">
            <img src={logo} alt="api provider logo" />
          </LogoWrapper>

          <StyledList>
            <li>
              <NavLink to="/movies">Filmy</NavLink>
            </li>
            <li>
              <NavLink to="/series">Seriale</NavLink>
            </li>
            <li>
              <NavLink to="/genres">Gatunki</NavLink>
            </li>
          </StyledList>
          <StyledInput
            type="text"
            placeholder="Type Movie Title..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </StyledHeader>
      </Container>
    </FixedHeader>
  );
};

export default NavBar;
