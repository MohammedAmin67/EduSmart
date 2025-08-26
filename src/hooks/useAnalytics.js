import { useState, useEffect } from "react";
import API from "../api/axios";

export const useUserAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  useEffect(() => {
    API.get("/progress/analytics").then((res) => setAnalytics(res.data));
  }, []);
  return analytics;
};

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    API.get("/progress/leaderboard").then((res) => setLeaderboard(res.data));
  }, []);
  return leaderboard;
};