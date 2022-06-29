import { useContext, useEffect } from "react";
import AsadaContext from "../../context/asada/asadaContext";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";

import { SocialIcon } from "react-social-icons";
import logo from "../../assets/logo.jpeg";
import { Link } from "react-router-dom";

function Footer() {
  const { asada, getAsada } = useContext(AsadaContext);

  const { address } = asada;

  useEffect(() => {
    const fetchDireccion = async () => await getAsada();

    fetchDireccion();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer
        className='p-10 footer text-base-content '
        style={{ backgroundColor: "var(--asada-lemonade-green)" }}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 '>
          <div>
            <p className='footer-title text-base-300 text-2xl '>
              Oficinas Centrales
            </p>
            <span className='flex py-1 cursor-pointer text-base-100 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              &nbsp;
              <p className='text-xl'>{address && address}</p>
            </span>
            <span className='flex py-1 cursor-pointer text-base-100 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 '
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
              </svg>
              &nbsp;
              <p className='text-xl'>(+506) 8541-0886</p>
            </span>
            <span className='flex py-1 cursor-pointer text-base-100 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
              </svg>
              &nbsp;
              <p className='text-xl'>acueductolalucha@gmail.com</p>
            </span>
            <div className='mt-6'>
              <p className='uppercase font-bold text-2xl '>Encuéntranos en: </p>
              <div className='flex  gap-3 my-3'>
                <a
                  href='https://www.facebook.com/people/Asada-La-Lucha-La-Vega/100006408049102/'
                  className='text-5xl'
                >
                  <BsFacebook />
                </a>

                <a
                  href='https://www.facebook.com/people/Asada-La-Lucha-La-Vega/100006408049102/'
                  className='text-5xl'
                >
                  <BsWhatsapp />
                </a>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 md:pl-16'>
            <p className='footer-title text-base-300 text-2xl'>Navegación</p>
            <Link to='/' className='link link-hover text-xl text-base-100'>
              Inicio
            </Link>
            <Link
              to='/nosotros'
              className='link link-hover text-xl text-base-100'
            >
              Nosotros
            </Link>
            <Link
              to='/servicios'
              className='link link-hover text-xl text-base-100'
            >
              Servicios
            </Link>
            <Link
              to='/proyectos'
              className='link link-hover text-xl text-base-100'
            >
              Proyectos
            </Link>
            <Link
              to='/documentacion'
              className='link link-hover text-xl text-base-100'
            >
              Documentación
            </Link>
            <Link
              to='/contacto'
              className='link link-hover text-xl text-base-100'
            >
              Contacto
            </Link>
          </div>
          <div className='flex flex-col gap-3'>
            <p className='footer-title text-bold text-base-300 text-2xl'>
              De interés
            </p>
            <Link
              to='/documentacion#transparencia'
              className='link link-hover text-xl text-base-100'
            >
              Transparencia
            </Link>
            <Link to='/posts' className='link link-hover text-xl text-base-100'>
              Publicaciones
            </Link>
            <Link
              to='/galeria'
              className='link link-hover text-xl text-base-100'
            >
              Galería
            </Link>
            <Link
              to='/contacto'
              className='link link-hover text-xl text-base-100'
            >
              Buzón virtual de sugerencias
            </Link>{" "}
            <Link
              to='/servicios'
              className='link link-hover text-xl text-base-100'
            >
              Consulta de recibos
            </Link>
            <Link
              to='/contacto'
              className='link link-hover text-xl text-base-100'
            >
              Trabaja con nosotros
            </Link>
          </div>
        </div>
      </footer>

      <footer className='px-10 py-4 border-t footer bg-base-200 text-base-content border-base-300'>
        <div className='items-center grid-flow-col'>
          <div className='h-10 w-10'>
            <img
              src={logo}
              alt='La Lucha logo'
              className='h-full w-full object-cover'
            />
          </div>
          <p>
            Por cada árbol que siembras garantizas agua para tres personas.{" "}
            <br />
            ASADA La Lucha, La Vega de San Carlos. <br />
            {currentYear}
          </p>
        </div>
        <div className='md:place-self-center md:justify-self-end'>
          <div className='grid grid-flow-col gap-4'>
            <SocialIcon
              url='https://www.facebook.com/people/Asada-La-Lucha-La-Vega/100006408049102/'
              style={{ width: "42px", height: "42px" }}
              className='transition hover:scale-125  duration-300  cursor-pointer'
              target='_blank'
            />

            <SocialIcon
              url='mailto:acueductolalucha@gmail.com'
              style={{ width: "42px", height: "42px" }}
              className='transition hover:scale-125 duration-300  cursor-pointer'
            />
            <SocialIcon
              url='https://web.whatsapp.com/'
              style={{ width: "42px", height: "42px" }}
              className='transition hover:scale-125 duration-300 cursor-pointer'
            />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
