import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JuntaDirectivaContext from "../../context/juntaDirectiva/JuntaDirectivaContext";

function JuntaDirectivaAdd() {
  const { addMember, getMembers, isLoading, setIsLoading } = useContext(
    JuntaDirectivaContext
  );

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [vigency, setVigency] = useState("");
  const [photo, setPhoto] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePositionChange = (e) => setPosition(e.target.value);
  const handleVigencyChange = (e) => setVigency(e.target.value);
  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);

  const dateToTimestamp = (str) => new Date(str).toISOString();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.set("name", name);
    fd.set("last_name", lastName);
    fd.set("position", position);
    fd.set("vigency", dateToTimestamp(vigency));
    fd.append("photo", photo);

    await addMember(fd);
    await getMembers();
    formReset();
  };

  const formReset = () => {
    setName("");
    setLastName("");
    setPosition("");
    setVigency("");
    setPhoto("");
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
        Agregar nuevo miembro
      </h2>
      <div className='text-lg'>
        <form
          className='w-full max-w-lg'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-name'
            >
              Nombre
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-title'
              type='text'
              required
              name='name'
              placeholder='Nombre del miembro'
              onChange={handleNameChange}
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
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-last_name'
              type='text'
              required
              name='last_name'
              placeholder='Apellidos del miembro'
              onChange={handleLastNameChange}
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
              onChange={handleVigencyChange}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase inline tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-position'
            >
              Cargo&nbsp;
            </label>

            <div className='form-control'>
              <select
                className='select select-md select-ghost w-full max-w-xs mb-2'
                onChange={handlePositionChange}
              >
                <option value={"Presidente"} defaultValue={"Presidente"}>
                  Presidente
                </option>
                <option value={"Vice Presidente"}>Vice Presidente</option>
                <option value={"Secretario(a)"}>Secretario(a)</option>
                <option value={"Tesorero(a)"}>Tesorero(a)</option>
                <option value={"Fiscal1"}>Fiscal 1</option>
                <option value={"Fiscal2"}>Fiscal 2</option>
                <option value={"Vocal 1"}>Vocal 1</option>
                <option value={"Vocal 2"}>Vocal 2</option>
              </select>
            </div>
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-photo'
            >
              Foto
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-photo'
              type='file'
              lang='es'
              name='photo'
              onChange={handlePhotoChange}
            />
            <small className='ml-1 text-2xs text-gray-500'>
              Formato permitido: .png, .jpg, .jpeg
            </small>
          </div>

          <div className='divider'></div>

          <div className='card-actions justify-start'>
            <button
              type='submit'
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default JuntaDirectivaAdd;
