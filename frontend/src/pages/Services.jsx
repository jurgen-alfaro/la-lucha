import { useEffect, useContext } from "react";
import AsadaContext from "../context/asada/asadaContext";
import { motion } from "framer-motion";

// Framer motion variants
const pageVariants = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};
const pageTransition = {
  duration: 0.5,
};

function Services() {
  const { getEmpresas } = useContext(AsadaContext);

  useEffect(() => {
    const fetchWebService = async () => {
      await getEmpresas();
    };

    fetchWebService();
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <section>
        <div className='container mx-auto'>
          <div className='title text-center py-6 text-3xl lg:text-7xl'>
            <h1 className='border-b pb-5'>Servicios</h1>
          </div>
        </div>
        <div className='flex flex-col  justify-center items-center gap-6 md:h-[50vh] py-12 px-4'>
          <div className='text-center '>
            <h2 className='text-5xl '>Consulta de recibos en línea</h2>
            <p className='mt-4 max-w-lg justify-center mx-auto'>
              Consulte sus recibos pendientes con sólo ingresar el número de
              NIS, de abonado o de medidor.
            </p>
          </div>
          <form className='w-full max-w-lg' autoComplete='off'>
            <div className='flex flex-wrap -mx-3 mb-1'>
              <div className='w-full px-3 flex flex-col'>
                <label htmlFor='numero '>
                  <small>Seleccione su ASADA</small>
                </label>
                <select className='select select-bordered w-full'>
                  <option defaultValue>Normal</option>
                  <option>Normal Apple</option>
                  <option>Normal Orange</option>
                  <option>Normal Tomato</option>
                </select>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-1 mt-4'>
              <div className='w-full px-3'>
                <label htmlFor='numero '>
                  <small> NIS, # de abonado o de medidor</small>
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-numero'
                  type='text'
                  placeholder='Ingresar número aquí'
                  required
                  name='numero'
                />
              </div>
            </div>

            <div className='flex flex-wrap -mx-3 mb-4'>
              <div className='w-full px-3 '>
                <button
                  type='submit'
                  className='  
                        w-full
                        btn
                        btn-primary
                        hover:bg-secondary
                        hover:scale-105
                        md:btn-md font-bold
                        text-base-200'
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
      </section>
    </motion.div>
  );
}

export default Services;
