import { useEffect, useContext, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TransparenciaContext from "../../context/transparencia/TransparenciaContext";

function TransparenciaItem() {
  const {
    documento,
    getDocumento,
    isLoading,
    setDocumento,
    downloadTransparenciaDocument,
    displayDocumento,
    updateDocumento,
    deleteDocumento,
  } = useContext(TransparenciaContext);

  const params = useParams(),
    navigate = useNavigate(),
    { id } = params,
    [newDname, setNewDname] = useState(""),
    [newDdesc, setNewDdesc] = useState(""),
    [newDdoc, setNewDdoc] = useState(""),
    [btnDisabled, setBtnDisabled] = useState(true);
  const { dname, ddesc, ddoc } = documento;

  useEffect(() => {
    const fetchDocumento = async () => await getDocumento(id);

    if (Object.keys(documento).length === 0) {
      fetchDocumento();
      setBtnDisabled(true);
    } else {
      if (dname !== newDname || ddesc !== newDdesc) setBtnDisabled(false);
      else setBtnDisabled(true);

      if (newDname == "" || newDdesc === "") {
        setBtnDisabled(true);
        setNewDname(dname);
        setNewDdesc(ddesc);
      }
    }
  }, [documento, newDname, newDdesc]);

  // This is like 'componentWillUnmount'
  useLayoutEffect(() => {
    return () => {
      setDocumento({});
    };
  }, []);

  const onNewDnameChange = (e) => {
      setNewDname(e.target.value);
    },
    onNewDdescChange = (e) => {
      setNewDdesc(e.target.value);
    },
    onNewDdocChange = (e) => {
      setBtnDisabled(false);
      setNewDdoc(e.target.files[0]);
    },
    downloadDocument = async (e) => {
      e.preventDefault();
      await downloadDocument();
    };

  const displayDocument = async (e) => {
    e.preventDefault();
    await displayDocumento();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    // If newDname is not modified, use the current transparencia document's dname
    if (newDname === "") fd.set("dname", dname);
    // If is modified
    else fd.set("dname", newDname);

    // If newDdesc is not modified, use the current transparencia document's ddesc
    if (newDdesc === "") fd.set("ddesc", ddesc);
    // If is modified
    else fd.set("ddesc", newDdesc);

    if (newDdoc !== "") fd.set("ddoc", newDdoc, newDdoc.name);
    else fd.set("ddoc", null);

    await updateDocumento(fd, id);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Se eliminará de la base de datos el registro del documento de transparencia. Esta acción no se puede revertir.\n ¿Seguro que desea continuar?"
      )
    ) {
      await deleteDocumento();
    }
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
        Editar documento de transparencia
      </h2>

      <div className='suggestion-info text-lg'>
        <form className='w-full max-w-lg' onSubmit={handleSubmit}>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-dname'
            >
              Nombre
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-dname'
              type='text'
              required
              name='dname'
              placeholder='Nombre del documento de transparencia'
              defaultValue={dname}
              onChange={onNewDnameChange}
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
              id='grid-ddesc'
              type='text'
              required
              name='ddesc'
              placeholder='Descripción breve del documento de transparencia'
              defaultValue={ddesc}
              onChange={onNewDdescChange}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-ddoc'
            >
              Documento
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-ddoc'
              type='file'
              name='ddoc'
              onChange={onNewDdocChange}
            />
            <small className='text-xs'>
              Documento actual: {ddoc}
              <br />
              <button
                className='btn btn-primary btn-outline btn-xs'
                onClick={downloadTransparenciaDocument}
                type='button'
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
              &nbsp;&nbsp;
              <button
                className='btn btn-primary btn-xs'
                onClick={displayDocument}
                type='button'
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
            </small>
          </div>

          <div className='divider'></div>

          <div className='card-actions justify-start'>
            <button
              type='submit'
              disabled={btnDisabled}
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
              className='btn btn-error hover:bg-red-200'
              type='button'
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
              &nbsp;Borrar documento
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TransparenciaItem;