import React, { useState, useEffect} from "react";
import NavBar from "./components/NavBar";
import styled from "styled-components";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Films from "./components/Films";
import Series from "./components/Series";
import MovieDetail from "./components/MovieDetail";
import SeriesDetail from "./components/SeriesDetail";
import SearchMovie from "./components/SearchMovie";
import SearchTv from "./components/SearchTv";
import SideDrawer from './components/SideDrawer';

export const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 1rem;
  margin-top:10rem;
`;

const API_KEY = "5164c32e4ce67e20eb6052f1f8215c14";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

function App() {

  const [searchTitle, setSearchTitle] = useState('');
  const [sideDrawer, setSideDrawer] = useState(false);
  let location = useLocation();

  useEffect(() => {
    setSideDrawer()
  },[location])
  

  // id gatunkow filmow = https://api.themoviedb.org/3/genre/movie/list?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl

  //id gatunkow seriali https://api.themoviedb.org/3/genre/tv/list?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl

  // po słowie = https://api.themoviedb.org/3/search/movie?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl&query=titanic&page=1&include_adult=false

  const submitTitleHandler = (title) => {
    setSearchTitle(title);
  };

  const toggledSideDrawerHandler = () => {
    setSideDrawer(prevState => !prevState)
  }

  

  return (
    <div>
      <NavBar submitted={submitTitleHandler} toggleSideDrawer={toggledSideDrawerHandler}/>
      {sideDrawer && <SideDrawer submitted={submitTitleHandler} toggleSideDrawer={toggledSideDrawerHandler} isOpen={sideDrawer}/>}
      <Switch>
        <Container>
          <Route path="/" exact>
            <Redirect to="/movies" />
          </Route>
          <Route path="/movies" exact component={Films} />
          <Route path="/movies/:id" exact component={MovieDetail} />
          <Route path="/series" exact component={Series} />
          <Route path="/series/:id" exact component={SeriesDetail} />
          <Route path="/series/search/tv/:id" exact component={SearchTv} />
          <Route path="/movies/search/movies/:id" exact component={SearchMovie} />
        </Container>
      </Switch>
    </div>
  );
}

export default App;
export { API_KEY, IMG_PATH };
