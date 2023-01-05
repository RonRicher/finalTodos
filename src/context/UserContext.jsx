
import React, { useState, createContext, useContext } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [userNum, setUserNum] = useState(null);

  return (
    <UserContext.Provider value={{ userNum, setUserNum }}>
      {children}
    </UserContext.Provider>
  );
}
