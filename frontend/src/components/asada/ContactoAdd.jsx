import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AsadaContext from "../../context/asada/asadaContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //React-Toastify CSS

function ContactoAdd() {
  const { asada, createAsadaContacto, isLoading, setIsLoading } =
    useContext(AsadaContext);
  const [tipo, setTipo] = useState("");
  const [info, setInfo] = useState("");
  const [texto, setTexto] = useState("");
  const infoInputDOM = useRef();
  const textoInputDOM = useRef();
  const tipoSelectDOM = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(false);
    infoInputDOM.current.disabled = true;
  }, []);

  const onChange = (e) => {
    const tipo = e.target.value;
    if (tipo === "NA") {
      infoInputDOM.current.disabled = true;
      infoInputDOM.current.value = null;
    } else {
      infoInputDOM.current.disabled = false;
    }
    setTipo(tipo);
    switch (tipo) {
      case "correo":
        infoInputDOM.current.placeholder = "correo@ejemplo.com";
        infoInputDOM.current.type = "email";
        break;
      case "movil":
        infoInputDOM.current.placeholder = "Teléfono móvil. Ej, 80005600";
        infoInputDOM.current.type = "number";
        break;
      case "fijo":
        infoInputDOM.current.placeholder = "Teléfono fijo. Ej, 24004500";
        infoInputDOM.current.type = "number";
        break;
      case "facebook":
        infoInputDOM.current.placeholder =
          "Ingresar enlace del perfil de Facebook";
        infoInputDOM.current.type = "text";
        break;
      case "whatsapp":
        infoInputDOM.current.placeholder = "Ingresar número de WhatsApp";
        infoInputDOM.current.type = "number";
        break;
      default:
        infoInputDOM.current.placeholder = "";
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const contacto = {
      info,
      texto,
      tipo,
      idasada: 1,
    };

    try {
      await createAsadaContacto(contacto);
      toast.success("Contacto creado", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formReset();
    } catch (error) {
      console.log(error);
    }
  };

  const formReset = () => {
    setInfo("");
    setTexto("");
    setTipo("");
    tipoSelectDOM.current.value = "NA";
    infoInputDOM.current.value = "";
    textoInputDOM.current.value = "";
  };

  return (
    <div>
      <h2 className='text-2xl font-bold card-title mb-3'>
        <button
          onClick={() => navigate(-1)}
          className='btn btn-outline btn-secondary btn-sm hover:text-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 '
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        Agregar nuevo contacto
      </h2>
      <div className='text-lg'>
        <form className='w-full max-w-lg' onSubmit={onSubmit}>
          <div className='w-full px-3 mb-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-tipo'
            >
              Tipo
            </label>
            <select
              className='select select-bordered select-md w-full '
              id='grid-tipo'
              onChange={onChange}
              defaultValue='NA'
              ref={tipoSelectDOM}
            >
              <option value='NA'>-- SELECCIONAR --</option>
              <option value='correo'>Correo Electrónico</option>
              <option value='fijo'>Fijo</option>
              <option value='movil'>Móvil</option>
              <option value='facebook'>Facebook</option>
              <option value='whatsapp'>WhatsApp</option>
            </select>
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-info'
            >
              Info
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-info'
              type='text'
              ref={infoInputDOM}
              required
              name='info'
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-texto'
            >
              Texto
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-texto'
              type='text'
              required
              ref={textoInputDOM}
              name='texto'
              placeholder='Información a mostrar en la página'
              onChange={(e) => setTexto(e.target.value)}
            />
          </div>

          <div className='divider'></div>

          <div className='card-actions justify-start'>
            <button
              type='submit'
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
            >
              {!isLoading ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z' />
                </svg>
              ) : (
                <></>
              )}
              &nbsp;Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactoAdd;
