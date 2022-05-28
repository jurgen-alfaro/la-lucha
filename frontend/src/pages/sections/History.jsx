import { useContext, useEffect } from "react";
import AsadaContext from "../../context/asada/asadaContext";
import { motion } from "framer-motion";
import asadaImg from "../../assets/asada.jpg";
import asadaImg2 from "../../assets/ourhistory5.jpeg";
import campesinos from "../../assets/ourhistory2.jpeg";
import vitaliano from "../../assets/ourhistory3.jpeg";
import comite from "../../assets/ourhistory4.jpeg";

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
      <div className='flex flex-col items-center justify-center px-2'>
        <h2
          className='p-5 text-4xl text-center'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1980 - Creación de una Comunidad
        </h2>
        <p className='max-w-6xl px-2 md:px-0'>
          {historia ? historia.slice(0, 327) : ""}
        </p>
        <br />
        <p className='max-w-6xl px-2 md:px-0'>
          {historia ? historia.slice(327, 718) : ""}
        </p>
        <br />
        <div className='mx-auto max-w-6xl mt-2'>
          <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='col-span-2 flex flex-col justify-center'>
              <p className='max-w-xl mx-auto px-2 md:px-0'>
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
          className='flex flex-col justify-center my-6  px-2 h-52 w-full mx-auto'
        >
          <p className='max-w-lg mx-auto text-center text-base-300 font-bold px-2 md:px-0'>
            {historia ? historia.slice(977, 1191) : ""}
          </p>
        </div>
        <br />
        <p className='max-w-6xl px-2 md:px-0'>
          {historia ? historia.slice(1191, 1620) : ""}
        </p>
        <br />
        <p className='max-w-6xl px-2 md:px-0'>
          {historia ? historia.slice(1620, 1894) : ""}
        </p>
      </div>

      {/* SECOND SECTION */}
      <div className='flex flex-col items-center justify-center px-2 mt-6'>
        <h2
          className='p-5 text-4xl text-center'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1981 - Comité de Gestión con Vecinos
        </h2>
        <p className='max-w-6xl px-2 md:px-0'>
          {historia ? historia.slice(1894, 2429) : ""}
        </p>
        <br />
        <p className='max-w-6xl px-2 md:px-0'>
          {historia ? historia.slice(2429, 2672) : ""}
        </p>

        <div
          style={{ backgroundColor: "var(--asada-lemonade-green)" }}
          className='flex flex-col justify-center my-6 h-52 w-full mx-auto px-2 '
        >
          <p className='max-w-xl mx-auto text-center text-base-300 font-bold px-2 md:px-0'>
            {historia ? historia.slice(2672, 3022) : ""}
          </p>
        </div>
        <br />
        <p className='max-w-6xl px-2 md:px-0'>
          {historia ? historia.slice(3022, 3665) : ""}
        </p>
        <br />
        <div className='mx-auto max-w-6xl mt-2'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div
              className='flex flex-col justify-center md:border-l-4 px-6'
              style={{ borderColor: "var(--asada-lemonade-green)" }}
            >
              <p className='max-w-md mx-auto text-center'>
                {historia ? historia.slice(3665, 4176) : ""}
              </p>
            </div>
            <div className='mt-4 md:mt-0 h-[420px] w-full'>
              <img
                src={vitaliano}
                alt='Don Vitaliano'
                className='object-contain w-full h-full'
              />
            </div>
          </div>
        </div>
      </div>

      {/* THIRD SECTION */}
      <div className='flex flex-col items-center justify-center px-2 mt-6'>
        <h2
          className='p-5 text-4xl text-center'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1982 - 1983 Construcción del Acueducto
        </h2>
        <div className='mx-auto max-w-6xl mt-2 '>
          <div className='flex flex-col justify-center px-6'>
            <p className='max-w-6xl '>
              {historia ? historia.slice(4176, 4463) : ""}
            </p>
          </div>
        </div>

        <br />
        <div>
          <div className='divider max-w-md mx-auto'></div>
          <p className='max-w-xl text-center font-extrabold'>
            {historia ? historia.slice(4463, 4651) : ""}
          </p>
          <div className='divider max-w-md mx-auto'></div>
        </div>
      </div>

      {/* FOURTH SECTION */}
      <div className='flex flex-col items-center justify-center px-2 mt-6'>
        <h2
          className='p-5 text-4xl text-center'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1985 - Conformación de Comité Juramentado
        </h2>
        <div className='mx-auto max-w-6xl mt-2'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='flex flex-col justify-center px-6'>
              <p className='max-w-md mx-auto text-right'>
                {historia ? historia.slice(4651, 5040) : ""}
              </p>
            </div>
            <div className='mt-4 md:mt-0 h-[420px] w-full'>
              <img
                src={comite}
                alt='Comité'
                className='object-contain w-full h-full'
              />
            </div>
          </div>
        </div>
      </div>

      {/* FIFTH SECTION */}
      <div className='flex flex-col items-center justify-center px-2 mt-6'>
        <h2
          className='p-5 text-4xl text-center max-w-4xl'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1999 - Construcción de la Asociación de Acueducto Rural La Lucha La
          Vega de San Carlos
        </h2>
        <div className='mx-auto max-w-6xl mt-2'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='mt-4 md:mt-0 h-[420px] w-full'>
              <img
                src={asadaImg2}
                alt='Asada La Lucha La Vega de San Carlos'
                className='object-contain w-full h-full'
              />
            </div>
            <div className='flex flex-col justify-center px-6'>
              <p className='max-w-md mx-auto text-left'>
                {historia ? historia.slice(5040, 5648) : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SIXTH SECTION */}
      <div
        className='flex flex-col items-center justify-center px-2 my-12 py-20'
        style={{ backgroundColor: "var(--asada-lemonade-green)" }}
      >
        <div className='card w-92 md:w-[42rem] bg-base-100 shadow-xl'>
          <div className='card-body'>
            <p>{historia ? historia.slice(5963, 6081) : ""}</p>
            <h2 className='card-title text-center text-5xl justify-center p-4 my-6 leading-tight'>
              {historia ? historia.slice(6081, 6128) : ""}
            </h2>
            <p>{historia ? historia.slice(6128, -1) : ""}</p>
          </div>
        </div>
      </div>

      <div className='divider'></div>
    </motion.div>
  );
}

export default History;
