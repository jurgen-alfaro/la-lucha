import { useEffect, useContext, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobContext from "../../context/jobs/JobContext";
import Spinner from "../shared/Spinner";
import { toast } from "react-toastify";

function JobItem() {
  const {
    job,
    getJob,
    setJob,
    updateJob,
    isLoading,
    downloadCurriculum,
    displayCurriculum,
  } = useContext(JobContext);

  const [estado, setEstado] = useState(1);
  const [btnDisable, setBtnDisable] = useState(true);

  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const { name, last_name, email, phone_number, curriculum, is_pending } = job;

  useEffect(() => {
    const fetchJob = async () => await getJob(id);
    const checkIf = () =>
      Number(estado) === Number(is_pending)
        ? setBtnDisable(true)
        : setBtnDisable(false);

    if (Object.keys(job).length === 0) {
      fetchJob();
    }

    checkIf();
  }, [job, estado]);

  useLayoutEffect(() => {
    return () => {
      setJob({});
    };
  }, []);

  const downloadCV = async (e) => {
    e.preventDefault();
    await downloadCurriculum();
  };

  const displayCV = async (e) => {
    e.preventDefault();
    await displayCurriculum();
  };

  const onChange = (e) => {
    setEstado(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    job.is_pending = estado;

    const response = await updateJob(job);

    const { name, last_name } = await response.updatedJob[0];

    toast.info(`Se ha actualizado la solicitud de '${name} ${last_name}'`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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
            Información de Solicitud de Empleo
          </h2>

          <div className='suggestion-info text-lg'>
            <form className='w-full max-w-lg' onSubmit={onSubmit}>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-fname'
                >
                  Nombre
                </label>
                <input
                  className='appearance-none cursor-not-allowed block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-fname'
                  type='text'
                  readOnly
                  name='name'
                  placeholder='Nombre del formulario'
                  defaultValue={name}
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
                  className='appearance-none cursor-not-allowed  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-last_name'
                  type='text'
                  readOnly
                  name='last_name'
                  placeholder='Descripción breve del formulario'
                  defaultValue={last_name}
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
                  className='appearance-none cursor-not-allowed  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-email'
                  type='text'
                  readOnly
                  name='email'
                  placeholder='Descripción breve del formulario'
                  defaultValue={email}
                />
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-phone_number'
                >
                  Teléfono
                </label>
                <input
                  className='appearance-none cursor-not-allowed  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-phone_number'
                  type='text'
                  readOnly
                  name='phone_number'
                  placeholder='Descripción breve del formulario'
                  defaultValue={phone_number}
                />
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-fdoc'
                >
                  Curriculum
                </label>
                <button
                  className='btn btn-primary btn-outline btn-xs'
                  onClick={displayCV}
                >
                  Ver&nbsp;
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                    <path
                      fillRule='evenodd'
                      d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                &nbsp;|&nbsp;
                <button
                  className='btn btn-primary btn-outline btn-xs'
                  onClick={downloadCV}
                >
                  Descargar&nbsp;
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
              <div className='w-full px-3 mt-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-message'
                >
                  {`Estado actual: ${
                    Number(is_pending) === 1 ? "Pendiente" : "Revisado"
                  }`}
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
                  className={`btn btn-primary ${isLoading ? "loading" : ""}`}
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

export default JobItem;
