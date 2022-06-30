import { useContext, useEffect } from "react";
import AsadaContext from "../../context/asada/asadaContext";
import { motion } from "framer-motion";
import asadaImg from "../../assets/asada.jpg";
import asadaImg2 from "../../assets/asada2.jpeg";
import obreros1 from "../../assets/obreros1.jpeg";
import obreros2 from "../../assets/obreros2.jpeg";
import obreros3 from "../../assets/obreros3.jpeg";
import campesinos from "../../assets/campesinos.jpeg";
import vitaliano from "../../assets/donvitaliano.jpeg";
import comite from "../../assets/comite.jpeg";
import { Link } from "react-router-dom";

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

function History() {
  const { asada, getAsada } = useContext(AsadaContext);
  const { historia } = asada;

  useEffect(() => {
    const fetchAsada = async () => await getAsada();
    fetchAsada();
  }, []);

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
      className='flex flex-col justify-center'
    >
      <div className='px-4'>
        <div className='title text-center py-6 text-3xl lg:text-7xl'>
          <h1 className='border-b pb-5'>Nuestra Historia</h1>
        </div>
      </div>
      <div className='w-full md:max-w-6xl mx-auto h-full md:h-[566px] px-6 my-6'>
        <img
          src={asadaImg}
          alt='Asada La Lucha La Vega'
          className='object-cover object-top w-full h-full'
        />
      </div>

      {/* FIRST SECTION */}
      <div className='flex flex-col items-center justify-center px-2 text-justify'>
        <h2
          className='p-5 text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center my-6'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1980 - Creación de una Comunidad
        </h2>
        <p className='max-w-6xl px-2 md:px-0 text-xl'>
          {historia ? historia.slice(0, 327) : ""}
        </p>
        <br />
        <p className='max-w-6xl px-2 md:px-0 text-xl'>
          {historia ? historia.slice(327, 719) : ""}
        </p>
        <br />
        <div className=' max-w-6xl my-6'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='flex flex-col justify-center '>
              <p className='max-w-lg px-2 md:px-3 text-2xl font-semibold'>
                {historia ? historia.slice(719, 977) : ""}
              </p>
            </div>
            <div className='col-span-1 mt-4 md:mt-0'>
              <img src={campesinos} alt='Campesinos' />
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: "var(--asada-lemonade-green)" }}
          className='flex flex-col justify-center my-12 px-2 h-64 w-full opacity-[0.95]'
        >
          <p className='mx-auto text-center text-base-300 px-2 md:px-0 text-xl md:text-4xl max-w-6xl font-semibold'>
            {historia ? historia.slice(977, 1192) : ""}
          </p>
        </div>
        <br />
        <p className='max-w-6xl px-2 md:px-0 text-xl'>
          {historia ? historia.slice(1192, 1620) : ""}
        </p>
        <br />
        <p className='max-w-6xl px-2 md:px-0 text-xl'>
          {historia ? historia.slice(1620, 1894) : ""}
        </p>
        <div className='mx-auto max-w-6xl mt-5'>
          <div className='flex flex-col'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-6'>
              <div className='mt-4 md:mt-0 h-[420px] w-full'>
                <img
                  src={obreros1}
                  alt='Asada La Lucha La Vega de San Carlos'
                  className='object-cover w-full h-full'
                />
              </div>
              <div className='mt-4 md:mt-0 h-[420px] w-full'>
                <img
                  src={obreros2}
                  alt='Asada La Lucha La Vega de San Carlos'
                  className='object-cover w-full h-full'
                />
              </div>
              <div className='mt-4 md:mt-0 h-[420px] w-full lg:col-span-1 md:col-span-2'>
                <img
                  src={obreros3}
                  alt='Asada La Lucha La Vega de San Carlos'
                  className='object-top w-full h-full'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECOND SECTION */}
      <div className='flex flex-col items-center justify-center px-2 text-justify'>
        <h2
          className='p-5 text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center my-8'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1981 - Comité de Gestión con Vecinos
        </h2>
        <p className='max-w-6xl px-2 md:px-0 text-xl'>
          {historia ? historia.slice(1894, 2430) : ""}
        </p>
        <br />
        <p className='max-w-6xl px-2 md:px-0 text-xl'>
          {historia ? historia.slice(2430, 2673) : ""}
        </p>

        <div
          style={{ backgroundColor: "var(--asada-lemonade-green)" }}
          className='flex flex-col justify-center mb-6 mt-12 h-80 md:h-64 w-full mx-auto px-2 '
        >
          <p className='mx-auto  text-base-300 font-semibold px-2 md:px-0 text-xl md:text-2xl lg:text-3xl max-w-6xl'>
            {historia ? historia.slice(2673, 3021) : ""}
          </p>
        </div>
        <br />
        <p className='max-w-6xl px-2 md:px-0 text-xl '>
          {historia ? historia.slice(3022, 3661) : ""}
        </p>
        <br />
        <div className='mx-auto max-w-6xl mt-2'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div
              className='flex flex-col justify-center md:border-l-4 px-6 mb-4 md:mb-0'
              style={{ borderColor: "var(--asada-lemonade-green)" }}
            >
              <p className='max-w-md mx-auto text-justify text-2xl font-semibold'>
                {historia ? historia.slice(3661, 4174) : ""}
              </p>
            </div>
            <div className='mt-4 md:mt-0 h-[25rem] w-full'>
              <img
                src={vitaliano}
                alt='Don Vitaliano'
                className='object-scale-down w-full h-full'
              />
            </div>
          </div>
        </div>
      </div>

      {/* THIRD SECTION */}
      <div className='flex flex-col items-center justify-center px-2 mt-6 text-justify'>
        <h2
          className='p-5 text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center my-8'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1982 - 1983 Construcción del Acueducto
        </h2>
        <div className='mx-auto max-w-6xl mt-2 '>
          <div className='flex flex-col justify-center px-6'>
            <p className='max-w-6xl text-xl'>
              {historia ? historia.slice(4174, 4461) : ""}
            </p>
          </div>
        </div>

        <br />
        <div>
          <div className='divider max-w-md mx-auto my-8'></div>
          <p className='max-w-2xl text-center font-semibold text-2xl'>
            {historia ? historia.slice(4461, 4649) : ""}
          </p>
          <div className='divider max-w-md mx-auto'></div>
        </div>
      </div>

      {/* FOURTH SECTION */}
      <div className='flex flex-col items-center justify-center px-2 mt-6 text-justify'>
        <h2
          className='p-5 text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center my-3'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1985 - Conformación de Comité Juramentado
        </h2>
        <div className='mx-auto max-w-6xl mt-2'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='flex flex-col justify-center px-6'>
              <p className='max-w-md mx-auto text-xl'>
                {historia ? historia.slice(4649, 5043) : ""}
              </p>
            </div>
            <div className='mt-4 md:mt-0 h-full  w-full'>
              <img
                src={comite}
                alt='Comité'
                className='object-contain w-full h-full'
              />
              <p className='italic text-sm text-center'>
                <small>Imagen Ilustrativa</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FIFTH SECTION */}
      <div className='flex flex-col items-center justify-center px-2 mt-6 mb-16 '>
        <h2
          className='p-5 text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center max-w-6xl my-6'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1999 - Construcción de la Asociación <br />
          de Acueducto Rural La Lucha La Vega
        </h2>
        <div className='mx-auto max-w-6xl mt-5'>
          <div className='flex flex-col'>
            <div className='flex px-6 mb-8'>
              <p className='mx-auto text-justify text-xl'>
                {historia ? historia.slice(5043, 5653) : ""}
              </p>
            </div>
            <div className='w-full md:max-w-6xl mx-auto h-full md:h-[566px] px-6 my-6 sepia '>
              <img
                src={asadaImg2}
                alt='Asada La Lucha La Vega'
                className='object object-scale-down w-full h-full'
              />
              <p className='italic text-sm text-center'>
                <small>Imagen Ilustrativa</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SIXTH SECTION */}
      <div
        className='flex flex-col items-center justify-center px-2 my-12 py-20 relative h-full md:h-[40vh] '
        style={{ backgroundColor: "var(--asada-lemonade-green)" }}
      >
        <div className='card bg-base-100 shadow-2xl md:absolute md:top-36 rounded-none py-12 mx-6'>
          <div className='card-body'>
            <p className='text-2xl text-justify'>
              {historia ? historia.slice(5969, 6085) : ""}
            </p>
            <h2 className='card-title text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl justify-center p-4 my-6 leading-tight'>
              {historia ? historia.slice(6085, 6133) : ""}
            </h2>
            <p className='text-2xl text-justify'>
              {historia ? historia.slice(6133, -1) : ""}
            </p>
          </div>
        </div>
      </div>
      <div className='md:h-[25vh]'></div>

      {/* SEVENTH SECTION */}

      <div className='flex flex-col items-center justify-center'>
        <h3 className='text-5xl font-bold text-center'>
          ¿Quieres conocer más sobre nuestros proyectos?
        </h3>
        <p className='md:w-1/2 text-center md:text-center mt-8 text-2xl mx-4'>
          Visita el siguiente enlace para que puedas saber más sobre el trabajo
          que orgullosamente realizamos en nuestra comunidad
        </p>
        <Link
          to={`/proyectos`}
          className='btn btn-lg btn-primary btn-outline hover:btn-secondary
          hover:scale-105 mt-10 '
        >
          Ir a proyectos&nbsp;
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </Link>
      </div>

      <div className='divider mb-20'></div>
    </motion.div>
  );
}

export default History;
