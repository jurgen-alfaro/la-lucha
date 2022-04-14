import { useEffect, useContext, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReglamentosContext from "../../context/reglamentos/ReglamentosContext";

function ReglamentosItem() {
  const {
    reglamento,
    getReglamento,
    isLoading,
    setReglamento,
    downloadReglamentoDocument,
    displayReglamento,
    updateReglamento,
  } = useContext(ReglamentosContext);

  const params = useParams(),
    navigate = useNavigate(),
    { id } = params,
    [newRname, setNewRname] = useState(""),
    [newRdesc, setNewRdesc] = useState(""),
    [newRdoc, setNewRdoc] = useState(""),
    [btnDisabled, setBtnDisabled] = useState(true);
  const { rname, rdesc, rdoc } = reglamento;

  useEffect(() => {
    const fetchReglamento = async () => await getReglamento(id);

    if (Object.keys(reglamento).length === 0) {
      fetchReglamento();
      setBtnDisabled(true);
    } else {
      if (rname !== newRname || rdesc !== newRdesc) setBtnDisabled(false);
      else setBtnDisabled(true);

      if (newRname == "" || newRdesc === "") {
        setBtnDisabled(true);
        setNewRname(rname);
        setNewRdesc(rdesc);
      }
    }
  }, [reglamento, newRname, newRdesc]);

  // This is like 'componentWillUnmount'
  useLayoutEffect(() => {
    return () => {
      setReglamento({});
    };
  }, []);

  const onNewRnameChange = (e) => {
      setNewRname(e.target.value);
    },
    onNewRdescChange = (e) => {
      setNewRdesc(e.target.value);
    },
    onNewRdocChange = (e) => {
      setBtnDisabled(false);
      setNewRdoc(e.target.files[0]);
    },
    downloadDocument = async (e) => {
      e.preventDefault();
      await downloadReglamentoDocument();
    };

  const displayReglament = async (e) => {
    e.preventDefault();
    await displayReglamento();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    // If newRname is not modified, use the current reglamentos' rname
    if (newRname === "") fd.set("rname", rname);
    // If is modified
    else fd.set("rname", newRname);

    // If newRdesc is not modified, use the current reglamentos' rdesc
    if (newRdesc === "") fd.set("rdesc", rdesc);
    // If is modified
    else fd.set("rdesc", newRdesc);

    if (newRdoc !== "") fd.set("rdoc", newRdoc, newRdoc.name);
    else fd.set("rdoc", null);

    await updateReglamento(fd, id);
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
        Editar reglamento
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
              placeholder='Nombre del reglamento'
              defaultValue={rname}
              onChange={onNewRnameChange}
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
              id='grid-rdesc'
              type='text'
              required
              name='rdesc'
              placeholder='Descripción breve del reglamento'
              defaultValue={rdesc}
              onChange={onNewRdescChange}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-rdoc'
            >
              Documento
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-rdoc'
              type='file'
              name='rdoc'
              onChange={onNewRdocChange}
            />
            <small className='text-xs'>
              Documento actual: {rdoc}
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
              &nbsp;&nbsp;
              <button
                className='btn btn-primary btn-xs'
                onClick={displayReglament}
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
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ReglamentosItem;