import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InformesContext from "../../context/informes/InformesContext";
import "moment/locale/es";

function InformesAdd() {
  const { addInforme, getInformes, isLoading, setIsLoading } =
      useContext(InformesContext),
    navigate = useNavigate(),
    [iname, setIname] = useState(""),
    [idesc, setIdesc] = useState(""),
    [idoc, setIdoc] = useState(""),
    [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (iname.length !== 0 && idesc.length !== 0 && idoc.length !== 0)
      setBtnDisabled(false);
    else setBtnDisabled(true);

    setIsLoading(false);
  }, [iname, idesc, idoc]);

  const onNameChange = (e) => {
      setIname(e.target.value);
    },
    onDescChange = (e) => {
      setIdesc(e.target.value);
    },
    onFileChange = (e) => {
      setIdoc(e.target.files[0]);
    },
    formReset = () => {
      setIname("");
      setIdesc("");
      setIdoc("");
    },
    onSubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData();
      fd.append("iname", iname);
      fd.append("idesc", idesc);
      fd.append("idoc", idoc, idoc.name);

      await addInforme(fd);
      await getInformes();
      formReset();
    };

  return (
    <>
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
        Agregar nuevo informe
      </h2>
      <div className='suggestion-info text-lg'>
        <form className='w-full max-w-lg' onSubmit={onSubmit}>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-iname'
            >
              Nombre
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-iname'
              type='text'
              required
              name='iname'
              placeholder='Nombre del informe'
              onChange={onNameChange}
              value={iname}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-idesc'
            >
              Descripción
            </label>
            <textarea
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-idesc'
              type='text'
              required
              name='idesc'
              placeholder='Descripción breve del informe'
              onChange={onDescChange}
              value={idesc}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-idoc'
            >
              Documento
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-idoc'
              type='file'
              lang='es'
              name='idoc'
              onChange={onFileChange}
            />
            <small className='ml-1 text-2xs text-gray-500'>
              Formato permitido: .pdf
            </small>
          </div>

          <div className='divider'></div>

          <div className='card-actions justify-start'>
            <button
              type='submit'
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
              disabled={btnDisabled}
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default InformesAdd;
