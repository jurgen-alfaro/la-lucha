import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import TanksContext from "../../context/tanks/TanksContext";
import TankTable from "./TankTable";
import Spinner from "../shared/Spinner";

function TanksAdmin() {
  const { isLoading, getTanks } = useContext(TanksContext);

  useEffect(() => {
    const fetchTanks = async () => await getTanks();

    fetchTanks();
  }, []);

  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-2xl my-4 font-bold card-title'>
          Tanques de Almacenamiento
        </h2>
        <div className='form-action-btns h-10 w-full flex justify-end'>
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

        <div className='overflow-x-auto max-h-full'>
          {!isLoading ? <TankTable /> : <Spinner />}
        </div>
      </div>
    </div>
  );
}

export default TanksAdmin;
