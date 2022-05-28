import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TanksContext from "../../context/tanks/TanksContext";

function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

function TankAdd() {
  const { addTank, getTanks, isLoading, setIsLoading } =
    useContext(TanksContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [photos, setPhotos] = useState("");

  useEffect(() => {
    setInputFilter(document.getElementById("grid-capacity"), function (value) {
      return /^\d*$/.test(value);
    });
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.set("name", name);
    fd.set("location", location);
    fd.set("capacity", capacity);

    photos.forEach((photo) => fd.append("images", photo, photos.filename));

    await addTank(fd);
    await getTanks();
  };

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
          Agregar nuevo tanque de almacenamiento
        </h2>
        <div className='suggestion-info text-lg'>
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
                placeholder='Nombre del tanque'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-location'
              >
                Ubicación
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-location'
                type='text'
                required
                name='location'
                placeholder='Ubicación del tanque'
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-capacity'
              >
                Capacidad en litros
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-capacity'
                type='text'
                required
                name='capacity'
                placeholder='Ingresar litros (número entero positivo)'
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>

            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-photos'
              >
                Fotos
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-photos'
                type='file'
                multiple
                lang='es'
                name='photos'
                onChange={(e) => setPhotos(Array.from(e.target.files))}
              />
              <small className='ml-1 text-2xs text-gray-500'>
                Formato permitido: .jpg, .jpeg, .png
              </small>
            </div>

            <div className='divider'></div>

            <div className='card-actions justify-start'>
              <button
                type='submit'
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
                &nbsp;Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TankAdd;
