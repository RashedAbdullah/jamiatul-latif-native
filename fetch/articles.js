import { useState, useEffect } from "react";

const useGetArticles = (limit = 0) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.jamiatullatif.com/api/articles?limit=${limit}`,
          { signal }
        );

        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }

        const result = await response.json();

        if (result?.data && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          // Ignore abort errors
          setError(
            `নিবন্ধগুলি লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন। (${err.message})`
          );
          console.error("Error fetching articles:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    getData();

    return () => controller.abort();
  }, [limit]);

  return { data, loading, error };
};

const useGetSingleArticle = (articleId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!articleId) {
      setError("প্রবন্ধ আইডি প্রয়োজন।");
      setLoading(false);
      return;
    }

    const controller = new AbortController(); // For canceling fetch requests
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.jamiatullatif.com/api/single-article?articleId=${articleId}`,
          { signal: controller.signal }
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
          return;
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
      controller.abort();
    };
  }, [articleId]);

  return { data, loading, error };
};

export { useGetArticles, useGetSingleArticle };
