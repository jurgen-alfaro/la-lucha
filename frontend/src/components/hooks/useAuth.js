import { useState } from "react";

export default function useAuth() {
  const getUser = () => {
    const userString = sessionStorage.getItem("user");
    const userObj = JSON.parse(userString);
    return userObj;
  };

  const [user, setUser] = useState(getUser());

  const saveUser = (usr) => {
    sessionStorage.setItem("user", JSON.stringify(usr));
    setUser(usr);
  };

  return {
    setUser: saveUser,
    user,
  };
}
