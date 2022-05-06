import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

function DocsAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin/docs") navigate("informes");
  }, []);

  return (
    <div className='relative max-h-max w-full '>
      <div className='tabs'>
        <NavLink
          to='informes'
          className={({ isActive }) =>
            isActive ? "tab tab-lifted tab-active" : "tab tab-lifted"
          }
        >
          Informes
        </NavLink>
        <NavLink
          to='formularios'
          className={({ isActive }) =>
            isActive ? "tab tab-lifted tab-active" : "tab tab-lifted"
          }
        >
          Formularios
        </NavLink>
        <NavLink
          to='reglamentos'
          className={({ isActive }) =>
            isActive ? "tab tab-lifted tab-active" : "tab tab-lifted"
          }
        >
          Reglamentos
        </NavLink>
        <NavLink
          to='transparencia'
          className={({ isActive }) =>
            isActive ? "tab tab-lifted tab-active" : "tab tab-lifted"
          }
        >
          Transparencia
        </NavLink>
      </div>
      <div className='rounded-lg p-7 shadow-lg card bg-base-100 border-t-none '>
        <Outlet />
      </div>
    </div>
  );
}

export default DocsAdmin;
