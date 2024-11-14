import { useState, useEffect } from "react";

const getArticles = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://www.jamiatullatif.com/api/articles"
        );
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getData();
  }, []);

  return data;
};

export default getArticles;
