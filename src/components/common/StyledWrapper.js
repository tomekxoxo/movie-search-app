import styled from "styled-components";

const StyledWrapper = styled.div`
  margin-top: 10rem;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    img {
      object-fit: contain;
      width: 100%;
      height: auto;
    }
    .info {
      padding-top: 5rem;
      width: 100%;
      padding-bottom: 5rem;
      h1 {
        text-align: center;
      }
    }
  }
  div {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      padding: 0 2rem;
      font-size: 2.5rem;
    }
    .rating {
      display: flex;
      align-items: center;
      color: #cfb53b;
      font-size: 3rem;
      i {
        font-size: 3rem;
        top: 1rem;
        left: 1rem;
      }
    }
    .release-date{
      i{
        margin-right:1rem;
      }
    }
    p {
      font-size: 2rem;
      padding: 2rem 2rem 0;
    }
    .genres {
      flex-wrap: wrap;
      margin-top: 1rem;
      font-weight: normal;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      p {
        padding: 0.5rem 1rem;
        margin: 1rem 1rem 0 0;
        margin-right: 1rem;
        background-color: #cfb53b;
        border-radius: 10px;
      }
    }
    .seasons {
      margin-top: 1rem;
      font-weight: normal;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      p {
        margin-top: 1rem;
        margin-right: 1rem;
        padding: 0.5rem 1rem;
        border: 1px solid #cccccc;
        border-radius: 2px;
        font-weight: normal;
      }
    }
  }
`;

export default StyledWrapper;
