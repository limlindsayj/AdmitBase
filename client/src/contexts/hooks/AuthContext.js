import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:3001/login/check-session", { withCredentials: true });
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
          setCurrentUser(response.data.user);
        } else {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setCurrentUser(null);
        console.error('Session check error:', err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
