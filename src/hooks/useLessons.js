import { useState, useEffect } from "react";
import API from "../api/axios";

export const useLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/lessons")
      .then((res) => setLessons(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { lessons, loading };
};