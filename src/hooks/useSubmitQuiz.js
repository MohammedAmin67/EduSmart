import API from "../api/axios";

export const useSubmitQuiz = () => {
  const submitQuiz = async ({ lessonId, score, xpEarned }) => {
    await API.post("/progress", { lessonId, score, xpEarned });
  };
  return submitQuiz;
};