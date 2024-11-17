import { useEffect, useState } from "react";

const useGetResultsByYear = (yearId = "66f13d0337317a1fbb7e7ff7") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!yearId) {
      setError("বছরের আইডি প্রয়োজন।");
      setLoading(false);
      return;
    }

    const controller = new AbortController(); // For canceling fetch requests
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.jamiatullatif.com/api/results?yearId=${yearId}`,
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

    // Cleanup on unmount or dependency change
    return () => {
      controller.abort();
    };
  }, [yearId]);

  return { data, loading, error };
};

const useGetResultsByYearAndClass = (
  yearId = "66f13d0337317a1fbb7e7ff7",
  classId
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!yearId || !classId) {
      setError("বছরের আইডি এবং ক্লাস আইডি প্রয়োজন।");
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.jamiatullatif.com/api/results-by-year-and-class?yearId=${yearId}&classId=${classId}`,
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

    // Cleanup on unmount or dependency change
    return () => {
      controller.abort();
    };
  }, [yearId, classId]); // Both yearId and classId as dependencies

  return { data, loading, error };
};

const useGetSingleStudentsResult = (studentId) => {
  const [data, setData] = useState(null); // Single student's result, initially null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) {
      setError("স্টুডেন্টের আইডি প্রয়োজন।");
      setLoading(false);
      return;
    }

    const controller = new AbortController(); // For canceling fetch requests
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.jamiatullatif.com/api/result-by-studentid?studentId=${studentId}`,
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

    // Cleanup on unmount or dependency change
    return () => {
      controller.abort();
    };
  }, [studentId]); // Dependency on studentId

  return { data, loading, error };
};

export {
  useGetResultsByYear,
  useGetResultsByYearAndClass,
  useGetSingleStudentsResult,
};
