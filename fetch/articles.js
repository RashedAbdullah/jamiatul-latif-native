import { useState, useEffect } from "react";

const getFatwas = (limit = 0) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        const response = await fetch(
          `https://www.jamiatullatif.com/api/articles?limit=${limit}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError("নিবন্ধগুলি লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [limit]);

  return { data, loading, error };
};

export default getFatwas;
