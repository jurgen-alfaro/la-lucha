import { useState, useContext } from "react";
import { SocialIcon } from "react-social-icons";
import Map from "../components/maps/Map";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //React-Toastify CSS
import SuggestionContext from "../context/suggestions/SuggestionContext";

function Contact() {
  const { addSuggestion } = useContext(SuggestionContext);

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { name, last_name, email, subject, message } = formData;

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
                <form className='w-full max-w-lg' onSubmit={onSubmit}>
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
              <address className='py-2 max-w-lg'>
                25m Sur, 200m Este de algun lugar en la comunidad de la Tigra.
                La Tigra de la Vega de San Carlos
              </address>
            </div>
            <div className='info mt-6'>
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
