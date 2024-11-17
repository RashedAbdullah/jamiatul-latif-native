import { useState, useEffect } from "react";

const useGetYears = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // AbortController for cleanup
    const signal = controller.signal;

    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.jamiatullatif.com/api/years`,
          {
            signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Server error: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        if (!result?.data) {
          throw new Error("Invalid response structure from server.");
        }

        setData(result.data);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
          return; // Exit gracefully if the fetch is aborted
        }
        setError(
          err.message === "Failed to fetch"
            ? "সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে।"
            : err.message
        );
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();

    return () => {
      controller.abort(); // Cleanup fetch if component unmounts
    };
  }, []);

  return { data, loading, error };
};

export { useGetYears };
