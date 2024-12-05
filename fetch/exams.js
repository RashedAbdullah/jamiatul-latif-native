import { useEffect, useState } from "react";

const useGetexams = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.jamiatullatif.com/api/exams`,
          { signal: controller.signal }
        );

        // Check if the response is not ok
        if (!response.ok) {
          throw new Error(
            `Server error: ${response.status} ${response.statusText}`
          );
        }

        // Try to parse the JSON response
        const result = await response.json();

        // Ensure the response contains the expected data structure
        if (!result?.data) {
          throw new Error("Invalid response structure from server.");
        }

        setData(result.data);
      } catch (err) {
        // Handle aborted fetch
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
          return;
        }

        // Handle specific error cases
        let errorMessage = "An unknown error occurred.";

        if (err.name === "TypeError" && err.message === "Failed to fetch") {
          errorMessage = "সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে।"; // Server connection failure in Bangla
        } else if (err.message.includes("NetworkError")) {
          errorMessage =
            "নেটওয়ার্ক ত্রুটি ঘটেছে। দয়া করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।"; // Network error in Bangla
        } else if (err.message.includes("Invalid response structure")) {
          errorMessage = "সার্ভার থেকে অপ্রত্যাশিত ডেটা পাওয়া গেছে।";
        }

        // Set the error state
        setError(errorMessage);

        // Log the error for debugging
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
  }, []);

  return { data, loading, error };
};

export { useGetexams };
