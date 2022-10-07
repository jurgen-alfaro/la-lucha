import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AsadaContext from "../../context/asada/asadaContext";

const selectOptions = [
  { value: "NA", text: "-- SELECCIONAR --", selected: true, disabled: true },
  { value: "correo", text: "Correo" },
  { value: "fijo", text: "Fijo" },
  { value: "movil", text: "Móvil" },
  { value: "facebook", text: "Facebook" },
  { value: "whatsapp", text: "WhatsApp" },
];

function ContactoUpdate() {
  const {
    contacto,
    getAsadaContacto,
    isLoading,
    setIsLoading,
    patchAsadaContacto,
    deleteAsadaContacto,
  } = useContext(AsadaContext);
  const { info, tipo, texto } = contacto;
  const [newTipo, setNewTipo] = useState("");
  const [newInfo, setNewInfo] = useState("");
  const [newTexto, setNewTexto] = useState("");
  const [selected, setSelected] = useState(tipo);
  const infoInputDOM = useRef();
  const textoInputDOM = useRef();
  const tipoSelectDOM = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    setIsLoading(false);
    const fetchContacto = async () => {
      await getAsadaContacto(id);
    };
    fetchContacto();
  }, []); // This will be executed the first time the component renders

  useEffect(() => {
    if (tipo) {
      const x = selectOptions.filter((option) => option.value === tipo)[0];
      setSelected(x.value);
    }
  }, [tipo]);

  const onChange = (e) => {
    const t = e.target.value;
    if (t === "NA") {
      infoInputDOM.current.disabled = true;
      infoInputDOM.current.value = null;
    } else {
      infoInputDOM.current.disabled = false;
    }

    switch (t) {
      case "correo":
        infoInputDOM.current.placeholder = "correo@ejemplo.com";
        infoInputDOM.current.type = "email";
        setSelected(t);
        break;
      case "movil":
        infoInputDOM.current.placeholder = "Teléfono móvil. Ej, 80005600";
        infoInputDOM.current.type = "number";
        setSelected(t);
        break;
      case "fijo":
        infoInputDOM.current.placeholder = "Teléfono fijo. Ej, 24004500";
        infoInputDOM.current.type = "number";
        setSelected(t);
        break;
      case "facebook":
        infoInputDOM.current.placeholder =
          "Ingresar enlace del perfil de Facebook";
        infoInputDOM.current.type = "text";
        setSelected(t);
        break;
      case "whatsapp":
        infoInputDOM.current.placeholder = "Ingresar número de WhatsApp";
        infoInputDOM.current.type = "number";
        setSelected(t);
        break;
      default:
        infoInputDOM.current.placeholder = "";
        setSelected("NA");
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let contactoObj = {};
    if (newTipo === "") contactoObj.tipo = tipo;
    else contactoObj.tipo = newTipo;
    if (newInfo === "") contactoObj.info = info;
    else contactoObj.info = newInfo;
    if (newTexto === "") contactoObj.texto = texto;
    else contactoObj.texto = newTexto;

    try {
      await patchAsadaContacto(contactoObj);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Se eliminará de la base de datos el registro del contacto. Esta acción no se puede revertir.\n ¿Seguro que desea continuar?"
      )
    ) {
      await deleteAsadaContacto();
    }
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
        Editar contacto
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
              className='select select-bordered select-md w-full'
              id='grid-tipo'
              onChange={onChange}
              ref={tipoSelectDOM}
              value={selected}
            >
              {selectOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.text}
                </option>
              ))}
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
              placeholder='Detalle del contacto'
              onChange={(e) => setNewInfo(e.target.value)}
              defaultValue={info}
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
              onChange={(e) => setNewTexto(e.target.value)}
              defaultValue={texto}
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
              &nbsp;Guardar cambios
            </button>
            <button
              type='button'
              className={`btn btn-error`}
              onClick={handleDelete}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
              &nbsp;Borrar contacto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactoUpdate;
