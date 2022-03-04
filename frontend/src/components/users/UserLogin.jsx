import { useState, useEffect, useContext } from "react";
import LoginContext from "../../context/login/LoginContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserLogin() {
  const { userLogin, user, isLoading, setUser } = useContext(LoginContext);
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (user) {
      toast.success(`Hola, ${user.name}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return navigate("/admin/dashboard");
    }
  }, [user]);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(user);
      const userl = await userLogin(formData);
      setUser(userl);
    } catch (error) {
      toast.error("Credenciales inválidas", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const { email, password } = formData;

  return (
    <section className='login-screen-section w-full h-screen flex justify-center items-center'>
      <div className='h-96 w-full'>
        <div className='heading'>
          <h1 className='flex justify-center lg:text-7xl md:text-5xl text-4xl'>
            &nbsp; Gestor de Contenido
          </h1>
        </div>
        <div className='form mt-12 px-2 flex justify-center'>
          <form className='w-full max-w-lg' onSubmit={onSubmit}>
            <div className='flex flex-wrap -mx-3 mb-4'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-email'
                >
                  Correo electrónico
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-email'
                  type='email'
                  placeholder='correo@ejemplo.com'
                  required
                  name='email'
                  value={email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-4'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-password'
                >
                  Contraseña
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-password'
                  type='password'
                  placeholder='Ingresar contraseña aquí'
                  required
                  name='password'
                  value={password}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className='flex flex-wrap -mx-3 mb-4'>
              <div className='w-full px-3 '>
                <button
                  href={`mailto:acueductolalucha@gmail.com`}
                  type='submit'
                  className='  
                        w-full
                        btn
                        btn-secondary
                        hover:bg-secondary-300
                        hover:scale-105
                        md:btn-md'
                >
                  Iniciar sesión &nbsp;
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserLogin;
