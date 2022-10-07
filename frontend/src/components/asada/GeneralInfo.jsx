import { useEffect, useState, useContext } from "react";
import asadaContext from "../../context/asada/asadaContext";
import Spinner from "../shared/Spinner";

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

function GeneralInfo() {
  const { asada, getAsada, updateAsada, isLoading } = useContext(asadaContext);

  const [newMission, setNewMission] = useState("");
  const [newVision, setNewVision] = useState("");
  const [newHistory, setNewHistory] = useState("");
  const [newSchedule, setNewSchedule] = useState("");
  const [newExtension, setNewExtension] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newUsers, setNewUsers] = useState(0);
  const [newTanks, setNewTanks] = useState(0);
  const [newGradientes, setNewGradientes] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const {
    mision,
    vision,
    historia,
    schedule,
    extension,
    address,
    users,
    tanks,
    gradientes,
  } = asada;

  useEffect(() => {
    const fetchAsada = async () => await getAsada();

    if (Object.keys(asada).length === 0) fetchAsada();
    else {
      /*   if (asada) {
        setInputFilter(document.getElementById("grid-users"), function (value) {
          return /^\d*$/.test(value);
        });
        setInputFilter(document.getElementById("grid-tanks"), function (value) {
          return /^\d*$/.test(value);
        });
        setInputFilter(
          document.getElementById("grid-gradientes"),
          function (value) {
            return /^\d*$/.test(value);
          }
        );
      } */

      if (
        mision !== newMission ||
        vision !== newVision ||
        historia !== newHistory ||
        schedule !== newSchedule ||
        extension !== newExtension ||
        address !== newAddress ||
        users !== newUsers ||
        tanks !== newTanks ||
        gradientes !== newGradientes
      )
        setBtnDisabled(false);
      else setBtnDisabled(true);

      if (
        newMission === "" ||
        newVision === "" ||
        newHistory === "" ||
        newSchedule === "" ||
        newExtension === "" ||
        newAddress === "" ||
        newUsers === 0 ||
        newTanks === 0 ||
        newGradientes === 0
      ) {
        setBtnDisabled(true);
        setNewMission(mision);
        setNewVision(vision);
        setNewHistory(historia);
        setNewSchedule(schedule);
        setNewExtension(extension);
        setNewAddress(address);
        setNewUsers(users);
        setNewTanks(tanks);
        setNewGradientes(gradientes);
      }
    }
  }, [
    asada,
    newMission,
    newVision,
    newHistory,
    newSchedule,
    newExtension,
    newAddress,
    newUsers,
    newTanks,
    newGradientes,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = {
      mision: newMission,
      vision: newVision,
      historia: newHistory,
      schedule: newSchedule,
      extension: newExtension,
      address: newAddress,
      users: newUsers,
      tanks: newTanks,
      gradientes: newGradientes,
    };

    updateAsada(form);
  };

  return (
    <div className='suggestion-info text-lg'>
      <form className='w-full max-w-lg' onSubmit={handleSubmit}>
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-mision'
          >
            Misión
          </label>
          <textarea
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-mision'
            type='text'
            required
            name='mision'
            placeholder='Misión de la ASADA'
            defaultValue={mision}
            onChange={(e) => setNewMission(e.target.value)}
          />
        </div>
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-vision'
          >
            Visión
          </label>
          <textarea
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-vision'
            type='text'
            required
            name='vision'
            placeholder='Misión de la ASADA'
            defaultValue={vision}
            onChange={(e) => setNewVision(e.target.value)}
          />
        </div>
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-history'
          >
            Historia
          </label>
          <textarea
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-history'
            type='text'
            required
            name='history'
            placeholder='Historia de la ASADA'
            defaultValue={historia}
            onChange={(e) => setNewHistory(e.target.value)}
          />
        </div>
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-extension'
          >
            Extensión
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-extension'
            type='text'
            required
            name='extension'
            placeholder='Extensión de la ASADA'
            defaultValue={extension}
            onChange={(e) => setNewExtension(e.target.value)}
          />
        </div>
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-users'
          >
            Usuarios abastecidos
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-users'
            type='text'
            required
            name='users'
            placeholder='# de usuarios abastecidos'
            defaultValue={users}
            onChange={(e) => setNewUsers(e.target.value)}
          />
        </div>
        <div className='flex flex-wrap w-full'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-tanks'
            >
              Tanques de Almacenamiento
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='grid-tanks'
              type='text'
              placeholder='# de tanques '
              name='tanks'
              required
              defaultValue={tanks}
              onChange={(e) => setNewTanks(e.target.value)}
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-gradientes'
            >
              Quiebra gradientes
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-gradientes'
              type='text'
              placeholder='# de quiebra gradientes'
              name='gradientes'
              required
              defaultValue={gradientes}
              onChange={(e) => setNewGradientes(e.target.value)}
            />
          </div>
        </div>
        <div className='divider'></div>
        <div className='card-actions justify-start'>
          <button
            type='submit'
            disabled={btnDisabled}
            className={`btn btn-primary ${isLoading ? "loading" : ""}`}
          >
            Guardar cambios&nbsp;
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z' />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default GeneralInfo;
