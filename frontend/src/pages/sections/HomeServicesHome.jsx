import { NavLink } from "react-router-dom";
import { FaReceipt, FaQuestion, FaUserPlus, FaWpforms } from "react-icons/fa";

function HomeServicesHome() {
  return (
    <section className='services-home flex justify-center my-12 '>
      <div className='volcano-img-container grid align-center'>
        <div className='card my-12 mx-12'>
          <div className='card-body h-full justify-center'>
            <h2 className='card-title text-white justify-center lg:text-6xl md:text-4xl text-3xl my-10'>
              Nuestros Servicios
            </h2>

            <div className='service-items my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-8'>
              <div className='service-item cursor-pointer hover:shadow-xl transition  duration-300 ease-in-out p-2 flex justify-center align-center flex-col text-center'>
                <NavLink to='servicios' className='flex justify-center'>
                  <FaReceipt className='text-white lg:text-9xl md:text-8xl sm:text-7xl text-6xl' />
                </NavLink>
                <p className='mt-5 text-white font-bold text-2xl'>
                  Consulta de Recibos
                </p>
              </div>
              {/* <div className='service-item cursor-pointer hover:shadow-xl transition duration-300 ease-in-out p-2 flex justify-center align-center flex-col text-center'>
                <span className='flex justify-center'>
                  <FaQuestion className='text-white lg:text-9xl md:text-8xl sm:text-7xl text-6xl' />
                </span>
                <p className='mt-5 text-white font-bold text-2xl'>
                  Consulta de Abonados CISA Web
                </p>
              </div> */}
              <div className='service-item cursor-pointer hover:shadow-xl transition duration-300  ease-in-out p-2 flex justify-center align-center flex-col text-center'>
                <NavLink
                  to='documentacion#formularios'
                  className='flex justify-center'
                >
                  <FaUserPlus className='text-white lg:text-9xl md:text-8xl sm:text-7xl text-6xl' />
                </NavLink>
                <p className='mt-5 text-white font-bold text-2xl'>
                  Solicitud de Afiliación
                </p>
              </div>

              <div className='service-item cursor-pointer hover:shadow-xl transition duration-300 ease-in-out p-2 flex justify-center align-center flex-col text-center'>
                <NavLink
                  to='documentacion#formularios'
                  className='flex justify-center'
                >
                  <FaWpforms className='text-white lg:text-9xl md:text-8xl sm:text-7xl text-6xl' />
                </NavLink>
                <p className='mt-5 text-white font-bold text-2xl'>
                  Formularios
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeServicesHome;
