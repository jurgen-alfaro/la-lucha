import { Link, NavLink } from "react-router-dom";
import HomeServicesHome from "./sections/HomeServicesHome";
import HomeProjects from "./sections/HomeProjects";
import HomePhotoGallery from "./sections/HomePhotoGallery";

/* MEDIA */
import bgVideo from "../assets/pexels-ambientnature-atmosphere.mov";
import cardBg1 from "../assets/water-card-1.jpg";
import cardBg2 from "../assets/water-card-2.jpg";
import cardBg3 from "../assets/water-card-3.jpg";
import cardBg4 from "../assets/water-card-1.jpg";
import tankImg from "../assets/water-tank-image.jpg";
import riverImg from "../assets/river.jpg";

function Home() {
  return (
    <>
      <div className='hero'>
        <div className='video-container'>
          <video src={bgVideo} autoPlay muted loop></video>
        </div>
        <div className='text-center hero-content text-neutral-content'>
          <div className='max-w-md'>
            <h1 className='mb-5 lg:text-8xl md:text-6xl font-bold text-4xl anim-opacity-fade-in'>
              Acueducto La Lucha
            </h1>
            <p className='mb-5 lg:text-xl anim-opacity-fade-in' id='id01'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link
              to='/posts'
              className='btn btn-primary lg:btn-lg hover:bg-secondary hover:scale-105 anim-opacity-fade-in'
              id='id02'
            >
              Ver publicaciones más recientes
            </Link>
          </div>
        </div>
      </div>
      <section className='general-info mt-12 mb-12 h-full py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 justify-center place-items-center mt-2 gap-1 mx-1 px-20 h-full'>
          <div className='card w-auto lg:w-full h-96 bg-base-100 shadow-xl image-full bg-opacity-90'>
            <figure>
              <img src={cardBg1} alt='Pour water in glass' />
            </figure>
            <div className='card-body text-center flex justify-center '>
              <div className='shadow stats h-50 bg-opacity-30 '>
                <div className='stat font-black text-white'>
                  <div className='stat-title text-xl'>Extensión</div>
                  <div className='stat-value '>26 km</div>
                  <div className='stat-desc whitespace-pre-line mt-2'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Earum, sint.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card w-auto lg:w-full h-96 bg-base-100 shadow-xl image-full'>
            <figure>
              <img src={cardBg2} alt='Leaf with water drops' />
            </figure>
            <div className='card-body text-center flex justify-center'>
              <div className='shadow stats h-50 bg-opacity-30'>
                <div className='stat font-black text-white'>
                  <div className='stat-title text-xl'>Usuarios Abastecidos</div>
                  <div className='stat-value'>340</div>
                  <div className='stat-desc whitespace-pre-line mt-2'>
                    Esta es la cantidad de usuarios que actualmente cuentan con
                    servicio de agua potable.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card w-auto lg:w-full h-96 bg-base-100 shadow-xl image-full'>
            <figure>
              <img src={cardBg3} alt='Another leaf' />
            </figure>
            <div className='card-body text-center flex justify-center'>
              <div className='shadow stats h-50 bg-opacity-30'>
                <div className='stat font-black text-white'>
                  <div className='stat-title text-xl'>
                    Tanques de Almacenamiento
                  </div>
                  <div className='stat-value'>65</div>
                  <div className='stat-desc whitespace-pre-line mt-2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam laborum modi consectetur hic culpa praesentium.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card w-auto lg:w-full h-96 bg-base-100 shadow-xl image-full'>
            <figure>
              <img src={cardBg4} alt='Costa Rica beach' />
            </figure>
            <div className='card-body text-center flex justify-center'>
              <div className='shadow stats h-50 bg-opacity-30'>
                <div className='stat font-black text-white'>
                  <div className='stat-title text-xl'>Quiebra Gradientes</div>
                  <div className='stat-value'>26</div>
                  <div className='stat-desc whitespace-pre-line mt-2'>
                    Esta es la cantidad de usuarios que actualmente cuentan con
                    servicio de agua potable.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='storage-tanks h-full '>
        <div className='storage-tanks-wrapper grid grid-cols-1 md:grid-cols-2'>
          <div className='storage-tanks-info flex flex-col justify-center items-center mb-5 md:mb-0'>
            <h2 className='xl:text-7xl lg:text-6xl md:text-5xl sm:text-6xl text-3xl text-center px-3 xl:px-5 break-words max-w-full'>
              Tanques de Almacenamiento
            </h2>
            <p className='sm:text-lg text-center my-5 px-3 xl:px-12'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              sunt cupiditate, facere perspiciatis doloremque suscipit explicabo
              recusandae beatae quo iste!
            </p>
            <NavLink
              to='/storage-tanks'
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
            <img src={tankImg} alt='Water storage tank' />
          </div>
        </div>
      </section>
      {/* Quiebra gradientes */}
      <section className='quiebra-gradientes h-full '>
        <div className='quiebra-gradientes-wrapper grid grid-cols-1 md:grid-cols-2 '>
          <div className='quiebra-gradientes-image-container'>
            <img src={riverImg} alt='Water storage tank' />
          </div>
          <div className='quiebra-gradientes-info flex flex-col justify-center items-center'>
            <h2 className='xl:text-7xl lg:text-6xl md:text-5xl sm:text-6xl text-3xl mt-5 text-center px-3 xl:px-5 break-words max-w-full'>
              Quiebra Gradientes
            </h2>
            <p className='sm:text-lg text-center my-5  px-3 xl:px-12'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              sunt cupiditate, facere perspiciatis doloremque suscipit explicabo
              recusandae beatae quo iste!
            </p>
            <NavLink
              to='/quiebra-gradientes'
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
      <HomeProjects />
      <HomePhotoGallery />
    </>
  );
}

export default Home;
