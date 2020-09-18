import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";
import Films from "./components/Films";
import Series from "./components/Series";
import MovieDetail from "./components/MovieDetail";
import SeriesDetail from "./components/SeriesDetail";

export const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const API_KEY = "5164c32e4ce67e20eb6052f1f8215c14";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

function App() {
  // popularne filmy = https://api.themoviedb.org/3/discover/movie?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl&sort_by=popularity.desc&include_adult=false&include_video=false&page=1

  //popularne seriale = https://api.themoviedb.org/3/discover/tv?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false

  // id gatunkow filmow = https://api.themoviedb.org/3/genre/movie/list?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl

  //id gatunkow seriali https://api.themoviedb.org/3/genre/tv/list?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl

  // po słowie = https://api.themoviedb.org/3/search/movie?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl&query=titanic&page=1&include_adult=false

  const submitTitleHandler = (title) => {
    console.log(title);
  };

  return (
    <div>
      <NavBar submitted={submitTitleHandler} />
      <Switch>
        <Container>
          <Route path="/" exact>
            <Redirect to="/movies" />
          </Route>
          <Route path="/movies" exact component={Films} />
          <Route path="/movies/:id" exact component={MovieDetail} />
          <Route path="/series" exact component={Series} />
          <Route path="/series/:id" exact component={SeriesDetail} />
        </Container>
      </Switch>
    </div>
  );
}

export default App;
export { API_KEY, IMG_PATH };
