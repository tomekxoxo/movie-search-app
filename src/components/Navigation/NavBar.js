import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/tmdb.svg";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SIdeDrawerButton from "./SideDrawerButton";
import LoginImg from "../../assets/images/login.png";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .login {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    img {
      width: 3rem;
      margin-right: 0.5rem;
    }
  }
  @media screen and (max-width: 767px) {
    .login {
      order: 2;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 200;
  background-color: rgba(255, 255, 255, 0.97);
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
  @media screen and (max-width: 767px) {
    display: none;
  }
  .active {
    font-weight: 700;
    border-bottom: 2px solid black;
  }
`;
const LogoWrapper = styled(Link)`
  @media screen and (max-width: 767px) {
    order: 1;
  }
  width: 12rem;
  margin-top: 1rem;
  img {
    width: 100%;
    color: purple;
  }
`;

const NavBar = ({ submitted, toggleSideDrawer }) => {
  return (
    <FixedHeader>
      <Container>
        <StyledHeader>
          <LogoWrapper to={process.env.PUBLIC_URL + "/"}>
            <img src={logo} alt="api provider logo" />
          </LogoWrapper>

          <StyledList>
            <li>
              <NavLink to={process.env.PUBLIC_URL + "/movies"}>Filmy</NavLink>
            </li>
            <li>
              <NavLink to={process.env.PUBLIC_URL + "/series"}>Seriale</NavLink>
            </li>
          </StyledList>
          <SIdeDrawerButton type="fas fa-bars" clicked={toggleSideDrawer} />
          <SearchBar submitted={submitted} />
          <NavLink to={process.env.PUBLIC_URL + "/auth"} className="login">
            <img src={LoginImg} alt="login img" />
            <p>Zaloguj się</p>
          </NavLink>
        </StyledHeader>
      </Container>
    </FixedHeader>
  );
};

export default NavBar;
