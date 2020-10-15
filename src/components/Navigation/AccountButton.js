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
  span {
    margin-left: 0.5rem;
    border-radius: 5px;
    padding: 0.8rem;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
      @media screen and (max-width: 767px) {
        background-color: initial;
      }
    }
  }
  .triangle {
    border: solid #000;
    border-radius: 2px;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(${(props) => (props.open ? "-135deg" : "45deg")});
    -webkit-transform: rotate(${(props) => (props.open ? "-135deg" : "45deg")});
    /* transform-origin: 3px 3px; */
    /* transform: rotate3d(1,0,0,0deg); */
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`;

const AccountButton = (props) => {
  const { history } = props;
  const [drawer, setDrawer] = useState(false);

  const drawerHandler = () => {
    setDrawer((prevState) => !prevState);
  };

  const logoutHandler = () => {
    props.onLogout();
    history.replace(process.env.PUBLIC_URL + "/");
  };

  return (
    <AccountWrapper open={drawer}>
      <NavLink to={process.env.PUBLIC_URL + "/account"} className="account">
        <i className="material-icons">account_circle</i>
        <p>Konto</p>
      </NavLink>
      <span onClick={drawerHandler}>
        <p className="triangle"></p>
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

export default connect(null, mapDispatchToProps)(withRouter(AccountButton));
