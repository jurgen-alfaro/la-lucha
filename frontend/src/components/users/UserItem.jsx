import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserContext from "../../context/users/UserContext";
import Spinner from "../shared/Spinner";
import Moment from "react-moment";

function UserItem() {
  const { usuario, isLoading, getUser, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  //   const [newPassword, setNewPassword] = useState("");
  //   const [newConfirmPassword, setConfirmPassword] = useState("");

  const { name, email } = usuario;

  useEffect(() => {
    const fetchUser = async () => await getUser(id);

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name: newName === "" ? name : newName,
      email: newEmail === "" ? email : newEmail,
    };

    await updateUser(newUser);
  };

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
        Editar información de usuario
      </h2>
      <div className='suggestion-info text-lg'>
        {!isLoading && usuario ? (
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
                defaultValue={name}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-email'
              >
                Correo electrónico
              </label>
              <input
                className='appearance-none block w-full  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-email'
                type='email'
                required
                name='email'
                defaultValue={email}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div className='divider'></div>

            <div className='card-actions justify-start'>
              <button
                type='submit'
                className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                defaultValue={false}
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
              <Link
                to='changePassword'
                className='btn btn-primary btn-outline'
                defaultValue={false}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z' />
                </svg>
                &nbsp;Cambiar contraseña
              </Link>
            </div>
          </form>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}

export default UserItem;
