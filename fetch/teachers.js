import { useState, useEffect } from "react";

const getTeachers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.jamiatullatif.com/api/teachers`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError("শিক্ষক পরিচিতি লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []); // Adding an empty dependency array

  return { data, loading, error };
};

export default getTeachers;
