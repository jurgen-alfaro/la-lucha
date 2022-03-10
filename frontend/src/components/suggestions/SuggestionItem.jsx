import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SuggestionContext from "../../context/suggestions/SuggestionContext";
import Spinner from "../shared/Spinner";
import "moment/locale/es";
import { toast } from "react-toastify";
import Moment from "react-moment";

function SuggestionItem() {
  const { suggestion, isLoading, getSuggestion, updateSuggestion } =
    useContext(SuggestionContext);

  const navigate = useNavigate();
  const params = useParams();

  const [estado, setEstado] = useState(suggestion.is_pending);
  const [btnDisable, setBtnDisable] = useState(true);

  if (isLoading && Object.keys(suggestion).length === 0) {
    getSuggestion(params.id);
  }

  const onChange = (e) => {
    setEstado(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    suggestion.is_pending = estado;

    const response = await updateSuggestion(suggestion);

    const { name, last_name, subject } = await response.updatedSuggestion[0];

    toast.info(
      `Se ha actualizado la sugerencia de ${name} ${last_name} con el asunto '${subject}'`,
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
  };

  const {
    name,
    email,
    last_name,
    subject,
    message,
    is_pending,
    created_at,
    updated_at,
  } = suggestion;

  useEffect(() => {
    const checkIf = async () => {
      estado === is_pending ? setBtnDisable(true) : setBtnDisable(false);
    };

    checkIf();
  }, [estado, suggestion]);

  if (!isLoading) {
    return (
      <div className='rounded-lg shadow-lg card bg-base-100'>
        <div className='card-body'>
          <h2 className='text-2xl my-4 font-bold card-title'>
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
            Detalle de comentario #{suggestion.idsuggestions}
          </h2>
          <div className='suggestion-info text-lg'>
            <form className='w-full max-w-lg' onSubmit={onSubmit}>
              <div className='form-control text-sm mb-5'>
                <p>
                  Fecha de emisión:
                  <span>
                    &nbsp;
                    <Moment locale='es' fromNow format='DD/MM/YYYY hh:mm:ss a'>
                      {created_at}
                    </Moment>
                    &nbsp;|&nbsp;
                    <Moment locale='es' fromNow>
                      {created_at}
                    </Moment>
                  </span>
                </p>
                <p>
                  Última actualización:
                  <span>
                    &nbsp;
                    <Moment locale='es' fromNow format='DD/MM/YYYY hh:mm:ss a'>
                      {updated_at}
                    </Moment>
                    &nbsp;|&nbsp;
                    <Moment locale='es' fromNow>
                      {updated_at}
                    </Moment>
                  </span>
                </p>
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-name'
                >
                  Nombre
                </label>
                <input
                  disabled
                  className='appearance-none block w-full cursor-not-allowed bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-name'
                  type='text'
                  required
                  name='name'
                  value={name}
                />
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-last_name'
                >
                  Apellidos
                </label>
                <input
                  disabled
                  className='appearance-none block w-full cursor-not-allowed bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-last_name'
                  type='text'
                  required
                  name='last_name'
                  value={last_name}
                />
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-email'
                >
                  Correo electrónico
                </label>
                <input
                  disabled
                  className='appearance-none block w-full cursor-not-allowed bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-email'
                  type='email'
                  required
                  name='email'
                  value={email}
                />
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-subject'
                >
                  Asunto
                </label>
                <input
                  disabled
                  className='appearance-none block w-full cursor-not-allowed bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-subject'
                  type='text'
                  required
                  name='subject'
                  value={subject}
                />
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-message'
                >
                  Asunto
                </label>
                <textarea
                  disabled
                  className='appearance-none block w-full cursor-not-allowed bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-message'
                  required
                  name='message'
                  value={message}
                />
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-message'
                >
                  {`Estado actual: ${is_pending ? "Pendiente" : "Revisado"}`}
                </label>

                <div className='form-control'>
                  <select
                    className='select select-ghost w-full max-w-xs'
                    onChange={onChange}
                    value={estado}
                  >
                    <option value={1}>Pendiente</option>
                    <option value={0}>Revisado</option>
                  </select>
                </div>
              </div>
              <div className='divider'></div>

              <div className='card-actions justify-start'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={btnDisable}
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default SuggestionItem;
