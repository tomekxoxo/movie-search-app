import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  background-color:#eee;
  padding:0 1rem;
`;

function App() {


  // popularne filmy = https://api.themoviedb.org/3/discover/movie?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl&sort_by=popularity.desc&include_adult=false&include_video=false&page=1

  //popularne seriale = https://api.themoviedb.org/3/discover/tv?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false

  // id gatunkow filmow = https://api.themoviedb.org/3/genre/movie/list?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl
  
  //id gatunkow seriali https://api.themoviedb.org/3/genre/tv/list?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl

  // po słowie = https://api.themoviedb.org/3/search/movie?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl&query=titanic&page=1&include_adult=false

  const submitTitleHandler = (title) => {
    console.log(title);
  }
  
  return (
    <div>
      <Container>
        <NavBar submitted={submitTitleHandler}/>
      </Container>
    </div>
  );
}

export default App;
