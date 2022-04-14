import { useContext, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import UserLogin from "../users/UserLogin";
import LoginContext from "../../context/login/LoginContext";

function Dashboard() {
  const { user } = useContext(LoginContext);

  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    <UserLogin />;
  }

  useEffect(() => {
    if (location.pathname === "/admin/dashboard") navigate("general");
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
