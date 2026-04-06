import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Check localStorage on reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  
// ✅ Login function
const login = (userData) => {
  const cleanUser = { email: userData.email, token: userData.token }; // sirf useful cheez rakho
  setUser(cleanUser);
  localStorage.setItem("user", JSON.stringify(cleanUser)); // save user
};


  // ✅ Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
