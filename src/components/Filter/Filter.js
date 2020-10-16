import React from "react";
import styled from "styled-components";
import Container from "../common/Container";

const StyledFilter = styled.div`
  text-align: end;
  padding: 2rem 0;

  select {
    border: 2px solid #cccccc;
    padding: 0.5rem 1rem;
    margin-right: -1rem;
    color: #939393;
    font-size: 1.4rem;
    outline: none;
    cursor: pointer;
  }
  select:focus {
    border-color: #cfb53b;
  }
`;

const Filter = (props) => {
  return (
    <Container>
      <StyledFilter>
        <select onChange={props.change} defaultValue={props.value}>
          <option value="popularity.desc">Popularność: od najwyższej</option>
          <option value="popularity.asc">Popularność: od najniższej</option>
          <option value="vote_average.desc">Średnia ocen: od najwyższej</option>
          <option value="vote_average.asc">Średnia ocen: od najniższej</option>
          <option value="vote_count.asc">Ilość ocen: od najniższej</option>
          <option value="vote_count.desc">Ilość ocen: od najwyższej</option>
        </select>
      </StyledFilter>
    </Container>
  );
};

export default Filter;
