import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../App";

const StyledForm = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 100%;
  max-width: 40rem;
  background-color: #eee;
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
  .body {
    display: flex;
    flex-direction: column;
    input {
      padding: 1rem 1rem;
      margin: 1rem 2rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1.6rem;
    }
    button {
      cursor: pointer;
      padding: 1rem 1rem;
      margin: 1rem 2rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1.6rem;
    }
    div {
      font-size: 1.2rem;
      margin: 1rem 2rem;
      p {
        display:inline-block;
        margin: initial;
        cursor: pointer;
        font-size: 1.4rem;
        font-weight: 700;
      }
    }
  }
`;

const Auth = () => {
  const [signIn, setSignIn] = useState(true);

  let form = (
    <StyledForm>
      <div className="header">
        <h1>Logowanie</h1>
      </div>
      <div className="body">
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Hasło" name="password" />
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
      <StyledForm>
        <div className="header">
          <h1>Rejestracja</h1>
          <p>Wypełnij formularz, aby utworzyć konto</p>
        </div>
        <div className="body">
          <input type="text" name="firstName" placeholder="Imię" />
          <input type="text" name="lastName" placeholder="Nazwisko" />
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Hasło" name="password" />
          <input
            type="password"
            placeholder="Potwierdź hasło"
            name="passwordConfirm"
          />
          <button type="submit">Zarejestruj</button>
          <div>
            Masz już konto? <p onClick={() => setSignIn(true)}>Logowanie</p>
          </div>
        </div>
      </StyledForm>
    );
  }

  return <Container>{form}</Container>;
};

export default Auth;
