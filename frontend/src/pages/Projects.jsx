import { useContext, useEffect, useRef, useState } from "react";
import ProjectContext from "../context/projects/ProjectContext";
import ProjectPhotosClient from "../components/projects/ProjectPhotosClient";
import Slider from "react-slick";
import Moment from "react-moment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../components/shared/Spinner";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: "scale(2)",
        right: "25px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: "scale(2)",
        left: "25px",
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

function FadeInWhenVisible({ children }) {
  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      variants={{
        visible: {
          opacity: 1,
          transition: {
            delay: 0.6,
          },
        },
        hidden: { opacity: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}

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

const childVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,

    transition: {
      ease: "easeInOut",
      staggerChildren: 2,
    },
  },
};

// Create our number formatter.
const formatter = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function Projects() {
  const { projects, getProjects, isLoading, project } =
    useContext(ProjectContext);

  const [filteredProjects, setFilteredProjects] = useState(projects);

  const todo = useRef();

  // Options for the carouse Slider
  const settings = {
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    if (projects.length === 0) {
      const fetchProjects = async () => await getProjects();

      fetchProjects();
      setFilteredProjects(projects);
    }
  }, [filteredProjects]);

  const filterProjects = (e) => {
    const val = e.target.value;
    let filtered = [];
    switch (val) {
      case "pendientes":
        // filtered = projects.filter((post) => post.post_type === "Anuncios");
        setFilteredProjects(
          projects.filter((project) => project.is_pending === 1)
        );
        break;
      case "finalizados":
        setFilteredProjects(
          projects.filter((project) => project.is_pending === 0)
        );
        break;

      default:
        filtered = projects;
        setFilteredProjects(filtered);
        break;
    }
  };

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <section className='mb-20'>
        <div className='text-center py-6 text-3xl lg:text-7xl'>
          <h1 className='border-b pb-5'>Proyectos</h1>
        </div>
        <div className='projects-section w-full'>
          <div className='bg py-12'>
            <div className='container mx-auto grid place-items-center'>
              <div className='grid grid-cols-1 gap-12'>
                <div className='flex md:justify-start justify-center  w-full gap-3 px-3'>
                  <button
                    className='btn btn-ghost btn-sm text-white focus:outline'
                    onClick={filterProjects}
                    value='todos'
                    ref={todo}
                  >
                    Todos
                  </button>
                  <button
                    className='btn btn-ghost btn-sm text-white focus:outline'
                    onClick={filterProjects}
                    value='pendientes'
                  >
                    Pendientes
                  </button>
                  <button
                    className='btn btn-ghost btn-sm text-white focus:outline'
                    onClick={filterProjects}
                    value='finalizados'
                  >
                    Finalizados
                  </button>
                </div>
                {/* Card */}

                {!isLoading && filteredProjects.length !== 0 ? (
                  filteredProjects.map((project, i) => {
                    return (
                      <AnimatePresence key={project.idproject}>
                        <motion.div
                          key={project.idproject}
                          idx={i}
                          className='card md:max-h-[600px] max-h-[600px] grid grid-cols-1 md:grid-cols-2 mx-6 bg-base-100 shadow-xl max-w-screen-xl '
                          initial='hidden'
                          whileInView='visible'
                          exit='hidden'
                          viewport={{ once: true }}
                          transition={{ duration: 5 }}
                          variants={{
                            visible: {
                              opacity: 1,
                              transition: {
                                delay: 0.3,
                              },
                            },
                            hidden: {
                              opacity: 0,
                              transition: { duration: 0.3 },
                            },
                          }}
                        >
                          <div className='card-body my-6 px-8 overflow-y-auto overflow-x-hidden md:overflow-y-auto'>
                            <FadeInWhenVisible>
                              <motion.div
                                className='flex flex-col gap-1 justify-between '
                                variants={childVariants}
                                initial='hidden'
                                animate='show'
                              >
                                <motion.div
                                  className={`badge ${
                                    project.is_pending
                                      ? "badge-warning"
                                      : "badge-primary"
                                  } `}
                                  initial='hidden'
                                  whileInView='visible'
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8 }}
                                  variants={{
                                    visible: {
                                      opacity: 1,
                                      transition: {
                                        delay: 0.3,
                                      },
                                    },
                                    hidden: { opacity: 0 },
                                  }}
                                >
                                  {project.is_pending
                                    ? "Pendiente"
                                    : "Finalizado"}
                                </motion.div>
                                <small className='text-xs pl-1'>
                                  <motion.span>
                                    {" "}
                                    Fecha de inicio:&nbsp;
                                    <Moment
                                      format='MMM DD, YYYY'
                                      className='font-bold'
                                    >
                                      {project.created_at}
                                    </Moment>{" "}
                                  </motion.span>
                                </small>
                                <small className='text-xs pl-1'>
                                  <motion.span>
                                    Coste estimado:&nbsp;
                                    <span className='font-bold'>
                                      {formatter.format(project.estimated_cost)}
                                    </span>
                                  </motion.span>
                                </small>
                                <small className='text-xs pl-1'>
                                  <motion.span>
                                    Coste total:&nbsp;
                                    <span className='font-bold'>
                                      {formatter.format(project.total_cost)}
                                    </span>
                                  </motion.span>
                                </small>
                              </motion.div>
                              <div className=' h-full'>
                                <motion.h2
                                  className='font-medium text-3xl mt-7'
                                  initial='hidden'
                                  whileInView='visible'
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8 }}
                                  variants={{
                                    visible: {
                                      opacity: 1,
                                      x: "0",
                                      transition: {
                                        delay: 0.8,
                                        duration: 0.5,
                                      },
                                    },
                                    hidden: { opacity: 0, x: "200px" },
                                  }}
                                >
                                  {project.title}
                                </motion.h2>
                                <motion.p
                                  className='text-sm mt-6 whitespace-pre-line'
                                  initial='hidden'
                                  whileInView='visible'
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8 }}
                                  variants={{
                                    visible: {
                                      opacity: 1,
                                      x: "0",
                                      transition: {
                                        delay: 1.3,
                                        duration: 0.5,
                                      },
                                    },
                                    hidden: { opacity: 0, x: "200px" },
                                  }}
                                >
                                  {project.pdesc}
                                </motion.p>
                              </div>
                            </FadeInWhenVisible>

                            <motion.div
                              className='flex justify-end border-t'
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
                                    delay: 1.4,
                                    duration: 0.5,
                                  },
                                },
                                hidden: { opacity: 0, y: "100px", scale: 0 },
                              }}
                            >
                              <div className='divider'></div>
                            </motion.div>
                          </div>
                          <div className='photos-container relative'>
                            <div
                              className={`w-full h-full transition duration-150 ease-out`}
                            >
                              <Slider {...settings}>
                                {!isLoading && project.photos ? (
                                  project.photos.map((photo, i) => {
                                    return (
                                      <ProjectPhotosClient
                                        photo={photo}
                                        key={i}
                                        settings={settings}
                                        idphoto={photo.idphotos}
                                      />
                                    );
                                  })
                                ) : (
                                  <Spinner />
                                )}
                              </Slider>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    );
                  })
                ) : (
                  <motion.div
                    initial='hidden'
                    whileInView='visible'
                    exit='hidden'
                    viewport={{ once: true }}
                    transition={{ duration: 5 }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: {
                          delay: 0.3,
                        },
                      },
                      hidden: {
                        opacity: 0,
                        transition: { duration: 0.3 },
                      },
                    }}
                  >
                    <h1 className='text-4xl max-w-3xl text-center text-white leading-loose'>
                      <span className=''>Sin proyectos.</span>
                      <br /> Seleccione el tipo de proyecto que desea ver.
                    </h1>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Projects;
