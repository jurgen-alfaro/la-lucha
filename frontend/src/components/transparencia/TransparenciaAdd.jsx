import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransparenciaContext from "../../context/transparencia/TransparenciaContext";
import "moment/locale/es";

function TransparenciaAdd() {
  const { addDocumento, getDocumentos, isLoading, setIsLoading } =
      useContext(TransparenciaContext),
    navigate = useNavigate(),
    [dname, setDname] = useState(""),
    [ddesc, setDdesc] = useState(""),
    [ddoc, setDdoc] = useState(""),
    [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (dname.length !== 0 && ddesc.length !== 0 && ddoc.length !== 0)
      setBtnDisabled(false);
    else setBtnDisabled(true);

    setIsLoading(false);
  }, [dname, ddesc, ddoc]);

  const onNameChange = (e) => {
      setDname(e.target.value);
    },
    onDescChange = (e) => {
      setDdesc(e.target.value);
    },
    onFileChange = (e) => {
      setDdoc(e.target.files[0]);
    },
    formReset = () => {
      setDname("");
      setDdesc("");
      setDdoc("");
    },
    onSubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData();
      fd.append("dname", dname);
      fd.append("ddesc", ddesc);
      fd.append("ddoc", ddoc, ddoc.name);

      await addDocumento(fd);
      await getDocumentos();
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
        Agregar nuevo documento de transparencia
      </h2>
      <div className='text-lg'>
        <form className='w-full max-w-lg' onSubmit={onSubmit}>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-name'
            >
              Nombre
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-fname'
              type='text'
              required
              name='fname'
              placeholder='Nombre del documento'
              onChange={onNameChange}
              value={dname}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-fdesc'
            >
              Descripción
            </label>
            <textarea
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-desc'
              type='text'
              required
              name='fdesc'
              placeholder='Descripción breve del documento'
              onChange={onDescChange}
              value={ddesc}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-email'
            >
              Documento
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-fdoc'
              type='file'
              lang='es'
              name='fdoc'
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

export default TransparenciaAdd;
