import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import FormContext from "../context/forms/FormContext";
import TransparenciaContext from "../context/transparencia/TransparenciaContext";
import ReglamentosContext from "../context/reglamentos/ReglamentosContext";
import InformesContext from "../context/informes/InformesContext";

import { FaNewspaper, FaDownload } from "react-icons/fa";
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

function Documentation() {
  const { forms, getForms, downloadFormDocumentClient, displayForm } =
    useContext(FormContext);

  const { hash } = useLocation();
  const transparenciaRef = useRef();
  const formulariosRef = useRef();
  const informesRef = useRef();
  const reglamentosRef = useRef();

  const {
    documentos,
    getDocumentos,
    downloadTransparenciaDocumentClient,
    displayDocumentoClient,
  } = useContext(TransparenciaContext);

  const {
    informes,
    getInformes,
    downloadInformeDocumentClient,
    displayInformeClient,
  } = useContext(InformesContext);

  const {
    reglamentos,
    getReglamentos,
    downloadReglamentoDocumentClient,
    displayReglamentoClient,
  } = useContext(ReglamentosContext);

  useEffect(() => {
    const fetchTransparenciaDocs = async () => await getDocumentos();
    const fetchForms = async () => await getForms();
    const fetchReglamentos = async () => await getReglamentos();
    const fetchInformes = async () => await getInformes();

    fetchTransparenciaDocs();
    fetchForms();
    fetchReglamentos();
    fetchInformes();
    setTimeout(() => {
      checkHashInURL();
    }, 800);
  }, []);

  const handleFormDownload = (id) => downloadFormDocumentClient(id); // Download form
  const handleDisplayForm = (id) => displayForm(id); // Display form

  const handleDocDownload = (id) => downloadTransparenciaDocumentClient(id); // Download transparencia doc
  const handleDisplayDocumento = (id) => displayDocumentoClient(id); // Display transparencia doc

  const handleReglamentoDownload = (id) => downloadReglamentoDocumentClient(id); // Download reglamento
  const handleDisplayReglamento = (id) => displayReglamentoClient(id); // Display reglamento

  const handleInformeDownload = (id) => downloadInformeDocumentClient(id); // Download informe
  const handleDisplayInforme = (id) => displayInformeClient(id); // Display informe

  function checkHashInURL() {
    switch (hash) {
      case "#transparencia":
        transparenciaRef.current.scrollIntoView();
        break;
      case "#formularios":
        formulariosRef.current.scrollIntoView();
        break;
      case "#informes":
        informesRef.current.scrollIntoView();
        break;
      case "#reglamentos":
        reglamentosRef.current.scrollIntoView();
        break;
      default:
        window.scrollTo(0, 0);
        break;
    }
  }

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <section>
        <div className='documentation-lake-bg mb-12'>
          {/* DOCUMENTOS DE TRANSPARENCIA */}
          <div className='grid place-items-center text-center py-6 text-3xl md:text-4xl lg:text-5xl xl:text-6xl h-[50vh]'>
            <motion.div
              className='uppercase'
              style={{ backgroundColor: "rgba(126, 174, 70, 0.75)" }}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={{
                visible: {
                  opacity: 1,
                  y: "0",
                  scale: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.4,
                  },
                },
                hidden: { opacity: 0, y: "100px", scale: 0 },
              }}
            >
              <motion.h1
                className='p-12 text-white '
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      delay: 0.7,
                      duration: 0.5,
                    },
                  },
                  hidden: { opacity: 0 },
                }}
              >
                Documentación
              </motion.h1>
            </motion.div>
          </div>
        </div>
        <div className='container mx-auto'>
          <div className='grid sm:justify-center'>
            <motion.div
              className='grid place-items-center text-center'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 1,
                    duration: 0.5,
                  },
                },
                hidden: { opacity: 0 },
              }}
            ></motion.div>
            <div className='text-center' ref={transparenciaRef}>
              <div className='text-center py-6  mt-8'>
                <motion.h2
                  className='pb-5 text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        delay: 0.3,
                        duration: 0.5,
                      },
                    },
                    hidden: { opacity: 0 },
                  }}
                >
                  Transparencia
                </motion.h2>
                <div className='flex justify-center px-2'>
                  <motion.p
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: {
                          delay: 0.3,
                          duration: 0.5,
                        },
                      },
                      hidden: { opacity: 0 },
                    }}
                    className='max-w-xl'
                  >
                    En esta sección podrás encontrar todos los documentos
                    relacionados al trabajo que se realiza en la ASADA y cómo se
                    utilizan los fondos públicos para el bienestar de nuestra
                    comunidad.
                  </motion.p>
                </div>
              </div>
              <div className='grid lg:grid-cols-2 xl:grid-cols-3 sm:justify-center gap-5 px-12'>
                {documentos.length !== 0 &&
                  documentos.map((doc, i) => {
                    return (
                      <motion.div
                        className='card bg-base-100 shadow-xl'
                        key={doc.iddoc}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.3 }}
                        variants={{
                          visible: {
                            opacity: 1,
                          },
                          hidden: { opacity: 0 },
                        }}
                      >
                        <div className='card-body max-h-64'>
                          <motion.h2
                            className='card-title justify-center'
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            variants={{
                              visible: {
                                opacity: 1,
                                y: "0",
                                scale: 1,
                                transition: {
                                  delay: 0.3,
                                  duration: 0.5,
                                },
                              },
                              hidden: { opacity: 0, y: "100px", scale: 0 },
                            }}
                          >
                            {doc.dname}
                          </motion.h2>
                          <motion.p
                            className='flex justify-start overflow-y-auto'
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            variants={{
                              visible: {
                                opacity: 1,
                                x: "0",
                                scale: 1,
                                transition: {
                                  delay: 0.7,
                                  duration: 0.5,
                                },
                              },
                              hidden: { opacity: 0, x: "100px", scale: 0 },
                            }}
                          >
                            {doc.ddesc}
                          </motion.p>
                          <motion.div
                            className='justify-center mt-3 card-actions'
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            variants={{
                              visible: {
                                opacity: 1,

                                transition: {
                                  delay: 1,
                                  duration: 1,
                                },
                              },
                              hidden: { opacity: 0 },
                            }}
                          >
                            <button
                              className='btn btn-primary btn-outline btn-sm'
                              onClick={() => {
                                handleDocDownload(doc.iddoc);
                              }}
                            >
                              Descargar&nbsp;
                              <FaDownload />
                            </button>
                            <button
                              className='btn btn-primary btn-sm'
                              onClick={() => {
                                handleDisplayDocumento(doc.iddoc);
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
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* FORMS */}
          <div className='text-center py-6 mt-8' ref={formulariosRef}>
            <motion.h2
              className='pb-5 text-3xl md:text-5xl lg:text-6xl'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.5,
                  },
                },
                hidden: { opacity: 0 },
              }}
            >
              Formularios
            </motion.h2>
            <div className='flex justify-center px-2'>
              <motion.p
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.5,
                    },
                  },
                  hidden: { opacity: 0 },
                }}
                className='max-w-xl'
              >
                Encuentra aquí todos los formularios que nuestra ASADA ofrece
                para la realización de los diferentes trámites.
              </motion.p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 xl:grid-cols-3 sm:justify-center gap-5 px-12'>
            {forms.length !== 0 &&
              forms.map((form, i) => {
                return (
                  <motion.div
                    className='card lg:card-side sm:card-side bg-base-100 shadow-xl '
                    key={form.idforms}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.3 }}
                    variants={{
                      visible: {
                        opacity: 1,
                      },
                      hidden: { opacity: 0 },
                    }}
                  >
                    <div className='card-body max-h-64'>
                      <h2 className='card-title justify-center text-center'>
                        {form.fname}
                      </h2>
                      <p className='flex justify-start overflow-y-auto'>
                        {form.fdesc}
                      </p>
                      <motion.div
                        className='justify-center mt-3 card-actions'
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        variants={{
                          visible: {
                            opacity: 1,
                          },
                          hidden: { opacity: 0 },
                        }}
                      >
                        <div className='card-actions'>
                          <button
                            className='btn btn-primary btn-outline btn-sm'
                            onClick={() => {
                              handleFormDownload(form.idforms);
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
                      </motion.div>
                    </div>
                    <figure className='bg-base-300'>
                      <motion.span
                        style={{ width: "150px", height: "90px" }}
                        className='flex text-center'
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        transition={{ delay: 1.3 }}
                        variants={{
                          visible: {
                            opacity: 1,
                            scale: 1,
                            rotate: "0deg",
                          },
                          hidden: { opacity: 0, scale: 0.8, rotate: "360deg" },
                        }}
                      >
                        <FaNewspaper
                          style={{ width: "100%", height: "100%" }}
                        />
                      </motion.span>
                    </figure>
                  </motion.div>
                );
              })}
          </div>
          {/* INFORMES */}
          <div className='text-center py-6 mt-8' ref={informesRef}>
            <motion.h2
              className='pb-5 text-3xl md:text-5xl lg:text-6xl'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.5,
                  },
                },
                hidden: { opacity: 0 },
              }}
            >
              Informes
            </motion.h2>
            <div className='flex justify-center px-2'>
              <motion.p
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.5,
                    },
                  },
                  hidden: { opacity: 0 },
                }}
                className='max-w-xl'
              >
                Todos los informes presentados a las diferentes instituciones
                nacionales se encuentran disponibles en esta sección.
              </motion.p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 xl:grid-cols-3 sm:justify-center gap-5 px-12'>
            {informes.length !== 0 &&
              informes.map((informe, i) => {
                return (
                  <motion.div
                    className='card lg:card-side sm:card-side bg-base-100 shadow-xl '
                    key={informe.idinforme}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.3 }}
                    variants={{
                      visible: {
                        opacity: 1,
                      },
                      hidden: { opacity: 0 },
                    }}
                  >
                    <div className='card-body max-h-64'>
                      <h2 className='card-title justify-center text-center'>
                        {informe.iname}
                      </h2>
                      <p className='flex justify-start overflow-y-auto'>
                        {informe.idesc}
                      </p>
                      <motion.div
                        className='justify-center mt-3 card-actions'
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        variants={{
                          visible: {
                            opacity: 1,
                          },
                          hidden: { opacity: 0 },
                        }}
                      >
                        <div className='card-actions'>
                          <button
                            className='btn btn-primary btn-outline btn-sm'
                            onClick={() => {
                              handleInformeDownload(informe.idinforme);
                            }}
                          >
                            Descargar&nbsp;
                            <FaDownload />
                          </button>
                          <button
                            className='btn btn-primary btn-sm'
                            onClick={() => {
                              handleDisplayInforme(informe.idinforme);
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
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
          {/* REGLAMENTOS */}
          <div className='sm:justify-center mt-12 ' ref={reglamentosRef}>
            <div className='text-center px-12  py-6'>
              <div className='text-center py-6 text-3xl md:text-5xl lg:text-6xl mt-8'>
                <motion.h2
                  className='pb-5'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        delay: 0.3,
                        duration: 0.5,
                      },
                    },
                    hidden: { opacity: 0 },
                  }}
                >
                  Reglamentos
                </motion.h2>
              </div>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 xl:grid-cols-3 place-items-center text-center py-6 px-6 gap-5 max-h-screen overflow-y-auto scrollbar-hide '>
            {reglamentos.length !== 0 &&
              reglamentos.map((doc, i) => {
                return (
                  <motion.div
                    className='card bg-base-100 shadow-xl '
                    key={doc.idreglamento}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.4, duration: 0.7 }}
                    variants={{
                      visible: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                      },
                      hidden: { opacity: 0, x: "-200px", y: "-200px" },
                    }}
                  >
                    <div className='card-body'>
                      <motion.h2
                        className='card-title justify-center'
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        variants={{
                          visible: {
                            opacity: 1,

                            scale: 1,
                            transition: {
                              delay: 1.1,
                              duration: 0.7,
                            },
                          },
                          hidden: { opacity: 0, scale: 0 },
                        }}
                      >
                        {doc.rname}
                      </motion.h2>
                      <motion.p
                        className='flex justify-start'
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        variants={{
                          visible: {
                            opacity: 1,

                            transition: {
                              delay: 1.4,
                              duration: 0.7,
                            },
                          },
                          hidden: { opacity: 0 },
                        }}
                      >
                        {doc.rdesc}
                      </motion.p>
                      <motion.div
                        className='justify-center mt-3 card-actions'
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        variants={{
                          visible: {
                            opacity: 1,

                            transition: {
                              delay: 1,
                              duration: 1,
                            },
                          },
                          hidden: { opacity: 0 },
                        }}
                      >
                        <button
                          className='btn btn-primary btn-outline  btn-sm'
                          onClick={() => {
                            handleReglamentoDownload(doc.idreglamento);
                          }}
                        >
                          Descargar&nbsp;
                          <FaDownload />
                        </button>
                        <button
                          className='btn btn-primary btn-sm'
                          onClick={() => {
                            handleDisplayReglamento(doc.idreglamento);
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
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Documentation;
