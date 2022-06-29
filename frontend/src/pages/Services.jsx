import { useEffect, useContext, useState, useRef } from "react";
import AsadaContext from "../context/asada/asadaContext";
import { motion } from "framer-motion";
import Spinner from "../components/shared/Spinner";

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
  const {
    getCISAWebToken,
    getCISABuscarRecibosPendientes,
    getCISANombreAbonado,
    getCISAReciboDetalle,
    nombreAbonado,
    detalles,
    setDetalles,
    facturas,
    setFacturas,
    isLoading,
  } = useContext(AsadaContext);
  const [abonado, setAbonado] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const textRef = useRef();

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setFacturas([]);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const fetchWebService = async () => {
      await getCISAWebToken();
    };

    fetchWebService();

    window.scrollTo(0, 0);
  }, [facturas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    openModal();
    await getCISABuscarRecibosPendientes(abonado);
    await getCISANombreAbonado(abonado);
  };

  const handleShowDetails = async (abonado, factura) => {
    const fetchDetails = async () =>
      await getCISAReciboDetalle(abonado, factura);

    if (showDetails) {
      document
        .getElementById(factura)
        .classList.add(["flex", "justify-center"]);
      document.getElementById(factura).classList.remove("hidden");
      textRef.current = "Ver asd";
    } else {
      document
        .getElementById(factura)
        .classList.remove(["flex", "justify-center"]);
      document.getElementById(factura).classList.add("hidden");
      textRef.current = "Ocultar";
    }
    fetchDetails();
  };

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
          <form
            className='w-full max-w-lg'
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-wrap -mx-3 mb-1 mt-4'>
              <div className='w-full px-3'>
                <label htmlFor='numero '>
                  <small> NIS, # de abonado o de medidor</small>
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-abonado'
                  type='text'
                  placeholder='Ingresar número aquí'
                  required
                  name='abonado'
                  value={abonado}
                  onChange={(e) => setAbonado(e.target.value)}
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

        <div className={`modal ${isModalOpen ? "modal-open" : ""}  px-3`}>
          <div className='modal-box '>
            <span className='cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-9 w-9 z-50'
                viewBox='0 0 20 20'
                fill='currentColor'
                onClick={closeModal}
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            <div className='flex items-center flex-col mt-4'>
              {!isLoading ? (
                <>
                  {nombreAbonado !== "" && (
                    <h2 className='font-extrabold text-2xl text-center'>
                      {nombreAbonado}
                    </h2>
                  )}
                  {facturas.length === 0 ? (
                    <p className='font-bold text-2xl mt-4'>
                      Sin facturas pendientes
                    </p>
                  ) : (
                    <h2 className='font-bold text-2xl  mt-4'>
                      Facturas Pendientes
                    </h2>
                  )}
                  {facturas.map((item, index) => (
                    <div className='w-full' key={index}>
                      <div className='flex flex-col justify-start bg-slate-100 shadow-xl rounded-lg  p-3 my-3'>
                        <p className='font-semibold text-right text-lg mr-6 mb-4'>
                          Factura {item.factura}
                        </p>
                        <p>
                          <span className='font-semibold'>Mes</span>: {item.mes}
                        </p>
                        <p>
                          <span className='font-semibold'>Año</span>: {item.ano}
                        </p>
                        <p>
                          <span className='font-semibold'>Vencimiento</span>:{" "}
                          {item.vencimiento.split("T")[0]}
                        </p>
                        <p>
                          <span className='font-semibold'>Monto</span>: ₡
                          {item.monto}
                        </p>
                        <p>
                          <span className='font-semibold'>Facturación</span>:{" "}
                          {item.facturacion.split("T")[0]}
                        </p>
                        <p className='capitalize'>
                          <span className='font-semibold capitalize '>
                            Estado abonado
                          </span>
                          : {String(item.estado).toLowerCase()}
                        </p>

                        <div id={`${item.factura}`} className='hidden'>
                          <div className='divider my-1'></div>

                          {detalles.length > 0 && (
                            <>
                              {detalles.map((item, index) => (
                                <div key={index}>
                                  <p className='capitalize'>
                                    <span className='font-semibold'>
                                      {item.descripcion.toLowerCase()}
                                    </span>
                                    : {item.valor}
                                  </p>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                        <button
                          type='button'
                          className='btn btn-primary my-4'
                          onClick={() => {
                            setShowDetails(!showDetails);
                            handleShowDetails(abonado, item.factura);
                          }}
                        >
                          Detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Services;
