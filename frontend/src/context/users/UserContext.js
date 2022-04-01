import { createContext, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoginContext from "../login/LoginContext";
import axios from "axios";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [usuario, setUsuario] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  // Get all users
  const getUsers = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.data;

    setUsers(data);
    setIsLoading(false);
  };

  // Add a user to the system
  const addUser = async (newUser) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.body;
      setUsers(data);
      setIsLoading(false);

      toast.info(`¡Usuario agregado al sistema!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      toast.error(`Ha ocurrido un error: ${error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      throw new Error(error);
    }
  };

  // Get user by ID
  const getUser = async () => {
    setIsLoading(true);
    const { id } = params;
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    setUsuario(data.user[0]);
    setIsLoading(false);
  };

  // Update user by Id
  const updateUser = async (user) => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      await getUsers();
      await getUser(id);
      setIsLoading(false);
      toast.info(
        `Se ha actualizado la información del miembro de la Junta Directiva`,
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
      return data;
    } catch (error) {
      console.log(error);
      toast.error(`Error al actualizar usuario: ${user}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      throw new Error(`Error al actualizar usuario: ${user}`);
    }
  };

  // Change password
  const changePassword = async (newPwd) => {
    setIsLoading(true);
    const u = { password: newPwd };
    const { id } = params;
    const response = await axios.post(`/api/users/${id}/changePassword`, u, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);
    return await response.data.result;
  };

  const isCurrentPassword = async (pwd) => {
    setIsLoading(true);
    const u = { password: pwd };
    const { id } = params;
    const response = await axios.post(`/api/users/${id}/confirmPassword`, u, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);
    return await response.data.result;
  };

  return (
    <UserContext.Provider
      value={{
        addUser,
        getUser,
        getUsers,
        users,
        usuario,
        isLoading,
        updateUser,
        changePassword,
        isCurrentPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
