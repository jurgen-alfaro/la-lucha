import { useContext, useEffect, useState } from "react";
import SuggestionContext from "../../context/suggestions/SuggestionContext";
import Spinner from "../shared/Spinner";
import "moment/locale/es";
import Moment from "react-moment";
import SuggestionTable from "./SuggestionTable";

function SuggestionList() {
  const {
    suggestions,
    suggestion,
    getSuggestions,
    isLoading,
    updateSuggestion,
  } = useContext(SuggestionContext);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getSuggestions();
  }, []);

  const handleIsPending = () => {
    updateSuggestion(suggestion); // Pass the currently selected suggestion to the update function in context
  };

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

        <input type='checkbox' id='my-modal-4' className='modal-toggle' />
        <label
          htmlFor='my-modal-4'
          className={`modal cursor-pointer  ${showModal ? "open-modal" : ""}`}
        >
          <label className='modal-box relative' htmlFor=''>
            <div className=''></div>
            <h3 className='text-lg font-bold'>Detalle de Sugerencia</h3>

            <div className='py-4 text-sm grid modal-info-display'>
              <p>ID:</p>
              <span>{suggestion.idsuggestions}</span>
              <p>Nombre:</p>
              <span>{suggestion.name}</span>
              <p>Apellidos:</p>
              <span>{suggestion.last_name}</span>
              <p>Estado actual:</p>
              <span
                className={`badge ${
                  suggestion.is_pending ? "badge-warning" : "badge-primary"
                }`}
              >
                {suggestion.is_pending ? "Pendiente" : "Revisado"}
              </span>
              <p>Correo:</p>
              <span>{suggestion.email}</span>
              <p>Asunto:</p>
              <span>{suggestion.subject}</span>
              <p>Mensaje:</p>
              <span>{suggestion.message}</span>
              <p>Fecha de creación:</p>
              <span>
                <Moment locale='es' fromNow>
                  {suggestion.created_at}
                </Moment>
                {" | "}
                <Moment format='DD/MM/YYYY hh:mm:ss a'>
                  {suggestion.created_at}
                </Moment>{" "}
              </span>
              <p>Última actualización:</p>
              <span>
                <Moment locale='es' fromNow>
                  {suggestion.updated_at}
                </Moment>
                {" | "}
                <Moment format='DD/MM/YYYY hh:mm:ss a'>
                  {suggestion.updated_at}
                </Moment>
              </span>
            </div>
            <div className='divider'></div>
            <div className='modal-actions'>
              <p className='text-sm mb-1'>Cambiar estado actual a: </p>
              {suggestion.is_pending === 1 ? (
                <button
                  className={`btn mr-3  ${
                    suggestion.is_pending
                      ? "btn-primary hover:bg-primary-focus hover:scale-105 focus:bg-primary"
                      : "btn-ghost hover:bg-base-100 cursor-not-allowed"
                  } `}
                  onClick={handleIsPending}
                >
                  Revisado
                </button>
              ) : (
                <button
                  className={`btn ${
                    suggestion.is_pending
                      ? "btn-ghost hover:bg-base-100 cursor-not-allowed "
                      : "btn-warning hover:scale-105 focus:bg-warning-content focus:text-white "
                  }`}
                  onClick={handleIsPending}
                >
                  Pendiente
                </button>
              )}
            </div>
          </label>
        </label>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default SuggestionList;
