import { useContext, useEffect } from "react";
import SuggestionContext from "../../context/suggestions/SuggestionContext";
import Spinner from "../shared/Spinner";
import "moment/locale/es";
import SuggestionTable from "./SuggestionTable";

function SuggestionList() {
  const { getSuggestions, isLoading } = useContext(SuggestionContext);

  useEffect(() => {
    getSuggestions();
  }, []);

  if (!isLoading) {
    return (
      <div className='rounded-lg shadow-lg card bg-base-100'>
        <div className='card-body'>
          <h2 className='text-2xl my-4 font-bold card-title'>
            Lista de Sugerencias y Comentarios
          </h2>

          <div className='overflow-x-auto'>
            <SuggestionTable />
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default SuggestionList;
