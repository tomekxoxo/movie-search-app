import React, { useState, useEffect} from "react";
import NavBar from "./components/NavBar";
import styled from "styled-components";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Films from "./components/Films";
import Series from "./components/Series";
import Auth from "./components/Auth";
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
          <Route path={process.env.PUBLIC_URL + '/'} exact>
            <Redirect to={process.env.PUBLIC_URL + '/movies'} />
          </Route>
          <Route path={process.env.PUBLIC_URL + '/auth'} exact component={Auth} />
          <Route path={process.env.PUBLIC_URL + '/movies'} exact component={Films} />
          <Route path={process.env.PUBLIC_URL + "/movies/:id"} exact component={MovieDetail} />
          <Route path={process.env.PUBLIC_URL + "/series"} exact component={Series} />
          <Route path={process.env.PUBLIC_URL + "/series/:id"} exact component={SeriesDetail} />
          <Route path={process.env.PUBLIC_URL + "/series/search/tv/:id"} exact component={SearchTv} />
          <Route path={process.env.PUBLIC_URL + "/movies/search/movies/:id"} exact component={SearchMovie} />
        </Container>
      </Switch>
    </div>
  );
}

export default App;
export { API_KEY, IMG_PATH };
