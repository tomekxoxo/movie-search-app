import React, { useState, useEffect } from "react";
import { API_KEY, IMG_PATH } from "../../App";
import { useParams } from "react-router-dom";
import Loader from "../UI/Loader";
import StyledWrapper from "../common/StyledWrapper";
import CastSwiper from '../Swiper/CastSwiper';

const People = (props) => {
  let { id } = useParams();
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=pl`
    )
      .then((data) => data.json())
      .then((res) => {
        setLoader(false);
        console.log(res);
        setData(res);
      })
      .catch((err) => err);
  }, [id]);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  if (loader) {
    return <Loader />;
  } else {
    return (
      <React.Fragment>
        <StyledWrapper>
          <img src={`${IMG_PATH}${data.profile_path}`}></img>
          <div className="info">
            <h1>{data.name}</h1>
            <p className="rating" style={{ color: "black", fontSize:'2.4rem' }}>
              data urodzenia:
              {' '+data.birthday}
            </p>
            <p className="rating" style={{ color: "black", fontSize:'2.4rem' }}>
              miejsce urodzenia:
              {' '+data.place_of_birth}
            </p>
            <p className="rating">
              wiek: {getAge(data.birthday)}
            </p>
            <p className="rating">
              {data.deathday && 'śmierć:'} {data.deathday}    
            </p>
            <p>{data.biography}</p>
          </div>
        </StyledWrapper>
        <CastSwiper id={id} type="person"/>
      </React.Fragment>
    );
  }
};

export default People;
