import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../../App";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

const StyledForm = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 100%;
  max-width: 40rem;
  border:1px solid #b3b3b3;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  .header {
    padding: 2rem;
    h1 {
      font-size: 2.4rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.4rem;
    }
  }
  .error{
    color:red;
    text-transform:uppercase;
  }
  .body {
    display: flex;
    flex-direction: column;
    input {
      padding: 1rem 1rem;
      margin: 1rem 2rem;
      border:1px solid #b3b3b3;
      border-radius: 0.5rem;
      font-size: 1.6rem;
    }
    button {
      cursor: pointer;
      padding: 1rem 1rem;
      margin: 1rem 2rem;
      color: #fff;
      background-color:#1c1c1c;
      border:1px solid #1c1c1c;
      border-radius: 0.5rem;
      font-size: 1.6rem;
    }
    div {
      font-size: 1.2rem;
      margin: 1rem 2rem;
      p {
        display: inline-block;
        margin: initial;
        cursor: pointer;
        font-size: 1.4rem;
        font-weight: 700;
      }
    }
  }
`;

const Auth = (props) => {
  const [signIn, setSignIn] = useState(true);
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [firstName, setfirstName] = useState("");
  // const [lastName, setLastName] = useState("");

  const register = (e) => {
    e.preventDefault();
    props.onAuth(regEmail, regPassword, true);
  };

  const login = (e) => {
    e.preventDefault();
    props.onAuth(email, password, false);
  };

  let form = (
    <StyledForm onSubmit={(e) => login(e)}>
      <div className="header">
        <h1>Logowanie</h1>
        <h2 className="error">{props.error && props.error}</h2>
      </div>
      <div className="body">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Zaloguj</button>
        <div>
          Nie masz jeszcze konta?{" "}
          <p onClick={() => setSignIn(false)}>rejestracja</p>
        </div>
      </div>
    </StyledForm>
  );
  if (!signIn) {
    form = (
      <StyledForm onSubmit={(e) => register(e)}>
        <div className="header">
          <h1>Rejestracja</h1>
          <p>Wypełnij formularz, aby utworzyć konto</p>
        </div>
        <div className="body">
          {/* <input
            type="text"
            name="firstName"
            placeholder="Imię"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nazwisko"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          /> */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Hasło"
            name="password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
          {/* <input
            type="password"
            placeholder="Potwierdź hasło"
            name="passwordConfirm"
          /> */}
          <button type="submit">Zarejestruj</button>
          <div>
            Masz już konto? <p onClick={() => setSignIn(true)}>Logowanie</p>
          </div>
        </div>
      </StyledForm>
    );
  }
  if (props.isAuthenticated) {
    return <Redirect to={process.env.PUBLIC_URL + props.redirectPath}/>
  }
  return <Container>{form}</Container>;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authenticated,
    userId: state.userId,
    redirectPath: state.redirectPath,
    error: state.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUpMode) => {
      dispatch(actions.auth(email, password, isSignUpMode));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
