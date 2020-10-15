import React from "react";
import MovieSwiper from "../Swiper/CastSwiper";
import Footer from "../footer/Footer";
import Container from "../common/Container";

const Main = () => {
  return (
    <div>
      <Container>
        <h1>W kinach</h1>
        <MovieSwiper type="theatre" />
        <h1>Najlepiej oceniane</h1>
        <MovieSwiper type="toprated" />
        <h1>Popularne</h1>
        <MovieSwiper type="popular" />
        <h1>Nadchodzące</h1>
        <MovieSwiper type="upcoming" />
      </Container>
      <Footer />
    </div>
  );
};

export default Main;
