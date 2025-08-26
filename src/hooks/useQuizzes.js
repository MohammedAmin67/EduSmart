import { useState, useEffect } from "react";
import API from "../api/axios";

export const useQuizzes = (lessonId) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lessonId) return;
    API.get(`/quizzes?lesson=${lessonId}`)
      .then((res) => setQuizzes(res.data))
      .finally(() => setLoading(false));
  }, [lessonId]);

  return { quizzes, loading };
};