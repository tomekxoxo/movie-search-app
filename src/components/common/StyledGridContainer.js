import styled from "styled-components";

const StyledGridContainer = styled.div`
  margin-bottom: 5rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

export default StyledGridContainer