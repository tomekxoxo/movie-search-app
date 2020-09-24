import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Lazy,
} from "swiper";
import "./CastSwiper.css";
import styled from "styled-components";
import { API_KEY, IMG_PATH } from "../../App";
import ImageNotFound from "../../assets/images/image-not-found.png";

const SwiperContainer = styled.div`
  margin: 2rem 0;
  img {
    width: 150px;
    object-fit: contain;
    height: auto;
  }
  p {
    text-align: center;
    font-size: 1.4rem;
    margin-top: 0.5rem;
  }
  .name {
  }
  .character {
    color: #939393;
  }
`;

const ActorLink = styled(Link)``;

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Lazy]);

const CastSwiper = (props) => {
  const [cast, setCast] = useState([]);

  

  let url = `https://api.themoviedb.org/3/${props.type}/${props.id}/credits?api_key=${API_KEY}&language=pl`;
  if (props.type === 'person') {
    url = `https://api.themoviedb.org/3/person/${props.id}/combined_credits?api_key=${API_KEY}&language=pl`;
  }

  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((res) => {
        setCast(res.cast);
      })
      .catch((err) => err);
  }, [props.id, props.type]);

  let castArr = cast.map((castMember) => {
    if (props.type !== 'person') {
      return (
        <SwiperSlide key={castMember.id}>
          <ActorLink to={process.env.PUBLIC_URL + '/people/' + castMember.id}>
            {castMember.profile_path ? (
              <img src={IMG_PATH + castMember.profile_path} alt="actor-img" />
            ) : (
              <img src={ImageNotFound} alt="img-not-found" />
            )}
            <div>
              <p className="name">{castMember.name}</p>
              <p className="character">{castMember.character}</p>
            </div>
          </ActorLink>
        </SwiperSlide>
      );
    }
    else {
      let mediaType = castMember.media_type;
      if (mediaType === 'tv') {
        mediaType = 'series'
      }
      else {
        mediaType = 'movies'
        
      }
      return (
        <SwiperSlide key={castMember.credit_id}>
          <ActorLink to={process.env.PUBLIC_URL + `/${mediaType}/` + castMember.id}>
            {castMember.poster_path ? (
              <img src={IMG_PATH + castMember.poster_path} alt="actor-img" />
            ) : (
              <img src={ImageNotFound} alt="img-not-found" />
            )}
            <div>
              <p className="name">{castMember.title?castMember.title:castMember.name} ({castMember.release_date&&new Date(castMember.release_date).getUTCFullYear()})</p>
              <p className="character">{castMember.character}</p>
            </div>
          </ActorLink>
        </SwiperSlide>
      );
    }
  });

  return (
    <SwiperContainer>
      <Swiper
        className="swiper-custom"
        spaceBetween={50}
        slidesPerView={6}
        scrollbar={{ draggable: true }}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetweenSlides: 5,
          },
          480: {
            slidesPerView: 3,
            spaceBetweenSlides: 15,
          },
          610: {
            slidesPerView: 4,
            spaceBetweenSlides: 25,
          },
          768: {
            slidesPerView: 5,
            spaceBetweenSlides: 25,
          },
          900: {
            slidesPerView: 6,
            spaceBetweenSlides: 50,
          },
        }}
      >
        {castArr}
      </Swiper>
    </SwiperContainer>
  );
};

export default CastSwiper;