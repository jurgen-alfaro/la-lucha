import { useEffect, useContext, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormContext from "../../context/forms/FormContext";

function FormItem() {
  const {
    form,
    getForm,
    isLoading,
    downloadFormDocument,
    setForm,
    updateForm,
  } = useContext(FormContext);

  const params = useParams(),
    navigate = useNavigate(),
    { id } = params,
    [newFname, setNewFname] = useState(""),
    [newFdesc, setNewFdesc] = useState(""),
    [newFdoc, setNewFdoc] = useState(""),
    [btnDisabled, setBtnDisabled] = useState(true);
  const { fname, fdesc, fdoc } = form;

  useEffect(() => {
    const fetchForm = async () => await getForm(id);

    if (Object.keys(form).length === 0) {
      fetchForm();
      setBtnDisabled(true);
    } else {
      if (fname !== newFname || fdesc !== newFdesc) setBtnDisabled(false);
      else setBtnDisabled(true);

      if (newFname == "" || newFdesc === "") {
        setBtnDisabled(true);
        setNewFname(fname);
        setNewFdesc(fdesc);
      }
    }
  }, [form, newFname, newFdesc]);

  // This is like 'componentWillUnmount'
  useLayoutEffect(() => {
    return () => {
      setForm({});
    };
  }, []);

  const onNewFnameChange = (e) => {
      setNewFname(e.target.value);
    },
    onNewFdescChange = (e) => {
      setNewFdesc(e.target.value);
    },
    onNewFdocChange = (e) => {
      setBtnDisabled(false);
      setNewFdoc(e.target.files[0]);
    },
    downloadDocument = async (e) => {
      e.preventDefault();
      await downloadFormDocument();
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    // If newFname is not modified, use the current form's fname
    if (newFname === "") fd.set("fname", fname);
    // If is modified
    else fd.set("fname", newFname);

    // If newFdesc is not modified, use the current form's fdesc
    if (newFdesc === "") fd.set("fdesc", fdesc);
    // If is modified
    else fd.set("fdesc", newFdesc);

    if (newFdoc !== "") fd.set("fdoc", newFdoc, newFdoc.name);
    else fd.set("fdoc", null);

    updateForm(fd, id);
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
        Editar formulario
      </h2>

      <div className='suggestion-info text-lg'>
        <form className='w-full max-w-lg' onSubmit={handleSubmit}>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-fname'
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
              defaultValue={fname}
              onChange={onNewFnameChange}
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
              id='grid-fdesc'
              type='text'
              required
              name='fdesc'
              placeholder='Descripción breve del formulario'
              defaultValue={fdesc}
              onChange={onNewFdescChange}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-fdoc'
            >
              Documento
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-fdoc'
              type='file'
              name='fdoc'
              onChange={onNewFdocChange}
            />
            <small className='text-xs'>
              Documento actual: {fdoc}
              <br />
              <button
                className='btn btn-primary btn-outline btn-xs'
                onClick={downloadDocument}
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
            </small>
          </div>

          <div className='divider'></div>

          <div className='card-actions justify-start'>
            <button
              type='submit'
              disabled={btnDisabled}
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormItem;
