import { createContext, useState } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Get user from sessionStorage
  const getUser = () => {
    const userString = sessionStorage.getItem("user");
    const userObj = JSON.parse(userString);
    return userObj;
  };

  const [user, setUser] = useState(getUser());

  const saveUser = (usr) => {
    sessionStorage.setItem("user", JSON.stringify(usr));
  };

  // Login
  const userLogin = async (userCredentials) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });
      const data = await response.json();
      setIsLoading(false);
      saveUser(data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al iniciar sesión");
    }
  };

  /*   // Check if user is logged in
  const isUserLoggedIn = () => {
    if ((user !== null) & !isLoading) {
      console.log("Getting here");
      console.log(user);
      console.log(isLoading);
      return true;
    }
    return false;
  }; */

  return (
    <LoginContext.Provider
      value={{
        user,
        setUser,
        userLogin,
        isLoading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
