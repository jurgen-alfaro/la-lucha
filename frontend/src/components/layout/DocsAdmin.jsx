import { NavLink, Outlet } from "react-router-dom";

function DocsAdmin() {
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
      </div>
      <div className='rounded-lg p-7 shadow-lg card bg-base-100 border-t-none '>
        <Outlet />
      </div>
    </div>
  );
}

export default DocsAdmin;
