// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create context
const UserContext = createContext();

// Create provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // This should hold the logged-in user data, including email

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context
export const useUser = () => {
  return useContext(UserContext);
};