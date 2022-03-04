import { useContext, useEffect } from "react";
import UserLogin from "../users/UserLogin";
import LoginContext from "../../context/login/LoginContext";

function Dashboard() {
  const { user } = useContext(LoginContext);

  if (!user) {
    <UserLogin />;
  }

  return (
    <div className='relative min-h-screen w-full '>
      <h1>Dashboard right here</h1>
    </div>
  );
}

export default Dashboard;
