import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JobContext from "../../context/jobs/JobContext";
import { motion } from "framer-motion";

function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

// Framer motion variants
const pageVariants = {
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "-100vw",
  },
};
const pageTransition = {
  duration: 0.5,
};

function Jobs() {
  const navigate = useNavigate();

  const { addJob } = useContext(JobContext);

  const [name, setName] = useState(""),
    [lastName, setLastName] = useState(""),
    [email, setEmail] = useState(""),
    [phoneNumber, setPhoneNumber] = useState(""),
    [cv, setCV] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    setInputFilter(
      document.getElementById("grid-phoneNumber"),
      function (value) {
        return /^\d*$/.test(value);
      }
    );
  }, []);

  const onNameChange = (e) => {
      setName(e.target.value);
    },
    onLastNameChange = (e) => {
      setLastName(e.target.value);
    },
    onEmailChange = (e) => {
      setEmail(e.target.value);
    },
    onPhoneNumberChange = (e) => {
      setPhoneNumber(e.target.value);
    },
    onCVChange = (e) => {
      setCV(e.target.files[0]);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.set("name", name);
    fd.set("last_name", lastName);
    fd.set("email", email);
    fd.set("phone_number", phoneNumber);
    fd.set("curriculum", cv, cv.name);

    addJob(fd);
    navigate(-1);
  };

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <section>
        <div className='container mx-auto px-2'>
          <div className='title text-center py-6 text-3xl lg:text-7xl'>
            <h1 className='border-b pb-5'>Trabaja con Nosotros</h1>
          </div>

          <div className='job-form grid place-items-center my-12'>
            <form
              className='w-full max-w-lg'
              autoComplete='off'
              onSubmit={handleSubmit}
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
                    required
                    onChange={onNameChange}
                  />
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
                    id='grid-last_name'
                    type='text'
                    placeholder='Ingresar apellidos aquí'
                    required
                    name='last_name'
                    onChange={onLastNameChange}
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
                    onChange={onEmailChange}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-4'>
                <div className='w-full px-3'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-phoneNumber'
                  >
                    Número de teléfono
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-phoneNumber'
                    placeholder='Ingresar número aquí'
                    required
                    name='phoneNumber'
                    onChange={onPhoneNumberChange}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-4'>
                <div className='w-full px-3'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-cv'
                  >
                    Currículum
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-cv'
                    type='file'
                    placeholder='Curriculum'
                    required
                    name='cv'
                    onChange={onCVChange}
                  />
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
      </section>
    </motion.div>
  );
}

export default Jobs;
