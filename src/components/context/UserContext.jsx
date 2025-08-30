import React, { createContext, useContext, useState } from "react";
import { userData as mockUserData } from "../../data/mockData";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    ...mockUserData,
    avatar: typeof mockUserData.avatar === "string" ? mockUserData.avatar : ""
  });

  const updateAvatar = (avatarUrl) => {
    setUser((prev) => ({
      ...prev,
      avatar: avatarUrl
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);