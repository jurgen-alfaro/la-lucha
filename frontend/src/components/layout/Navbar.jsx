import { useState } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsOpen(!isOpen);

  return (
    <nav className='border-gray-200 px-2 sm:px-4 py-2.5 sticky w-full top-0 z-50 bg-base-200'>
      <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <Link to='/' className='flex'>
          <div className='h-10 w-10'>
            <img
              src={logo}
              alt='La Lucha logo'
              className='h-full w-full object-cover'
            />
          </div>
          <span className='self-center text-lg font-semibold whitespace-nowrap '>
            &nbsp;ASADA La Lucha
          </span>
        </Link>
        <button
          data-collapse-toggle='mobile-menu'
          type='button'
          onClick={toggleMobileMenu}
          className='inline-flex items-center p-2 ml-3 text-sm text-secondary rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 '
          aria-controls='mobile-menu-2'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-6 h-6'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
          <svg
            className='hidden w-6 h-6'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <div
          className={
            isOpen
              ? `w-full md:block md:w-auto`
              : `hidden w-full lg:block lg:w-auto `
          }
          id='mobile-menu'
        >
          <ul className='flex flex-col lg:flex-row mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium transition-all duration-500 ease-in-out'>
            <li>
              <NavLink
                end
                to='/'
                className='block py-2.5 pr-4 pl-3 border-b border-gray-100 hover:bg-base-300 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '
                aria-current='page'
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#79b9d6",
                      }
                    : { color: "#545e6f" }
                }
              >
                Inicio
              </NavLink>
            </li>

            <li className='dropdown dropdown-hover'>
              <NavLink
                tabIndex='0'
                to='/about-us'
                className='block py-2.5 pr-4 pl-3 border-b border-gray-100 hover:bg-base-300 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#79b9d6",
                      }
                    : { color: "#545e6f" }
                }
              >
                Nosotros
                <svg
                  className='fill-current inline'
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                >
                  <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
                </svg>
              </NavLink>

              <ul
                tabIndex='0'
                className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52'
              >
                <li>
                  <NavLink to='/about-us'>Historia</NavLink>
                </li>
                <li>
                  <a>Misión y Visión</a>
                </li>
                <li>
                  <a>Junta Directiva</a>
                </li>
                <li>
                  <a>Informes</a>
                </li>
                <li>
                  <Link to='/about-us'>Mapa de Sitio</Link>
                </li>
                <li>
                  <a>Galería</a>
                </li>
              </ul>
            </li>
            <li className='dropdown dropdown-hover'>
              <NavLink
                to='/services'
                className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#79b9d6",
                      }
                    : { color: "#545e6f" }
                }
              >
                Servicios
                <svg
                  className='fill-current inline'
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                >
                  <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
                </svg>
              </NavLink>
              <ul
                tabIndex='0'
                className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52'
              >
                <li>
                  <a>Consulta de Recibos</a>
                </li>
                <li>
                  <a>Consulta de Abonados CISA Web</a>
                </li>
                <li>
                  <a>Solicitud de Afiliación</a>
                </li>
                <li>
                  <a>Métodos de Pago</a>
                </li>
              </ul>
            </li>
            <li>
              <NavLink
                to='projects'
                className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#79b9d6",
                      }
                    : { color: "#545e6f" }
                }
              >
                Proyectos
              </NavLink>
            </li>
            <li>
              <NavLink
                to='documentation'
                className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#79b9d6",
                      }
                    : { color: "#545e6f" }
                }
              >
                Documentación
              </NavLink>
            </li>

            <li className='dropdown dropdown-hover'>
              <NavLink
                to='financial-statements'
                className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#79b9d6",
                      }
                    : { color: "#545e6f" }
                }
              >
                Reglamentos
                <svg
                  className='fill-current inline'
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                >
                  <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
                </svg>
              </NavLink>
              <ul
                tabIndex='0'
                className='p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52'
              >
                <li>
                  <a>Prestación de Servicio al Cliente</a>
                </li>
                <li>
                  <a>Reglamento de ASADAS</a>
                </li>
                <li>
                  <a>Reglamento de ARESEP</a>
                </li>
                <li>
                  <a>Planificación Urbana</a>
                </li>
                <li>
                  <a>Requisitos de Proyectos Habitacionales</a>
                </li>
              </ul>
            </li>
            <li>
              <NavLink
                to='/contact'
                className='block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#79b9d6",
                      }
                    : { color: "#545e6f" }
                }
              >
                Contacto
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
