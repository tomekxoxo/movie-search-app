import { useState, useEffect, useRef } from "react";

const useFetchFilter = (url,arr) => {
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState([]);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      fetch(url)
      .then((data) => data.json())
      .then((res) => {
        setData(res.results);
        setLastPage(res.total_pages);
        console.log('witać');
      })
      .catch((err) => err);
    }
    else {
      didMountRef.current = true;
    }
  }, arr);
  return [data];
};

export default useFetchFilter;
