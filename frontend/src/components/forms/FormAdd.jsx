import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContext from "../../context/forms/FormContext";
import "moment/locale/es";

function FormAdd() {
  const { addForm, getForms, isLoading, setIsLoading } =
      useContext(FormContext),
    navigate = useNavigate(),
    [fname, setFname] = useState(""),
    [fdesc, setFdesc] = useState(""),
    [fdoc, setFdoc] = useState(""),
    [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (fname.length !== 0 && fdesc.length !== 0 && fdoc.length !== 0)
      setBtnDisabled(false);
    else setBtnDisabled(true);

    setIsLoading(false);
  }, [fname, fdesc, fdoc]);

  const onNameChange = (e) => {
      setFname(e.target.value);
    },
    onDescChange = (e) => {
      setFdesc(e.target.value);
    },
    onFileChange = (e) => {
      setFdoc(e.target.files[0]);
    },
    formReset = () => {
      setFname("");
      setFdesc("");
      setFdoc("");
    },
    onSubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData();
      fd.append("fname", fname);
      fd.append("fdesc", fdesc);
      fd.append("fdoc", fdoc, fdoc.name);

      await addForm(fd);
      await getForms();
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
        Agregar nuevo formulario
      </h2>
      <div className='suggestion-info text-lg'>
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
              placeholder='Nombre del formulario'
              onChange={onNameChange}
              value={fname}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-fdesc'
            >
              Descripci??n
            </label>
            <textarea
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-desc'
              type='text'
              required
              name='fdesc'
              placeholder='Descripci??n breve del formulario'
              onChange={onDescChange}
              value={fdesc}
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
    </>
  );
}

export default FormAdd;
