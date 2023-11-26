import React, { createContext, useContext, useState } from 'react';

// Create a context with an initial value (in this case, an empty string)
const UserContext = createContext('');

// Create a custom hook to consume the context
export const useUserContext = () => useContext(UserContext);

// Create a provider component that will wrap your app and provide the context value
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  // You can add other functions or states related to the user here
  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
};
