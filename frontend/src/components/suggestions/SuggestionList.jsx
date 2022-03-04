import { useContext, useEffect } from "react";
import SuggestionContext from "../../context/suggestions/SuggestionContext";
import SuggestionItem from "./SuggestionItem";
import Spinner from "../shared/Spinner";

function SuggestionList() {
  const { suggestions, fetchSuggestions, isLoading } =
    useContext(SuggestionContext);

  useEffect(() => {
    if (suggestions) fetchSuggestions();
  }, []);

  if (!isLoading) {
    return (
      <div className='rounded-lg shadow-lg card bg-base-100'>
        <div className='card-body'>
          <h2 className='text-2xl my-4 font-bold card-title'>
            Lista de Sugerencias y Comentarios
          </h2>

          <div className='overflow-x-auto'>
            <table className='table table-compact w-full'>
              <thead>
                <tr>
                  <th></th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Asunto</th>
                  <th>Mensaje</th>
                  <th>Fecha de Emisión</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {suggestions.map((suggestion) => (
                  <SuggestionItem
                    key={suggestion.idsuggestions}
                    suggestion={suggestion}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default SuggestionList;
