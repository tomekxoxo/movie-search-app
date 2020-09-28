import React from 'react';
import MovieSwiper from '../Swiper/CastSwiper';

const Main = () => {
  return (
    <div>
      <h1>W kinach</h1>
      <MovieSwiper type="theatre"/>
      <h1>Najlepiej oceniane</h1>
      <MovieSwiper type="toprated"/>
      <h1>Popularne</h1>
      <MovieSwiper type="popular"/>
      <h1>Nadchodzące</h1>
      <MovieSwiper type="upcoming"/>
    </div>
  );
};

export default Main;