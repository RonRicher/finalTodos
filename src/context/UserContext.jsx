//make a context called LanguageContext and a context provider component.
//the context should control the language of the website

//the values that are provided to the context should be: language, toggleLanguage
// create functions in the context provider the toggle the language
// the language should be Hebrew or English

import React, { useState, createContext, useContext } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
