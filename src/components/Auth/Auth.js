import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Container from "../common/Container";

const StyledForm = styled.form`
  margin: auto;
  margin-top: 15rem;
  width: 100%;
  max-width: 40rem;
  border: 1px solid #b3b3b3;
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
  .error {
    color: red;
    text-transform: uppercase;
  }
  .body {
    display: flex;
    flex-direction: column;
    input {
      padding: 1rem 1rem;
      margin: 1rem 2rem;
      border: 1px solid #b3b3b3;
      border-radius: 0.5rem;
      font-size: 1.6rem;
    }
    button {
      cursor: pointer;
      padding: 1rem 1rem;
      margin: 1rem 2rem;
      color: #fff;
      background-color: #1c1c1c;
      border: 1px solid #1c1c1c;
      border-radius: 0.5rem;
      font-size: 1.6rem;
      &:focus {
        transform: scale(1.05);
      }
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
  const [regPasswordConfirm, setRegPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    switch (props.error) {
      case "EMAIL_EXISTS":
        setRegError("email już istnieje");
        clearError();
        break;
      case "OPERATION_NOT_ALLOWED":
        setRegError("operacja niedozwolona");
        clearError();
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
        setRegError("za dużo prób, spróbuj ponownie później...");
        setLoginError("za dużo prób, spróbuj ponownie później...");
        clearError();
        break;
      case "EMAIL_NOT_FOUND":
        setLoginError("email nie znaleziony");
        clearError();
        break;
      case "INVALID_PASSWORD":
        setLoginError("hasło nieprawidłowe");
        clearError();
        break;
      case "USER_DISABLED":
        setLoginError("konto wyłączone przez administratora");
        clearError();
        break;
      default:
        setLoginError(props.error);
        setRegError(props.error);
        clearError();
    }
  }, [props.error]);

  const clearError = () => {
    setTimeout(() => {
      setRegError("");
      setLoginError("");
    }, 3000);
  };

  const checkLoginPassword = () => {
    if (password.length >= 6) {
      props.onAuth(email, password, false);
    } else {
      setLoginError("hasło musi mieć przynajmniej 6 znaków");
      clearError();
    }
  };

  const checkRegPasswords = () => {
    if (regPassword == regPasswordConfirm) {
      if (regPassword.length >= 6) {
        props.onAuth(regEmail, regPassword, true);
      } else {
        setRegError("hasło musi mieć przynajmniej 6 znaków");
        clearError();
      }
    } else {
      setRegError("hasła nie są takie same");
      clearError();
    }
  };

  const register = (e) => {
    e.preventDefault();
    checkRegPasswords();
  };

  const login = (e) => {
    e.preventDefault();
    checkLoginPassword();
  };

  let form = (
    <StyledForm onSubmit={(e) => login(e)}>
      <div className="header">
        <h1>Logowanie</h1>
        <h2 className="error">{loginError}</h2>
      </div>
      <div className="body">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <input
          type="password"
          placeholder="Hasło"
          name="password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Zaloguj</button>
        <div>
          Nie masz jeszcze konta?{" "}
          <p onClick={() => setSignIn(false)} tabIndex={0}>
            rejestracja
          </p>
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
          <h2 className="error">{regError}</h2>
        </div>
        <div className="body">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required={true}
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Hasło"
            name="password"
            required={true}
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Potwierdź hasło"
            name="passwordConfirm"
            value={regPasswordConfirm}
            onChange={(e) => setRegPasswordConfirm(e.target.value)}
          />
          <button type="submit">Zarejestruj</button>
          <div>
            Masz już konto?{" "}
            <p onClick={() => setSignIn(true)} tabIndex={0}>
              Logowanie
            </p>
          </div>
        </div>
      </StyledForm>
    );
  }
  if (props.isAuthenticated) {
    return <Redirect to={process.env.PUBLIC_URL + props.redirectPath} />;
  }
  return (
    <div>
      <Container>{form}</Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authenticated,
    userId: state.userId,
    redirectPath: state.redirectPath,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUpMode) => {
      dispatch(actions.auth(email, password, isSignUpMode));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
