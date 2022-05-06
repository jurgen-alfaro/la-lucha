import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import Map from "../components/maps/Map";
import SuggestionContext from "../context/suggestions/SuggestionContext";
import AsadaContext from "../context/asada/asadaContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //React-Toastify CSS
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

function Contact() {
  const { asada, getAsada, isLoading } = useContext(AsadaContext);

  const { addSuggestion } = useContext(SuggestionContext);

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { name, last_name, email, subject, message } = formData;
  const { address, schedule } = asada;

  useEffect(() => {
    const fetchAsada = async () => await getAsada();
    fetchAsada();
    window.scrollTo(0, 0);
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const formReset = () => {
    setFormData({
      name: "",
      last_name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addSuggestion(formData);
    toast.success(
      "¡Gracias por tus comentarios! Un miembro de la ASADA los revisará y se pondrá en contacto de ser necesario.",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    formReset();
  };

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <section className='contact-section'>
        <div className='container mx-auto'>
          <div className='title text-center py-6 text-3xl lg:text-7xl'>
            <h1 className='border-b pb-5'>Contacto</h1>
          </div>
          <div className='map-container flex justify-center w-full h-96 items-center mb-3'>
            <Map />
          </div>
          <div className='info-container grid grid-cols-1 md:grid-cols-2 px-3 gap-3 w-full h-full '>
            <div className='left'>
              <div className='inquiries'>
                <h2 className='text-2xl py-2'>Consultas</h2>
                <p className='py-2 max-w-lg'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Provident ipsam delectus fugiat maiores iure.
                </p>
              </div>
              <div className='contact-us mt-3'>
                <h2 className='text-2xl py-2'>Contáctanos</h2>

                <div className='form mt-3 px-1'>
                  <form
                    className='w-full max-w-lg'
                    onSubmit={onSubmit}
                    autoComplete='off'
                  >
                    <div className='flex flex-wrap -mx-3 mb-4'>
                      <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-nombre'
                        >
                          Nombre
                        </label>
                        <input
                          className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                          id='grid-nombre'
                          type='text'
                          placeholder='Ingresar nombre aquí'
                          value={name}
                          name='name'
                          onChange={onChange}
                          required
                        />
                        {/* <p className='text-red-500 text-xs italic'>
                        Please fill out this field.
                      </p> */}
                      </div>
                      <div className='w-full md:w-1/2 px-3'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-apellidos'
                        >
                          Apellidos
                        </label>
                        <input
                          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                          id='grid-apellidos'
                          type='text'
                          placeholder='Ingresar apellidos aquí'
                          required
                          name='last_name'
                          value={last_name}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-4'>
                      <div className='w-full px-3'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-email'
                        >
                          Correo electrónico
                        </label>
                        <input
                          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                          id='grid-email'
                          type='email'
                          placeholder='correo@ejemplo.com'
                          required
                          name='email'
                          value={email}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-4'>
                      <div className='w-full px-3'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-subject'
                        >
                          Asunto
                        </label>
                        <input
                          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                          id='grid-subject'
                          type='text'
                          placeholder='Ingresar asunto aquí'
                          required
                          name='subject'
                          value={subject}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-4'>
                      <div className='w-full px-3'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-message'
                        >
                          Mensaje/Sugerencia
                        </label>
                        <textarea
                          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                          id='grid-message'
                          placeholder='Ingresar mensaje/sugerencia aquí'
                          required
                          name='message'
                          value={message}
                          onChange={onChange}
                        />
                        <p className='text-gray-600 text-xs italic'>
                          Cantidad máxima de caracteres: 500
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-4'>
                      <div className='w-full px-3 '>
                        <button
                          href={`mailto:acueductolalucha@gmail.com`}
                          type='submit'
                          className='  
                        w-full
                        btn
                        btn-primary
                        hover:bg-secondary
                        hover:scale-105
                        md:btn-md '
                        >
                          Enviar &nbsp;
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                            <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='right'>
              <div className='address'>
                <h2 className='text-2xl py-2'>Dirección</h2>
                <address className='py-2 max-w-lg'>{address}</address>
              </div>
              <div className='address'>
                <h2 className='text-2xl py-2'>Horario de Atención</h2>
                <p className='py-2 max-w-lg'>{schedule}</p>
              </div>
              <div className='info mt-6'>
                <h2 className='text-2xl py-2'>Contactos</h2>
                <span className='flex py-1 cursor-pointer'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                    <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                  </svg>
                  &nbsp;
                  <a
                    href='mailto:acueductolalucha@gmail.com'
                    className='cursor-pointer'
                  >
                    acueductolalucha@gmail.com
                  </a>
                </span>
                <span className='flex py-1 cursor-pointer'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 '
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                  </svg>
                  &nbsp;
                  <a href='tel:+50624688981' className='cursor-pointer'>
                    (+506) 2468-8981
                  </a>
                </span>
                <span className='flex py-1 cursor-pointer'>
                  <SocialIcon
                    url='https://www.facebook.com/people/Asada-La-Lucha-La-Vega/100006408049102/'
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    target='_blank'
                    bgColor='#333C4D'
                  />
                  &nbsp;{" "}
                  <a
                    href='https://www.facebook.com/people/Asada-La-Lucha-La-Vega/100006408049102/'
                    rel='noreferrer'
                    target='_blank'
                    className='cursor-pointer'
                  >
                    Asada La Lucha La Vega, San Carlos
                  </a>
                </span>
                <span className='flex py-1 cursor-pointer'>
                  <SocialIcon
                    url='https://web.whatsapp.com/'
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    target='_blank'
                    bgColor='#333C4D'
                  />
                  &nbsp;(+506) 8709-4950
                </span>
              </div>
              <div className='recruitment mt-12'>
                <h2 className='text-2xl py-2'>
                  <motion.svg
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    variants={{
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          delay: 2.2,
                          duration: 0.7,
                        },
                      },
                      hidden: { opacity: 0, scale: 0 },
                    }}
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-7 w-7 inline'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z'
                      clipRule='evenodd'
                    />
                    <path d='M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z' />
                  </motion.svg>
                  &nbsp;
                  <motion.span
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    variants={{
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          delay: 1.5,
                          duration: 0.7,
                        },
                      },
                      hidden: { opacity: 0, scale: 0 },
                    }}
                  >
                    ¿Te gustaría trabajar con nosotros?
                  </motion.span>
                </h2>
                <motion.p
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  variants={{
                    visible: {
                      opacity: 1,

                      transition: {
                        delay: 2.5,
                        duration: 0.7,
                      },
                    },
                    hidden: { opacity: 0 },
                  }}
                  className='max-w-lg my-4'
                >
                  Si estás interesado en formar parte de un excelente grupo de
                  trabajo y ayudar a nuestra comunidad, por favor déjanos tu
                  información en la siguiente sección:
                </motion.p>
                <motion.button
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  variants={{
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: 3,
                        duration: 1,
                      },
                    },
                    hidden: { opacity: 0, x: 400 },
                  }}
                >
                  <Link
                    to='jobs'
                    className='btn btn-secondary btn-outline btn-sm mt-1 hover:scale-105'
                  >
                    Me interesa&nbsp;
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
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
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Contact;
