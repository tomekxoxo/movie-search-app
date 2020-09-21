import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledInput = styled.input`
  outline: none;
  border: none;
  padding: 1rem 0.5rem;
  font-size: 1.5rem;
  background-color: transparent;
  border-bottom: 2px solid black;
`;

const StyledList = styled.div`
  display: ${(props) => (!props.isEmpty ? "none" : "block")};
  position: absolute;
  background-color: rgba(255,255,255,.96);
  width: 100%;
  max-height:300px;
  overflow-y:scroll;
  color: black;
  font-size: 1.4rem;

  ul {
    li {
      margin: 0.8rem 0;
      padding: 0 0.5rem;
      a {
        width:100%;
        color: black;
        display: block;
        &:hover, &:focus{
        color:white;
        background-color:black;
      
      }
      
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const SearchBar = ({ submitted, isOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [showList, setShowList] = useState(false);
  const didMountRef = useRef(false);
  const isMountedRef = useRef(null);

  useEffect(() => {
    submitted(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (didMountRef.current && inputValue !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=5164c32e4ce67e20eb6052f1f8215c14&language=pl&query=${inputValue}&page=1&include_adult=false`
      )
        .then((data) => data.json())
        .then((res) => {
          setData([]);
          setData(res.results);
        })
        .catch((err) => err);
    } else {
      didMountRef.current = true;
    }
  }, [inputValue]);

  let listItem;
  if (data != undefined) {
    listItem = data.map((element) => {
      let link = "";
      if (element.media_type == "tv") {
        link = `${process.env.PUBLIC_URL}/series/search/tv/${encodeURIComponent(
          element.original_name
        )}`;
      } else {
        link = `${
          process.env.PUBLIC_URL
        }/movies/search/movies/${encodeURIComponent(element.title)}`;
      }

      return (
        <li key={element.id}>
          <Link to={link}>
            {element.title ? element.title : element.original_name}
          </Link>
        </li>
      );
    });
  }

  const renderList = () => {
    if (listItem !== undefined && showList) {
      return listItem;
    }
  };

  const hideListHandler = () => {
    if (!isOpen) {
      setTimeout(() => {
        setShowList(false);
      }, 100);
    }
  };

  return (
    <React.Fragment>
      <InputWrapper>
        <StyledInput
          type="text"
          placeholder="Type Movie Title..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowList(true)}
          onBlur={hideListHandler}
        />
        <StyledList isEmpty={inputValue}>
          <ul>{renderList()}</ul>
        </StyledList>
      </InputWrapper>
    </React.Fragment>
  );
};

export default SearchBar;
