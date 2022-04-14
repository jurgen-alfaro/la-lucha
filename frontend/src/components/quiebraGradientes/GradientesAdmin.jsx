import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import QuiebraGradientesContext from "../../context/quiebraGradientes/QuiebraGradientesContext";
import GradienteTable from "./GradienteTable";
import Spinner from "../shared/Spinner";

function GradientesAdmin() {
  const { isLoading, gradientes, getGradientes } = useContext(
    QuiebraGradientesContext
  );

  useEffect(() => {
    const fetchGradientes = async () => await getGradientes();

    fetchGradientes();
  }, []);

  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-2xl my-4 font-bold card-title'>
          Quiebra Gradientes
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
                d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </div>

        <div className='overflow-x-auto max-h-full'>
          {!isLoading ? <GradienteTable /> : <Spinner />}
        </div>
      </div>
    </div>
  );
}

export default GradientesAdmin;
