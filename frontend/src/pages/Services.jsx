import img from "../assets/seo.png";

function Services() {
  return (
    <section>
      <div className='grid grid-cols-3 place-items-center h-screen bg-gradient-to-b from-[var(--asada-light-blue)] to-[var(--asada-dark-blue)]'>
        <div className='container mx-auto col-span-3 xl:col-span-2 h-full p-12'>
          <h1 className='text-6xl lg:text-8xl xl:text-9xl break-normal text-white'>
            Nuestros Servicios a tu disposición
          </h1>
          <p className='text-xl lg:text-2xl mt-12 text-white xl:max-w-4xl'>
            Con la ayuda de CISA web nunca había sido tan fácil verificar tus
            facturas pendientes en línea. Comprueba el estado de tus
            transacciones y descarga formularios necesarios para afiliarse a
            nuestra ASADA.
          </p>
          <button className='btn btn-primary btn-lg mt-12  '>
            Ver más&nbsp;
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>

      <div className='bg-[var(--asada-dark-blue)] h-[70vh] bg-gradient-to-b from-[var(--asada-dark-blue)] to-[var(--asada-dark-blue)] grid grid-cols-2'>
        <div className='order-2 lg:order-1 px-8 col-span-2 lg:col-span-1 flex flex-col mx-auto'>
          <h2 className='text-white text-6xl lg:ml-12'>CISA Web</h2>
          <p className='max-w-lg text-white mt-4 lg:ml-12'>
            Ingresa tu número de factura y presiona el botón de 'Consultar' para
            realizar la petición al servidor de CISA Web
          </p>
          <div className='form mt-3 px-1 lg:ml-12'>
            <form className='w-full max-w-lg' autoComplete='off'>
              <div className='flex flex-wrap -mx-3 mb-1'>
                <div className='w-full px-3'>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-email'
                    type='email'
                    placeholder='correo@ejemplo.com'
                    required
                    name='email'
                  />
                </div>
              </div>

              <div className='flex flex-wrap -mx-3 mb-4'>
                <div className='w-full px-3 '>
                  <button
                    href={`mailto:acueductolalucha@gmail.com`}
                    type='submit'
                    className='  
                        w-full
                        btn
                        btn-primary
                        hover:bg-secondary
                        hover:scale-105
                        md:btn-md '
                  >
                    Consultar &nbsp;
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='h-full w-full relative col-span-2 lg:col-span-1 order-1 lg:order-2'>
          <img
            src={img}
            alt=''
            className='object-fill col-span-2 absolute w-full h-auto bottom-[100%] sm:bottom-[100%] md:bottom-[20%] lg:bottom-[0%] lg:-top-2/4 xl:-top-1/2'
          />
        </div>
      </div>
    </section>
  );
}

export default Services;
