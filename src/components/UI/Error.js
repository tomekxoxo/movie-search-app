import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledError = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 20000;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    transform:translateX(-50%);
    background-color: #fff;
    width: 20rem;
    height: 20rem;
    border: none;
    border-radius: 1rem;
    box-shadow: 2px 2px 5px #000;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    font-size:1.5rem;
    font-weight:700;
    .reload {
      border:none;
      background-color:transparent;
      cursor:pointer;
      transition: 1.4s ease-in-out ;
      &:hover{
        transform:rotate(1440deg);
      }
      i {
        font-size: 3rem;
        color: black;
      }
    }
    .error{
      color:red;
    }
  }
`;

const Error = (props) => {

  const reloadPagehandler = () => {
    window.location.replace(process.env.PUBLIC_URL + "/");
  }

  return ReactDOM.createPortal(
    <StyledError>
      <div className="modal">
        <p className="error">{props.apiError}</p>
        <p>Reload Page</p>
        <button className="reload" onClick={reloadPagehandler}>
          <i className="fas fa-sync"></i>
        </button>
      </div>
    </StyledError>,
    document.getElementById("portal")
  );
};

const mapStateToProps = (state) => {
  return {
    apiError: state.apiError,
  };
};

export default connect(mapStateToProps, null)(Error);
