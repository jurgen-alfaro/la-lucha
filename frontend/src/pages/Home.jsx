import { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AsadaContext from "../context/asada/asadaContext";
import HomeServicesHome from "./sections/HomeServicesHome";
import HomeProjects from "./sections/HomeProjects";
import HomePhotoGallery from "./sections/HomePhotoGallery";
import HomePayments from "./sections/HomePayments";
import { motion } from "framer-motion";

/* MEDIA */
import bgVideo from "../assets/pexels-ambientnature-atmosphere.mov";
import cardBg1 from "../assets/homecard1.jpg";
import cardBg2 from "../assets/homecard2.jpg";
import cardBg3 from "../assets/homecard3.jpg";
import cardBg4 from "../assets/homecard4.jpg";
import tankImg from "../assets/tanque.jpg";
import riverImg from "../assets/gradiente1.jpg";

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

function Home() {
  const { asada, getAsada } = useContext(AsadaContext);

  useEffect(() => {
    const fetchAsada = async () => await getAsada();

    fetchAsada();
  }, []);

  const { extension, tanks, gradientes, users } = asada;

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className='hero'>
        <div className='video-container'>
          <video src={bgVideo} autoPlay muted loop></video>
        </div>
        <div className='text-center hero-content text-neutral-content'>
          <div className='max-w-md'>
            <h1 className='mb-5 lg:text-8xl md:text-6xl font-bold text-4xl anim-opacity-fade-in'>
              Acueducto La Lucha
            </h1>
            <blockquote className='mb-5 lg:text-2xl anim-opacity-fade-in italic'>
              "Todo el agua que habrá jamás, la tenemos ahora mismo." <br />
              National Geographic
            </blockquote>
            <Link
              to='/servicios'
              className='btn btn-primary lg:btn-lg hover:bg-secondary duration-500 hover:scale-105 anim-opacity-fade-in'
              id='id02'
            >
              Consultar Recibos&nbsp;
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                width='24'
                fill='#fff'
              >
                <path d='M2.8 22.325V1.7l1.55 1.55 1.5-1.55L7.4 3.25 8.925 1.7l1.55 1.55L12 1.7l1.525 1.55 1.55-1.55L16.6 3.25l1.55-1.55 1.525 1.55L21.2 1.7v20.625L19.675 20.8l-1.525 1.525L16.6 20.8l-1.525 1.525-1.55-1.525L12 22.325 10.475 20.8l-1.55 1.525L7.4 20.8l-1.55 1.525L4.325 20.8Zm3.275-5.275h11.85v-2.1H6.075Zm0-4h11.85v-2.1H6.075Zm0-4h11.85v-2.1H6.075Z' />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <section className='general-info my-12  py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 place-items-center mt-2 gap-3 mx-1 px-6 h-full'>
          <div className='card md:w-96 h-96 lg:w-full bg-base-100 shadow-xl image-full bg-opacity-90 min-w-xl'>
            <figure>
              <img src={cardBg1} alt='Home card image 1' />
            </figure>
            <div className='card-body max-h-min text-center flex justify-center '>
              <div className='shadow stats h-50 bg-opacity-30 '>
                <div className='stat font-black text-white tracking-wider'>
                  <h3 className='stat-title text-xl'>Extensión</h3>
                  <p className='stat-title text-xl'>{extension}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='card md:w-96 h-96 lg:w-full bg-base-100 shadow-xl image-full'>
            <figure>
              <img src={cardBg2} alt='Home card image 2' />
            </figure>
            <div className='card-body max-h-min text-center flex justify-center'>
              <div className='shadow stats h-50 bg-opacity-30 '>
                <div className='stat font-black text-white tracking-wider'>
                  <h3 className='stat-title text-xl'>Usuarios Abastecidos</h3>
                  <p className='stat-title text-xl'>{users}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='card md:w-96 h-96 lg:w-full bg-base-100 shadow-xl image-full'>
            <figure>
              <img src={cardBg3} alt='Home card image 3' />
            </figure>
            <div className='card-body max-h-min text-center flex justify-center'>
              <div className='shadow stats h-50 bg-opacity-30'>
                <div className='stat font-black text-white tracking-wider'>
                  <h3 className='stat-title text-xl'>
                    Tanques de <br />
                    Almacenamiento
                  </h3>
                  <div className='stat-title text-xl'>{tanks}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='card md:w-96 h-96 lg:w-full bg-base-100 shadow-xl image-full'>
            <figure>
              <img src={cardBg4} alt='Tanque de almacenamiento' />
            </figure>
            <div className='card-body max-h-min text-center flex justify-center'>
              <div className='shadow stats h-50 bg-opacity-30'>
                <div className='stat font-black text-white tracking-wider'>
                  <div className='stat-title text-xl'>Quiebra Gradientes</div>
                  <div className='stat-title text-xl'>{gradientes}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='storage-tanks h-full'>
        <div className='storage-tanks-wrapper grid grid-cols-1 md:grid-cols-2'>
          <div className='storage-tanks-info flex flex-col justify-center items-center mb-28 md:mb-0'>
            <h2 className='xl:text-7xl lg:text-6xl md:text-5xl sm:text-6xl text-3xl text-center px-3 xl:px-5 break-words max-w-full'>
              Tanques de Almacenamiento
            </h2>
            <p className='sm:text-lg text-center my-5 px-3 xl:px-12'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              sunt cupiditate, facere perspiciatis doloremque suscipit explicabo
              recusandae beatae quo iste!
            </p>
            <NavLink
              to='/tanques'
              className='btn btn-primary hover:bg-secondary hover:scale-105 md:btn-md lg:btn-lg'
            >
              Ver más {""}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </NavLink>
          </div>
          <div className='storage-tanks-image-container'>
            <img src={tankImg} alt='Tanque de almacenamiento' />
          </div>
        </div>
      </section>
      {/* Quiebra gradientes */}
      <section className='quiebra-gradientes h-full mt-6 md:mt-0'>
        <div className='quiebra-gradientes-wrapper grid grid-cols-1 md:grid-cols-2 '>
          <div className='quiebra-gradientes-image-container'>
            <img src={riverImg} alt='Quiebra gradientes' />
          </div>
          <div className='quiebra-gradientes-info flex flex-col justify-center items-center my-6 md:mb-0'>
            <h2 className='xl:text-7xl lg:text-6xl md:text-5xl sm:text-6xl text-3xl mt-5 text-center px-3 xl:px-5 break-words max-w-full'>
              Quiebra Gradientes
            </h2>
            <p className='sm:text-lg text-center my-5  px-3 xl:px-12'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              sunt cupiditate, facere perspiciatis doloremque suscipit explicabo
              recusandae beatae quo iste!
            </p>
            <NavLink
              to='/quiebraGradientes'
              className='btn btn-primary hover:bg-secondary hover:scale-105 md:btn-md lg:btn-lg'
            >
              Ver más {""}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>
      <HomeServicesHome />
      <HomePayments />
      <HomeProjects />
      <HomePhotoGallery />
    </motion.div>
  );
}

export default Home;
