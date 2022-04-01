import { useContext, useEffect } from "react";
import FormContext from "../context/forms/FormContext";
import Spinner from "../components/shared/Spinner";
import bgImg from "../assets/transparenciabg.jpg";
import { FaNewspaper, FaDownload } from "react-icons/fa";

function Documentation() {
  const {
    forms,
    getForms,
    isLoading,
    downloadFormDocumentClient,
    displayForm,
  } = useContext(FormContext);

  useEffect(() => {
    const fetchForms = async () => {
      await getForms();
    };
    fetchForms();
    window.scrollTo(0, 0);
  }, []);

  // Download form
  const handleDownload = (id) => {
    downloadFormDocumentClient(id);
  };

  // Display form
  const handleDisplayForm = (id) => {
    displayForm(id);
  };

  return (
    <section>
      <div className='documentation-lake-bg mb-12'>
        <div className='grid place-items-center text-center py-6 text-3xl lg:text-6xl xl:text-7xl h-screen'>
          <div
            className='uppercase '
            style={{ backgroundColor: "rgba(126, 174, 70, 0.75)" }}
          >
            <h1 className='p-12 text-white '>Documentación</h1>
          </div>
        </div>
      </div>
      <div className='container mx-auto'>
        <div className='grid sm:justify-center lg:grid-cols-2 '>
          <div className='relative text-center'>
            <img
              src={bgImg}
              alt='Imagen de bomberos'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='text-center px-12'>
            <div className='text-center py-6 text-3xl lg:text-5xl mt-8'>
              <h2 className='pb-5'>Transparencia</h2>
            </div>
            <div className='grid gap-5'>
              <div className='card w-full bg-base-100 shadow-xl'>
                <div className='card-body'>
                  <h2 className='card-title justify-center'>
                    Estados Financieros
                  </h2>
                  <p>
                    En este documento se puede encontrar toda la información
                    relacionada a los estados financieros actuales de la ASADA.
                  </p>
                  <div className='card-actions justify-center mt-4'>
                    <button className='btn btn-primary btn-outline btn-sm'>
                      Descargar&nbsp;
                      <FaDownload />
                    </button>
                    <button className='btn btn-primary btn-sm'>
                      Ver&nbsp;
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                        <path
                          fillRule='evenodd'
                          d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className='card  w-full bg-base-100 shadow-xl'>
                <div className='card-body'>
                  <h2 className='card-title justify-center'>
                    Presupuesto Anual
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className='card-actions justify-center mt-4'>
                    <button className='btn btn-primary btn-outline btn-sm'>
                      Descargar&nbsp;
                      <FaDownload />
                    </button>
                    <button className='btn btn-primary btn-sm'>
                      Ver&nbsp;
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                        <path
                          fillRule='evenodd'
                          d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className='card  w-full bg-base-100 shadow-xl'>
                <div className='card-body'>
                  <h2 className='card-title justify-center'>
                    Plan de Trabajo de la Junta Directiva
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className='card-actions justify-center mt-4'>
                    <button className='btn btn-primary btn-outline btn-sm'>
                      Descargar&nbsp;
                      <FaDownload />
                    </button>
                    <button className='btn btn-primary btn-sm'>
                      Ver&nbsp;
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                        <path
                          fillRule='evenodd'
                          d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FORMS */}
        <div className='text-center py-6 text-3xl lg:text-5xl mt-8'>
          <h2 className='pb-5'>Formularios</h2>
        </div>
        <div className='grid  sm:justify-center lg:grid-cols-2 xl:grid-cols-3 gap-5 about-us-informes-list'>
          {forms.length !== 0 &&
            forms.map((form) => {
              return (
                <div
                  className='card lg:card-side sm:card-side bg-base-100 shadow-xl'
                  key={form.idforms}
                >
                  <div className='card-body'>
                    <h2 className='card-title justify-center'>{form.fname}</h2>
                    <p className='flex justify-start'>{form.fdesc}</p>
                    <div className='justify-center mt-3 card-actions'>
                      <button
                        className='btn btn-primary btn-outline btn-sm'
                        onClick={() => {
                          handleDownload(form.idforms);
                        }}
                      >
                        Descargar&nbsp;
                        <FaDownload />
                      </button>
                      <button
                        className='btn btn-primary btn-sm'
                        onClick={() => {
                          handleDisplayForm(form.idforms);
                        }}
                      >
                        Ver&nbsp;
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                          <path
                            fillRule='evenodd'
                            d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <figure className='bg-base-300'>
                    <span
                      style={{ width: "200px", height: "90px" }}
                      className='flex text-center'
                    >
                      <FaNewspaper style={{ width: "100%", height: "100%" }} />
                    </span>
                  </figure>
                </div>
              );
            })}
        </div>

        <div className='grid sm:justify-center lg:grid-cols-2 mt-12 '>
          <div className='text-center px-12  py-6'>
            <div class='text-center py-6 text-3xl lg:text-5xl mt-8'>
              <h2 className='pb-5'>Reglamentos</h2>
            </div>
            <div className='grid gap-5'>
              <div className='card w-full bg-base-100 shadow-xl'>
                <div className='card-body'>
                  <h2 className='card-title justify-center'>
                    Estados Financieros
                  </h2>
                  <p>
                    En este documento se puede encontrar toda la información
                    relacionada a los estados financieros actuales de la ASADA.
                  </p>
                  <div className='card-actions justify-center mt-4'>
                    <button className='btn btn-primary btn-outline btn-sm'>
                      Descargar&nbsp;
                      <FaDownload />
                    </button>
                    <button className='btn btn-primary btn-sm'>
                      Ver&nbsp;
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                        <path
                          fillRule='evenodd'
                          d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className='card  w-full bg-base-100 shadow-xl'>
                <div className='card-body'>
                  <h2 className='card-title justify-center'>
                    Presupuesto Anual
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className='card-actions justify-center mt-4'>
                    <button className='btn btn-primary btn-outline btn-sm'>
                      Descargar&nbsp;
                      <FaDownload />
                    </button>
                    <button className='btn btn-primary btn-sm'>
                      Ver&nbsp;
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                        <path
                          fillRule='evenodd'
                          d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className='card  w-full bg-base-100 shadow-xl'>
                <div className='card-body'>
                  <h2 className='card-title justify-center'>
                    Plan de Trabajo de la Junta Directiva
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className='card-actions justify-center mt-4'>
                    <button className='btn btn-primary btn-outline btn-sm'>
                      Descargar&nbsp;
                      <FaDownload />
                    </button>
                    <button className='btn btn-primary btn-sm'>
                      Ver&nbsp;
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                        <path
                          fillRule='evenodd'
                          d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='relative text-center'>
            <img
              src={bgImg}
              alt='Imagen de bomberos'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>
      {/* REGLAMENTACION */}
      <div style={{ backgroundColor: "var(--asada-lemonade-green)" }}>
        <div className='title text-center py-6 text-3xl lg:text-5xl mt-8'>
          <h1 className='pb-5 text-white uppercase'>Reglamentación</h1>
        </div>
      </div>
    </section>
  );
}

export default Documentation;
