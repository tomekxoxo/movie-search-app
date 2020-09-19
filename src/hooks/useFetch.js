import { useState, useEffect, useRef } from "react";

const useFetch = (url,arr) => {
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState([]);

  useEffect(() => {

      fetch(url)
      .then((data) => data.json())
      .then((res) => {
        setData((prevMovies) => [...prevMovies, ...res.results]);
        setLastPage(res.total_pages);
      })
      .catch((err) => err);    
  }, arr);
  return [data, lastPage];
};

export default useFetch;
