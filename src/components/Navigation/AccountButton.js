import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const AccountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .account {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    img {
      width: 3rem;
      margin-right: 0.5rem;
    }
    i:first-of-type {
      margin-right: 0.5rem;
    }
    i:last-of-type {
      margin-left: 0.5rem;
    }
    &:hover{
      p{
        border-bottom: 2px solid black;
      }
    }
  }
  @media screen and (max-width: 767px) {
    order: 2;
  }
  .active {
    p {
      font-weight: 700;
      border-bottom: 2px solid black;
    }
  }
`;

const Account = () => {
  return (
    <AccountWrapper>
      <NavLink to={process.env.PUBLIC_URL + "/account"} className="account">
        <i className="material-icons">account_circle</i>
        <p>Konto</p>
      </NavLink>
    </AccountWrapper>
  );
};

export default Account;
