import { useContext, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import LoginContext from "../../context/login/LoginContext";
import { SuggestionProvider } from "../../context/suggestions/SuggestionContext";

import UserLogin from "../users/UserLogin";
import logo from "../../assets/logo2.png";

function AdminLayout() {
  const { user } = useContext(LoginContext);

  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return <UserLogin />;
  }

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SuggestionProvider>
      <div className='relative min-h-screen md:flex'>
        {/* Mobile Menu Bar */}
        <div className='bg-secondary text-blue-100 flex justify-between md:hidden'>
          {/* logo */}
          <a href='#' className='block p-4 text-white font-bold'>
            Gestor de Contenido | La Lucha
          </a>
          {/* logo menu button */}
          <button
            className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-700'
            onClick={handleClick}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>

        {/* sidebar */}
        <div
          className={`sidebar bg-secondary text-blue-100 w-64  space-y-6 px-2 py-7 absolute md:relative md:translate-x-0 inset-y-0 left-0 transform z-20 ${
            isOpen ? `-translate-x-full` : ``
          } transition duration-200 ease-in-out`}
        >
          {/* logo */}
          <a href='#' className='text-white flex items-center space-x-2 px-4'>
            <div className='h-10 w-10'>
              <img
                src={logo}
                alt='La Lucha logo'
                className='h-full w-full object-cover'
              />
            </div>
            <span className='text-lg font-extrabold'>ASADA La Lucha</span>
          </a>
          {/* nav */}
          <nav>
            <NavLink
              to='dashboard'
              className='block py-2.5 px-4 transition duration-200 rounded hover:bg-primary hover:text-white focus:bg-primary-focus focus:text-white focus:text-bold'
            >
              Inicio
            </NavLink>
            <NavLink
              to='suggestions'
              className='block py-2.5 px-4 transition duration-200 rounded hover:bg-primary hover:text-white focus:bg-primary-focus focus:text-white focus:text-bold'
            >
              Buzón de Sugerencias
            </NavLink>
            <NavLink
              to='forms'
              className='block py-2.5 px-4 transition duration-200 rounded hover:bg-primary hover:text-white focus:bg-primary-focus focus:text-white focus:text-bold'
            >
              Formularios
            </NavLink>
            <NavLink
              to='notdefined'
              className='block py-2.5 px-4 transition duration-200 rounded hover:bg-primary hover:text-white focus:bg-primary-focus focus:text-white focus:text-bold'
            >
              Pricing
            </NavLink>
          </nav>
        </div>

        {/* content */}
        <div className='flex-1 p-10 text-2xl font-bold bg-secondary-content'>
          <Outlet />
        </div>
      </div>
    </SuggestionProvider>
  );
}

export default AdminLayout;
