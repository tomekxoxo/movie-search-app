import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../App";


const StyledFilter = styled.div`
  /* background-color:purple; */
  text-align: end;
  padding: 2rem 0;

  select {
    border: 2px solid #cccccc;
    padding: 0.5rem 1rem;
    margin-right:-1rem;
    color: #939393;
    font-size: 1.4rem;
    outline: none;
    cursor: pointer;
  }
  select:focus{
    border-color:#cfb53b;
  }
`;

const Filter = ({ change }) => {

  // const [filter, setFilter] = useState('popularity.desc')


  // const handleChange = (e)=> {
  //   setFilter(e.target.value)
  // }

  return (
    <Container>
      <StyledFilter>
        <select onChange={change} >
          <option value="popularity.desc">Popularności: od najwyższej</option>
          <option value="popularity.asc">Popularności: od najniższej</option>
          <option value="vote_average.desc">Średnia ocen: od najwyższej</option>
          <option value="vote_average.asc">Średnia ocen: od najniższej</option>
          <option value="vote_count.asc">Ilość ocen: od najniższej</option>
          <option value="vote_count.desc" >Ilość ocen: od nawyższej</option>
        </select>
      </StyledFilter>
    </Container>
  );
};

export default Filter;
