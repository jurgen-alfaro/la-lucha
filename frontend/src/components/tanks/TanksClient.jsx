import { useContext, useEffect } from "react";
import TanksContext from "../../context/tanks/TanksContext";
import TankPhotosClient from "./TankPhotosClient";
import Spinner from "../shared/Spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";
import NavFooter from "../shared/NavFooter";

// Create our number formatter.
const formatter = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: "scale(1.2)",
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
        transform: "scale(1.2)",
        left: "25px",
        zIndex: 1,
      }}
      onClick={onClick}
    />
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

function FadeInWhenVisible({ children }) {
  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
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

function TanksClient() {
  const { isLoading, tanks, getTanks } = useContext(TanksContext);

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
    if (tanks.length === 0) {
      const fetchTanks = async () => await getTanks();

      fetchTanks();
    }
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
        <div className='text-center pb-16 pt-6 text-3xl lg:text-7xl'>
          <h1 className='border-b pb-5'>Tanques de Almacenamiento</h1>
        </div>
        <div className='posts-section w-full'>
          <div className='bg py-12'>
            <div className='container mx-auto grid place-items-center'>
              <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12'>
                {/* Card */}

                {!isLoading && tanks.length !== 0 ? (
                  tanks.map((tank, i) => {
                    return (
                      <AnimatePresence key={tank.idtanks}>
                        <motion.div
                          key={tank.idtanks}
                          idx={i}
                          className='card md:max-h-[420px] max-h-[420px] md:w-[380px] mx-6 bg-base-100 shadow-xl '
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
                          <div className='photos-container relative'>
                            <div className={`w-full h-full`}>
                              <Slider {...settings}>
                                {!isLoading && tank.photos ? (
                                  tank.photos.map((photo, i) => {
                                    return (
                                      <TankPhotosClient
                                        photo={photo}
                                        key={i}
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
                          <div className='card-body pb-4 pt-2 px-4 overflow-y-auto'>
                            <FadeInWhenVisible>
                              <motion.h2
                                className='font-medium text-3xl '
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
                                {tank.name}
                              </motion.h2>

                              <motion.div
                                initial='hidden'
                                whileInView='visible'
                                viewport={{ once: true }}
                                variants={{
                                  visible: {
                                    opacity: 1,
                                    transition: {
                                      delay: 1.3,
                                    },
                                  },
                                  hidden: { opacity: 0 },
                                }}
                              >
                                <small>
                                  &nbsp;
                                  <span className='font-bold'>
                                    Capacidad:
                                  </span>{" "}
                                  {tank.capacity} m³
                                </small>
                              </motion.div>
                              <motion.div
                                initial='hidden'
                                whileInView='visible'
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                variants={{
                                  visible: {
                                    opacity: 1,
                                    transition: {
                                      delay: 1.3,
                                    },
                                  },
                                  hidden: { opacity: 0 },
                                }}
                              >
                                <small>
                                  &nbsp;
                                  <span className='font-bold'>
                                    Ubicación:
                                  </span>{" "}
                                  {tank.location}
                                </small>
                              </motion.div>
                              <motion.div
                                initial='hidden'
                                whileInView='visible'
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                variants={{
                                  visible: {
                                    opacity: 1,
                                    transition: {
                                      delay: 1.3,
                                    },
                                  },
                                  hidden: { opacity: 0 },
                                }}
                              >
                                <small>
                                  &nbsp;
                                  <span className='font-bold'>Costo: </span>
                                  {formatter.format(tank.costo)}
                                </small>
                              </motion.div>
                              <motion.div
                                initial='hidden'
                                whileInView='visible'
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                variants={{
                                  visible: {
                                    opacity: 1,
                                    transition: {
                                      delay: 1.3,
                                    },
                                  },
                                  hidden: { opacity: 0 },
                                }}
                              >
                                <small>
                                  &nbsp;
                                  <span className='font-bold'>
                                    Proveedor:
                                  </span>{" "}
                                  {tank.proveedor}
                                </small>
                              </motion.div>
                            </FadeInWhenVisible>
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
                    <h1 className='text-4xl max-w-3xl text-center text-white leading-loose mx-4'>
                      No hay tanques de <br />
                      almacenamiento
                    </h1>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
        <NavFooter to='quiebraGradientes' text='quiebra gradientes' />
      </section>
    </motion.div>
  );
}

export default TanksClient;
