import { FaFacebook } from "react-icons/fa";
import { SocialIcon } from "react-social-icons";

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
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            fillRule='evenodd'
            clipRule='evenodd'
            className='fill-current'
          >
            <path d='M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z'></path>
          </svg>
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
