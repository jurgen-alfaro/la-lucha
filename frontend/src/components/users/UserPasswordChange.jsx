import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserContext from "../../context/users/UserContext";
import Spinner from "../shared/Spinner";
import { toast } from "react-toastify";

function UserPasswordChange() {
  const { changePassword, isCurrentPassword, isLoading, setIsLoading } =
    useContext(UserContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === confirmNewPassword) {
      if (await isCurrentPassword(currentPassword)) {
        if (await changePassword(newPassword)) {
          toast.success(`Contraseña modificada satisfactoriamente`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate(-1);
        } else {
          toast.error(
            `La contraseña no ha sido modificada. \nHa ocurrido un error al cambiar la contraseña. `,
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      } else {
        toast.error(
          `Contraseña actual incorrecta. Por favor, intente de nuevo. `,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } else {
      toast.error(
        `Las contraseñas nuevas no coinciden. Por favor, intente de nuevo.`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
        Cambiar contraseña
      </h2>
      <div className='suggestion-info text-lg'>
        <form className='w-full max-w-lg' onSubmit={handleSubmit}>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-currentPassword'
            >
              Contraseña actual
            </label>
            <input
              className='appearance-none block w-full  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-currentPassword'
              type='password'
              required
              name='currentPassword'
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-newPassword'
            >
              Contraseña nueva
            </label>
            <input
              className='appearance-none block w-full  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-newPassword'
              type='password'
              required
              name='newPassword'
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-confirmNewPassword'
            >
              Confirmar contraseña nueva
            </label>
            <input
              className='appearance-none block w-full  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-confirmNewPassword'
              type='password'
              required
              name='confirmNewPassword'
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
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
              &nbsp;Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserPasswordChange;
