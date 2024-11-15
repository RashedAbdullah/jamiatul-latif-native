import { useState, useEffect } from "react";

const getNotices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://www.jamiatullatif.com/api/notices`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError("নোটিশ লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};

export default getNotices;
