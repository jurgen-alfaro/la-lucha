import { useContext, useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import UserLogin from "../users/UserLogin";
import LoginContext from "../../context/login/LoginContext";

function Dashboard() {
  const { user } = useContext(LoginContext);

  const navigate = useNavigate();

  if (!user) {
    <UserLogin />;
  }

  useEffect(() => {
    navigate("general");
  }, []);

  return (
    <div className='relative max-h-max w-full '>
      <div className='tabs'>
        <NavLink
          to='general'
          className={({ isActive }) =>
            isActive ? "tab tab-lifted tab-active" : "tab tab-lifted"
          }
        >
          General
        </NavLink>
        <NavLink
          to='juntaDirectiva'
          className={({ isActive }) =>
            isActive ? "tab tab-lifted tab-active" : "tab tab-lifted"
          }
        >
          Junta Directiva
        </NavLink>
        <NavLink
          to='users'
          className={({ isActive }) =>
            isActive ? "tab tab-lifted tab-active" : "tab tab-lifted"
          }
        >
          Usuarios del Sistema
        </NavLink>
      </div>
      <div className='rounded-lg p-7 shadow-lg card bg-base-100 border-t-none '>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
