import React, { useState, useEffect } from "react";
import NavBar from "./components/Navigation/NavBar";
import styled from "styled-components";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Films from "./components/Movies/Films";
import Series from "./components/Series/Series";
import Auth from "./components/Auth/Auth";
import People from "./components/People/People";
import MovieDetail from "./components/Movies/MovieDetail";
import SeriesDetail from "./components/Series/SeriesDetail";
import SearchMovie from "./components/Movies/SearchMovie";
import SearchTv from "./components/Series/SearchTv";
import SideDrawer from "./components/Navigation/SideDrawer";
import Main from "./components/MainPage/Main";
import Account from "./components/Account/Account";
import { connect } from "react-redux";

export const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 1rem;
  margin-top: 10rem;
`;

const API_KEY = "5164c32e4ce67e20eb6052f1f8215c14";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

function App(props) {
  const [searchTitle, setSearchTitle] = useState("");
  const [sideDrawer, setSideDrawer] = useState(false);
  let location = useLocation();

  useEffect(() => {
    setSideDrawer();
  }, [location]);

  const submitTitleHandler = (title) => {
    setSearchTitle(title);
  };

  const toggledSideDrawerHandler = () => {
    setSideDrawer((prevState) => !prevState);
  };

  return (
    <div>
      <NavBar
        submitted={submitTitleHandler}
        toggleSideDrawer={toggledSideDrawerHandler}
      />
      {sideDrawer && (
        <SideDrawer
          submitted={submitTitleHandler}
          toggleSideDrawer={toggledSideDrawerHandler}
          isOpen={sideDrawer}
        />
      )}
      <Container>
        <Switch>
          <Route path={process.env.PUBLIC_URL + "/"} exact component={Main} />
          <Route
            path={process.env.PUBLIC_URL + "/auth"}
            exact
            component={Auth}
          />
          {props.isAuthenticated && (
            <Route
              path={process.env.PUBLIC_URL + "/account"}
              exact
              component={Account}
            />
          )}

          <Route
            path={process.env.PUBLIC_URL + "/movies"}
            exact
            component={Films}
          />
          <Route
            path={process.env.PUBLIC_URL + "/movies/:id"}
            exact
            component={MovieDetail}
          />
          <Route
            path={process.env.PUBLIC_URL + "/series"}
            exact
            component={Series}
          />
          <Route
            path={process.env.PUBLIC_URL + "/series/:id"}
            exact
            component={SeriesDetail}
          />
          <Route
            path={process.env.PUBLIC_URL + "/series/search/tv/:id"}
            exact
            component={SearchTv}
          />
          <Route
            path={process.env.PUBLIC_URL + "/movies/search/movies/:id"}
            exact
            component={SearchMovie}
          />
          <Route
            path={process.env.PUBLIC_URL + "/people/:id"}
            exact
            component={People}
          />
          <Route render={() => <h1>Page not Found</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authenticated,
  };
};

export default connect(mapStateToProps)(App);
export { API_KEY, IMG_PATH };
