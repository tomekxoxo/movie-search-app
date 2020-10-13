import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions/index";

const AccountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
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
    &:hover {
      p {
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
  span {
    margin-left: 0.5rem;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: pointer;
  }
  .drawer {
    position: absolute;
    width: 10rem;
    bottom: -3rem;
    left: 0;
    text-align: center;
    button {
      cursor: pointer;
      width: 10rem;
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      border: 2px solid #eee;
    }
  }
`;

const AccountButton = props => {

  const { history } = props;
  const [drawer, setDrawer] = useState(false);

  const drawerHandler = () => {
    setDrawer((prevState) => !prevState);
  };

  const logoutHandler = () => {
    props.onLogout();
    history.replace(process.env.PUBLIC_URL + "/")
  };

  return (
    <AccountWrapper>
      <NavLink to={process.env.PUBLIC_URL + "/account"} className="account">
        <i className="material-icons">account_circle</i>
        <p>Konto</p>
      </NavLink>
      <span className="material-icons" onClick={drawerHandler}>
        {drawer ? "arrow_circle_up" : "arrow_circle_down"}
      </span>
      {drawer && (
        <div className="drawer">
          <button onClick={logoutHandler}>Wyloguj</button>
        </div>
      )}
    </AccountWrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(actions.authLogout());
    },
  };
};

export default connect(null , mapDispatchToProps)(withRouter(AccountButton));
