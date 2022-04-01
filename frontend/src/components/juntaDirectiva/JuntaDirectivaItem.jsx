import { useEffect, useContext, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JuntaDirectivaContext from "../../context/juntaDirectiva/JuntaDirectivaContext";
import Spinner from "../shared/Spinner";

function JuntaDirectivaItem() {
  const {
    member,
    isLoading,
    getMember,
    setMember,
    updateMember,
    deleteMember,
  } = useContext(JuntaDirectivaContext);
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newVigency, setNewVigency] = useState("");
  const [newPhoto, setNewPhoto] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const { name, last_name, position, vigency, photo } = member;

  useEffect(() => {
    const fetchMember = async () => await getMember(id);

    if (Object.keys(member).length !== 0) {
      if (vigency !== undefined) {
        const shortDate = vigency.substring(0, 10).split("-");
        const formattedDate = `${shortDate[0]}-${shortDate[1]}-${shortDate[2]}`;
        document.getElementById("grid-vigency").value = formattedDate;
      }
    } else fetchMember();
  }, [vigency]);

  useLayoutEffect(() => {
    return () => {
      setMember({});
    };
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Se eliminará de la base de datos el registro del miembro de la Junta Directiva. \n ¿Seguro que desea continuar?"
      )
    ) {
      await deleteMember();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    // If name is not modified, use the current member's name
    if (newName === "") fd.set("name", name);
    // If is modified
    else fd.set("name", newName);

    if (newLastName === "") fd.set("last_name", last_name);
    else fd.set("last_name", newLastName);

    if (newPosition === "") fd.set("position", position);
    else fd.set("position", newPosition);

    if (newVigency === "") fd.set("vigency", vigency);
    else fd.set("vigency", newVigency);

    if (newVigency === "") fd.set("vigency", vigency);
    else fd.set("vigency", newVigency);

    if (newPhoto !== "") fd.set("photo", newPhoto, newPhoto.name);
    else fd.set("photo", null);

    await updateMember(fd);
  };

  const onNameChange = (e) => setNewName(e.target.value);

  const onLastNameChange = (e) => setNewLastName(e.target.value);

  const onPositionChange = (e) => setNewPosition(e.target.value);

  const onVigencyChange = (e) => setNewVigency(e.target.value);

  const onPhotoChange = (e) => setNewPhoto(e.target.files[0]);

  if (Object.keys(member).length !== 0) {
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
          Editar información de miembro
        </h2>

        <div className='text-lg'>
          <form className='w-full max-w-lg' onSubmit={handleSubmit}>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-name'
              >
                Nombre
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-name'
                type='text'
                required
                name='name'
                placeholder='Nombre del miembro'
                defaultValue={name}
                onChange={onNameChange}
              />
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-desc'
              >
                Apellidos
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-desc'
                type='text'
                required
                name='desc'
                placeholder='Apellidos del miembro'
                defaultValue={last_name}
                onChange={onLastNameChange}
              />
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-vigency'
              >
                Vigencia
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-vigency'
                type='date'
                required
                name='vigency'
                placeholder='Vigencia'
                defaultValue={vigency}
                onChange={onVigencyChange}
              />
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase inline tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-message'
              >
                Cargo&nbsp;
              </label>

              <div className='form-control'>
                {position !== undefined && (
                  <select
                    className='select select-md select-ghost w-full max-w-xs mb-2 '
                    defaultValue={position}
                    onChange={onPositionChange}
                  >
                    <option value={"Presidente"}>Presidente</option>
                    <option value={"Vice Presidente"}>Vice Presidente</option>
                    <option value={"Secretario(a)"}>Secretario(a)</option>
                    <option value={"Tesorero(a)"}>Tesorero(a)</option>
                    <option value={"Vocal 1"}>Vocal 1</option>
                    <option value={"Vocal 2"}>Vocal 2</option>
                  </select>
                )}
              </div>
            </div>
            <div className='px-3 '>
              <label
                className='block uppercase inline tracking-wide text-gray-700 text-xs font-bold mb-2 '
                htmlFor='grid-photos'
              >
                Foto
              </label>
              <div className='p-2 mb-3 h-[380px]'>
                <img
                  src={`http://localhost:5000/junta/${photo}`}
                  alt='Member photo'
                  className='object-cover h-full w-full'
                />
              </div>
              <div className='form-control'>
                <input
                  className='appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-photos'
                  type='file'
                  onChange={onPhotoChange}
                />
              </div>
            </div>
            <div className='divider'></div>

            <div className='card-actions justify-start'>
              <button
                className={`btn btn-primary  ${isLoading ? "loading" : ""}`}
                type='submit'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z' />
                </svg>
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
                &nbsp;Borrar miembro
              </button>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return <Spinner />;
  }
}

export default JuntaDirectivaItem;
