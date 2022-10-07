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
  const { asada, getAsada, isLoading, getAsadaContactos, contactos } =
    useContext(AsadaContext);

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
    const fetchAsada = async () => {
      await getAsada();
    };

    if (contactos.length === 0) fetchAsada();

    console.log(contactos);
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
      <section className='contact-section mb-20'>
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
                <h2 className='text-2xl py-2'>Buzón de Sugerencias</h2>
                <p className='py-2 max-w-lg text-justify'>
                  En esta sección puede dejarnos cualquier comentario,
                  sugerencia o solicitud que requiera de nuestra atención. Nos
                  pondremos en contacto a la mayor brevedad posible.
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
                <p className='py-2 max-w-lg whitespace-pre'>{schedule}</p>
              </div>
              <div className='info mt-6'>
                <h2 className='text-2xl py-2'>Contactos</h2>
                {contactos.length > 0 &&
                  contactos.map((contacto, index) => (
                    <span key={index} className='flex py-1 cursor-pointer'>
                      {contacto.tipo === "correo" && (
                        <>
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
                            href={"mailto:" + contacto.info}
                            className='cursor-pointer'
                          >
                            {contacto.info}
                          </a>
                        </>
                      )}
                      {contacto.tipo === "facebook" && (
                        <>
                          <SocialIcon
                            url={contacto.info}
                            style={{ width: "1.5rem", height: "1.5rem" }}
                            target='_blank'
                            bgColor='#333C4D'
                          />
                          &nbsp;{" "}
                          <a
                            href={contacto.info}
                            rel='noreferrer'
                            target='_blank'
                            className='cursor-pointer'
                          >
                            {contacto.texto}
                          </a>
                        </>
                      )}
                      {contacto.tipo === "movil" && (
                        <>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                            class='w-6 h-6'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              d='M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'
                            />
                          </svg>
                          &nbsp;{" "}
                          <a
                            href={contacto.info}
                            rel='noreferrer'
                            target='_blank'
                            className='cursor-pointer'
                          >
                            +506{" "}
                            {`${contacto.info.substring(
                              0,
                              4
                            )} ${contacto.info.substring(4)}`}{" "}
                            | {contacto.texto}
                          </a>
                        </>
                      )}
                      {contacto.tipo === "fijo" && (
                        <>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                            class='w-6 h-6'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
                            />
                          </svg>
                          &nbsp;{" "}
                          <a
                            href={contacto.info}
                            rel='noreferrer'
                            target='_blank'
                            className='cursor-pointer'
                          >
                            +506{" "}
                            {`${contacto.info.substring(
                              0,
                              4
                            )} ${contacto.info.substring(4)}`}{" "}
                            | {contacto.texto}
                          </a>
                        </>
                      )}
                      {contacto.tipo === "whatsapp" && (
                        <>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            class='ionicon h-6 w-6'
                            viewBox='0 0 512 512'
                          >
                            <title>Logo Whatsapp</title>
                            <path
                              d='M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z'
                              fill-rule='evenodd'
                            />
                          </svg>
                          &nbsp;{" "}
                          <a
                            href={"https://wa.me/506" + contacto.info}
                            rel='noreferrer'
                            target='_blank'
                            className='cursor-pointer'
                          >
                            +506{" "}
                            {`${contacto.info.substring(
                              0,
                              4
                            )} ${contacto.info.substring(4)}`}{" "}
                            | {contacto.texto}
                          </a>
                        </>
                      )}
                    </span>
                  ))}
                {/*    <span className='flex py-1 cursor-pointer'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 '
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                  </svg>
                  &nbsp;
                  <a href='tel:+50689810536' className='cursor-pointer'>
                    (+506) 8541-0886&nbsp;|&nbsp;8751-2272 - Disponibilidad{" "}
                  </a>
                </span> */}
              </div>
              <div className='recruitment mt-12 '>
                <h2 className='text-2xl py-2 '>
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
                <div className='w-full flex justify-center sm:justify-start'>
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
                      hidden: { opacity: 0, x: 150 },
                    }}
                  >
                    <Link
                      to='curriculum'
                      className='btn btn-secondary btn-outline md:justify-start mt-1 hover:scale-105'
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
        </div>
      </section>
    </motion.div>
  );
}

export default Contact;
