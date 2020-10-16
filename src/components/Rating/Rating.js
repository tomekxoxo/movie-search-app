import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import ButtonWatchList from "../UI/ButtonWatchList";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions/index";

const RatingComponent = styled.div`
  margin-top: 1rem;
  background-color: #eee;
  border-radius: 5px;
  width: 100% !important;
  max-width: 30rem;
  height: 200px;
  .user-score {
    width: 100%;
    font-size: 1.5rem;
    display: flex;
  }
`;

const labels = {
  1: "Nieporozumienie",
  2: "Bardzo zły",
  3: "Słaby",
  4: "Ujdzie",
  5: "Średni",
  6: "Niezły",
  7: "Dobry",
  8: "Bardzo dobry",
  9: "Rewelacyjny",
  10: "Arcydzieło",
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  label: {
    transform: "scale(1.6)",
    margin: "30px 0",
  },
});

const HoverRating = (props) => {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [buttonMessage, setButtonMessage] = useState("Chcę zobaczyć");
  const [disableButton, setDisableButton] = useState(false);
  const classes = useStyles();

  const disableButtonHandler = () => {
    setButtonMessage("Dodano")
    setDisableButton(true)
  }

  const checkForDuplicatesWatchList = (isMovie, userId, currentMovieId) => {
    let url = `https://movie-search-3d6f7.firebaseio.com/movies/watchlist.json?orderBy="userId"&equalTo="${userId}"`;
    if (!isMovie) {
      url = `https://movie-search-3d6f7.firebaseio.com/series/watchlist.json?orderBy="userId"&equalTo="${userId}"`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let shouldAdd = true;
        for (let key in data) {
          if (currentMovieId === data[key].movieId) {
            disableButtonHandler()
            shouldAdd = false;
          }
        }
        if (shouldAdd) {
          props.onAddToWatchList(
            props.movieId,
            props.isMovie,
            props.userId,
            props.token
          );
          disableButtonHandler()
        } else {
          return;
        }
      });
  };

  const rateMovieHandler = (value) => {
    if (props.isAuthenticated) {
      props.onRate(
        props.movieId,
        props.isMovie,
        value,
        props.userId,
        props.token
      );
    } else {
      props.history.push(process.env.PUBLIC_URL + "/auth");
    }
  };

  const addToWatchListHandler = () => {
    if (props.isAuthenticated) {
      checkForDuplicatesWatchList(props.isMovie, props.userId, props.movieId);
    } else {
      props.history.push(process.env.PUBLIC_URL + "/auth");
    }
  };

  return (
    <RatingComponent>
      <div className={(classes.root, classes.label)}>
        <Rating
          max={10}
          name="hover-feedback"
          value={value}
          precision={1}
          onChange={(event, newValue) => {
            setValue(newValue);
            rateMovieHandler(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
      </div>
      <div className="user-score">
        <span>Moja ocena:</span>
        {value !== null && (
          <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </div>
      <ButtonWatchList addMovie={addToWatchListHandler} text={buttonMessage} disable={disableButton}/>
    </RatingComponent>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authenticated,
    userId: state.userId,
    token: state.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRate: (movieId, isMovie, score, userId, token) => {
      dispatch(actions.rateMovie(movieId, isMovie, score, userId, token));
    },
    onAddToWatchList: (movieId, isMovie, userId, token) => {
      dispatch(actions.addToWatchList(movieId, isMovie, userId, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HoverRating));
