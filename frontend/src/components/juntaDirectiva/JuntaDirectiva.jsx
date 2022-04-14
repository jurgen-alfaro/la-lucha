import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import JuntaDirectivaTable from "./JuntaDirectivaTable";
import JuntaDirectivaContext from "../../context/juntaDirectiva/JuntaDirectivaContext";
import Spinner from "../shared/Spinner";

function JuntaDirectiva() {
  const { members, isLoading, getMembers } = useContext(JuntaDirectivaContext);

  useEffect(() => {
    const fetchMembers = async () => {
      await getMembers();
    };

    fetchMembers();
  }, []);

  return (
    <section>
      <div className='form-action-btns h-10 w-full flex justify-end'>
        <Link to={"add"} className={`btn btn-primary btn-sm }`}>
          Agregar Miembro&nbsp;
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
          </svg>
        </Link>
      </div>
      <div className='overflow-x-auto max-h-full'>
        {!isLoading && members ? <JuntaDirectivaTable /> : <Spinner />}
      </div>
    </section>
  );
}

export default JuntaDirectiva;
