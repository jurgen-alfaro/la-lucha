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
          className='text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-center font-bold mt-12'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1980
        </h2>
        <h3
          className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center mb-12'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          Creación de una Comunidad
        </h3>

        <p className='max-w-6xl px-2 md:px-0 text-xl'>
          Por los años que antecedieron a 1980, muchas comunidades tenían
          limitaciones del servicio de agua. La Lucha y fuera de esta área
          existían ya las comunidades de San Pedro, Javillos, El Molino, La
          Vega, las cuales todas carecían del servicio de agua potable. Con la
          consecuencia de grandes limitaciones en su desarrollo pleno.
        </p>
        <br />
        <p className='max-w-6xl px-2 md:px-0 text-xl'>
          Cualquier actividad a realizar sería un gran esfuerzo para superar el
          no tener el preciado líquido, un pozo en la tierra. Algunas veces los
          vecinos tomaban agua de una canoa expuesta en el campo abierto. El
          chorro de agua que no todos lo tenían, aunque no fuera potable era
          parte de la solución. Esto a la vez repercutía en enfermedades
          estomacales en los adultos, especialmente en los niños.
        </p>
        <br />
        <div className=' max-w-6xl my-6'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='flex flex-col justify-center '>
              <p className='max-w-lg px-2 md:px-3 text-2xl font-semibold'>
                Mientras tanto los campesinos se integraban y gestionaban la
                adquisición y distribución de parcelas con reuniones celebradas
                en La Tigra, su gente lucha por adquirir parte de la tierra que
                pertenecía a la familia Matamoros quien era el dueño de La
                Hacienda.
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
            El gobierno adquirió 1015 manzanas de tierra, las distribuyó en 94
            parceleros y se formó la comunidad de La Lucha, en la fecha 07 de
            marzo de 1980, que fue cuando el presidente de Costa Rica entregó
            estas parcelas.
          </p>
        </div>
        <br />
        <p className='max-w-6xl px-2 md:px-0 text-xl'>
          Dichas tierras antes de repartirlas habían sido muy trabajadas, pero
          cuando las entregaron a los parceleros estaban en abandono, con
          montaña, tacotales, caminos de tierra abandonados. Lo que existía eran
          dos casas viejas deshabitadas. La hacienda se recibió con el
          compromiso de reforestarla, y así se hizo, se plantaron 14 árboles de
          corteza y danto amarillo. Para aprovecharlos en un futuro porque había
          que hacer un pueblo.
        </p>
        <br />
        <p className='max-w-6xl px-2 md:px-0 text-xl'>
          Durante un año los parceleros se olvidaron que eran una comunidad y no
          se organizaban, por lo tanto, no se contaba con ningún servicio. Lo
          peor, la falta de agua potable en los ranchos de las familias que
          habían construido en este lugar, los cuales eran sumamente humildes.
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
          className='text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-center font-bold mt-12'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1981
        </h2>
        <h3
          className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center mb-12'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          Comité de Gestión con Vecinos
        </h3>
        <p className='max-w-6xl px-2 md:px-0 text-xl'>
          A partir de 1981 se gestionó con la Universidad de Costa Rica para
          que, a través de la escuela Social, se lograra un diagnóstico sobre
          cómo organizar una comunidad. Además, recomendara el qué hacer y cómo
          organizar la situación para lograr obtener los servicios. Durante más
          de dos años se contó con el apoyo de un grupo de trabajadores sociales
          de la UCR. En el cual se realizó estudios de las necesidades y el
          orden de las prioridades en las cuales era necesario trabajar y
          gestionar. Es ahí donde comienza la historia del Acueducto.
        </p>
        <br />
        <p className='max-w-6xl px-2 md:px-0 text-xl'>
          La gente de las comunidades de San Pedro, Javillos, La Vega y El
          Molino, se acercaron para hablar sobre el tema del agua potable. Se
          estableció un Comité de Gestión con vecinos, quedando conformado con
          personas de las diferentes comunidades.
        </p>

        <div
          style={{ backgroundColor: "var(--asada-lemonade-green)" }}
          className='flex flex-col justify-center mb-6 mt-12 h-80 md:h-64 w-full mx-auto px-2 '
        >
          <p className='mx-auto  text-base-300 font-semibold px-2 md:px-0 text-xl md:text-2xl lg:text-3xl max-w-6xl'>
            Se visitó la oficina del AyA y la Casa Presidencial en San José,
            para iniciar las gestiones del acueducto. El diagnóstico que brindó
            la UCR estuvo listo para el año 1983, al mismo tiempo, las gestiones
            para crear la organización local y solución a los demás proyectos.
            Este plan para el agua potable era inicialmente para pocas previstas
            de agua.
          </p>
        </div>
        <br />
        <p className='max-w-6xl px-2 md:px-0 text-xl '>
          El AyA aprobó el proyecto de tubería y solamente la comunidad de La
          Lucha aportó 15 kilómetros de zanjeo aproximadamente, lo que significó
          14.500 horas de trabajo a pico y pala. A cada dueño de prevista se le
          asignó un aporte de 160 horas por familia. Se daban tareas de 10
          metros equivalente a 10 horas de trabajo. Todas las comunidades de
          igual forma realizaron el mismo aporte. Los diputados de esa época
          donaron partidas específicas a la Asociación de Desarrollo de La
          Lucha, la cual estaba recién constituida, además de los estudios
          técnicos necesarios para traer el agua de la finca de Vitaliano
          Vásquez de la zona alta de La Tigra.
        </p>
        <br />
        <div className='mx-auto max-w-6xl mt-2'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div
              className='flex flex-col justify-center md:border-l-4 px-6 mb-4 md:mb-0'
              style={{ borderColor: "var(--asada-lemonade-green)" }}
            >
              <p className='max-w-md mx-auto text-justify text-2xl font-semibold'>
                Don Vitaliano fue padre de 9 hijos, viudo muy joven, el cual era
                dueño de la finca donde está el naciente de agua, es de rescatar
                que él y su familia fueron y son protectores incansables de la
                naturaleza. Actualmente, todavía son propietarios de una parte
                de esa linda montaña, en ese entonces don Vitaliano con el mismo
                carisma que lo representó tuvo la visión de que ese naciente
                diera el agua a las familias que lo necesitaran, sin imaginar la
                magnitud de importancia que llegaría a representar el acueducto.
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
          className='text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-center font-bold mt-12'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1982 - 1983
        </h2>
        <h3
          className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center mb-12'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          Construcción del Acueducto
        </h3>
        <div className='mx-auto max-w-6xl mt-2 '>
          <div className='flex flex-col justify-center px-6'>
            <p className='max-w-6xl text-xl'>
              Desde 1982 que se inicia la construcción del acueducto, con la
              ayuda de un maestro de obra según cuentan algunos adultos mayores
              se llamaba Rodrigo López, quien resultó tener mucho conocimiento,
              además con la colaboración de todos los parceleros y vecinos de
              las comunidades mencionadas.
            </p>
          </div>
        </div>

        <br />
        <div>
          <div className='divider max-w-md mx-auto my-8'></div>
          <p className='max-w-2xl text-center font-semibold text-2xl'>
            Se logró que un día Sábado Santo del año 1983, llegara el agua a las
            casas, lo cual provocó tanta alegría que hasta lágrimas hubo. El
            agua llegó y con esto la vida para estas comunidades.
          </p>
          <div className='divider max-w-md mx-auto'></div>
        </div>
      </div>

      {/* FOURTH SECTION */}
      <div className='flex flex-col items-center justify-center px-2 mt-6 text-justify'>
        <h2
          className='text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-center font-bold mt-12'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1985
        </h2>
        <h3
          className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center mb-12'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          Conformación de Comité Juramentado
        </h3>
        <div className='mx-auto max-w-6xl mt-2'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='flex flex-col justify-center px-6'>
              <p className='max-w-md mx-auto text-xl'>
                Luego en el año 1985 se conformó un Comité Juramentado por la
                misma Asociación de Desarrollo para que fueran quienes
                administraran el funcionamiento del acueducto, inicialmente este
                comité fue conformado por:
                <br />
                Gerardo Rojas Vásquez - Presidente,
                <br />
                Antonio Vásquez Jiménez - Secretario,
                <br />
                Olger Reyner Jiménez Alvarado - Tesorero,
                <br />
                Armando Murillo Rodríguez - Fiscal,
                <br />
                Juan Luis Araya Zarate - Vocal.
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
          className='text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-center font-bold mt-12'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          1999
        </h2>
        <h3
          className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center mb-12'
          style={{ color: "var(--asada-lemonade-green)" }}
        >
          Construcción de la Asociación <br />
          de Acueducto Rural La Lucha La Vega
        </h3>
        <div className='mx-auto max-w-6xl mt-5'>
          <div className='flex flex-col'>
            <div className='flex px-6 mb-8'>
              <p className='mx-auto text-justify text-xl'>
                En el año 1999, luego de varios intentos por constituir una
                Asociación lo cual resultó imposible pasar en el registro
                público, a causa de que se intentó realizar con toda la
                población, a través de una recomendación de un abogado se acordó
                que se reunirían unos pocos abonados para poder constituir La
                Asociación de Acueducto Rural La Lucha La Vega de San Carlos. Y
                así para el año 2003 fue declarada por el Ministerio de Justicia
                y Gracia de utilidad pública. También se inician gestiones para
                realizar un estudio técnico con el objetivo de analizar el
                estado actual del acueducto y las mejoras que requiere.
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
              Al finalizar esta historia del acueducto quisiéramos referir un
              pensamiento que nos regala el señor Antonio Vásquez,
            </p>
            <h2 className='card-title text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl justify-center p-4 my-6 leading-tight'>
              ¡Qué será de nosotros sin el preciado líquido!
            </h2>
            <p className='text-2xl text-justify'>
              Nuestro reconocimiento a todas las personas que de una u otra
              forma han colaborado en la construcción de este acueducto.
            </p>
          </div>
        </div>
      </div>
      <div className='md:h-[30vh]'></div>

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

      <div className='mb-28'></div>
    </motion.div>
  );
}

export default History;
