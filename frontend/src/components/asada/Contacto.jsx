import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AsadaContext from "../../context/asada/asadaContext";
import ContactoTable from "./ContactoTable";

function Contacto() {
  const { isLoading, asada, getAsada, patchAsada } = useContext(AsadaContext);
  const [newSchedule, setNewSchedule] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { schedule, address } = asada;

  useEffect(() => {
    const fetchAsada = async () => await getAsada();

    if (Object.keys(asada).length === 0) fetchAsada();
    else {
      if (schedule !== newSchedule || address !== newAddress)
        setBtnDisabled(false);
      else setBtnDisabled(true);

      if (newSchedule === "" || newAddress === "") {
        setBtnDisabled(true);
        setNewSchedule(schedule);
        setNewAddress(address);
      }
    }
  }, [asada, newSchedule, newAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = {
      schedule: newSchedule,
      address: newAddress,
    };

    patchAsada(form);
  };

  return (
    <div className='text-lg'>
      <div className='h-10 w-full max-w-lg flex justify-between'>
        <p>Contactos</p>
        <Link to={"add"} className={`btn btn-primary btn-sm }`}>
          Agregar &nbsp;
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z'
              clipRule='evenodd'
            />
          </svg>
        </Link>
      </div>
      <div className='overflow-x-auto mb-3'>
        <ContactoTable />
      </div>
      <div className='divider max-w-xl'></div>
      <div className='w-full max-w-xl'>
        <form onSubmit={handleSubmit}>
          <div className='w-full max-w-xl px-3'>
            <p className='mb-3'>Dirección</p>
            <textarea
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-address'
              type='text'
              required
              name='address'
              placeholder='Dirección de la ASADA'
              defaultValue={address}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </div>
          <div className='w-full px-3'>
            <p className='mb-3'>Horario de Atención</p>
            <textarea
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-schedule'
              type='text'
              required
              name='schedule'
              placeholder='Horario de atención'
              defaultValue={schedule}
              onChange={(e) => setNewSchedule(e.target.value)}
            />
          </div>
          <div className='divider max-w-xl'></div>
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
    </div>
  );
}

export default Contacto;
