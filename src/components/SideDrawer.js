import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink} from "react-router-dom";
import SearchBar from "./SearchBar";
import SideDrawerButton from './SideDrawerButton';

const StyledDrawer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  div:first-of-type{
    align-self:flex-end;
    margin:1rem 1rem 0 0;
  }
  div {
    @media screen and (max-width: 768px) {
      display: block !important;
      order:2;
    }
  }
  ul {
    @media screen and (max-width: 768px) {
      order:3;
    }
    
    margin-bottom:5rem;
    
    li {
      margin-bottom:2rem;
      a {
        font-size: 2rem;
      }
    }
  }
`;

const SideDrawer = (props) => {


  return (
    <StyledDrawer>
      <SideDrawerButton type="fas fa-times" clicked={props.toggleSideDrawer}/>
      <SearchBar submitted={props.submitted} isOpen={props.isOpen}/>
      <ul>
        <li>
          <NavLink to={process.env.PUBLIC_URL + '/movies'}>Filmy</NavLink>
        </li>
        <li>
          <NavLink to={process.env.PUBLIC_URL + '/series'}>Seriale</NavLink>
        </li>
      </ul>
    </StyledDrawer>
  );
};

export default SideDrawer;
