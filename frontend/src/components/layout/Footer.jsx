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
        className='py-16 footer text-base-content '
        style={{ backgroundColor: "var(--asada-lemonade-green)" }}
      >
        <div className='flex flex-col lg:flex-row container mx-auto lg:px-20'>
          <div className='flex flex-col gap-3 items-center justify-center md:self-center place-self-center col-span-3 xl:col-span-1 mb-6 xl:mb-0'>
            <h1 className='text-5xl lg:text-6xl text-base-200 font-bold text-center'>
              Acueducto La Lucha
            </h1>
            <blockquote className='text-2xl text-base-200 italic text-center'>
              "Cuidar del agua es cuidar de todos nosotros."
            </blockquote>
          </div>

          <div className='flex flex-col gap-1 justify-center place-items-center w-full'>
            <p className='footer-title text-base-300 text-xl'>Navegación</p>
            <Link to='/' className='link link-hover text-lg text-base-100'>
              Inicio
            </Link>
            <Link
              to='/nosotros'
              className='link link-hover text-lg text-base-100'
            >
              Nosotros
            </Link>
            <Link
              to='/servicios'
              className='link link-hover text-lg text-base-100'
            >
              Servicios
            </Link>
            <Link
              to='/proyectos'
              className='link link-hover text-lg text-base-100'
            >
              Proyectos
            </Link>
            <Link
              to='/documentacion'
              className='link link-hover text-lg text-base-100'
            >
              Documentación
            </Link>
            <Link
              to='/contacto'
              className='link link-hover text-lg text-base-100'
            >
              Contacto
            </Link>
          </div>

          <div className='flex flex-col gap-1 justify-center place-items-center w-full mt-12 lg:mt-0'>
            <p className='footer-title text-bold text-base-300 text-xl'>
              De interés
            </p>
            <Link
              to='/documentacion#transparencia'
              className='link link-hover text-lg text-base-100'
            >
              Transparencia
            </Link>
            <Link
              to='/publicaciones'
              className='link link-hover text-lg text-base-100'
            >
              Publicaciones
            </Link>
            <Link
              to='/galeria'
              className='link link-hover text-lg text-base-100'
            >
              Galería
            </Link>
            <Link
              to='/contacto'
              className='link link-hover text-lg text-base-100 text-center'
            >
              Buzón de sugerencias
            </Link>{" "}
            <Link
              to='/servicios'
              className='link link-hover text-lg text-base-100 text-center'
            >
              Consulta de recibos
            </Link>
            <Link
              to='/contacto'
              className='link link-hover text-lg text-base-100 text-center'
            >
              Trabaja con nosotros
            </Link>
          </div>

          <div className='flex flex-col gap-1 justify-center place-items-center w-full mt-12 lg:mt-0'>
            <p className='footer-title text-base-300 text-xl '>
              Oficinas Centrales
            </p>
            <div className='flex text-base-300 place-items-center'>
              <span className='flex py-1 cursor-pointer mr-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
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
              </span>
              <p className='text-lg max-w-xs text-center'>
                {address && address}
              </p>
            </div>
            <div className='flex text-base-300 place-items-center'>
              <span className='flex py-1 cursor-pointer mr-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 '
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                </svg>
              </span>
              <p className='text-lg'>(+506) 8541-0886</p>
            </div>
            <div className='flex text-base-300 place-items-center'>
              <span className='flex py-1 cursor-pointer text-base-100 items-center mr-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 '
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                  <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                </svg>
              </span>
              <p className='text-lg'>acueductolalucha@gmail.com</p>
            </div>
            <div className='mt-12 lg:mt-6'>
              <p className='uppercase font-bold text-xl '>Encuéntranos en: </p>
              <div className='flex gap-2 mt-2 justify-center'>
                <SocialIcon
                  url='https://www.facebook.com/people/Asada-La-Lucha-La-Vega/100006408049102/'
                  style={{ width: "42px", height: "42px" }}
                  className='transition hover:scale-125  duration-300  cursor-pointer '
                  target='_blank'
                  fgColor='#fff'
                />

                <SocialIcon
                  url='mailto:acueductolalucha@gmail.com'
                  style={{ width: "42px", height: "42px" }}
                  className='transition hover:scale-125 duration-300  cursor-pointer'
                  fgColor='#fff'
                />
                <SocialIcon
                  url='https://wa.me/50687094950'
                  style={{ width: "42px", height: "42px" }}
                  className='transition hover:scale-125 duration-300 cursor-pointer'
                  fgColor='#fff'
                  target='_blank'
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
