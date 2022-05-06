import { FaFacebook } from "react-icons/fa";
import { SocialIcon } from "react-social-icons";
import logo from "../../assets/logo2.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className='p-10 footer bg-base-100 text-base-content'>
        <div>
          <span className='footer-title'>Información financiera</span>
          <a className='link link-hover'>Estados financieros</a>
          <a className='link link-hover'>Presupuesto anual</a>
          <a className='link link-hover'>Plan de Trabajo de Junta Directiva</a>
          <a className='link link-hover'>Otro documento...</a>
        </div>
        <div>
          <span className='footer-title'>Recursos</span>
          <a className='link link-hover'>
            Formulario para Solicitud de Servicio Nuevo
          </a>
          <a className='link link-hover'>Formulario Disponibilidad de Agua</a>
          <a className='link link-hover'>
            Formulario para Suspensión Definitiva del Servicio
          </a>
          <a className='link link-hover'>Formulario para Cambio de Nombre</a>
          <a className='link link-hover'>Formulario para Afiliación</a>
        </div>
        <div>
          <span className='footer-title text-bold'>De interés</span>
          <a className='link link-hover'>
            Proyectos pendientes por desarrollar
          </a>
          <a className='link link-hover'>
            Informes presentados a entes estatales
          </a>
          <a className='link link-hover'>Buzón de sugerencias virtual</a>
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
