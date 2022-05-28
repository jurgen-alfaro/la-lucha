import { createContext, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoginContext from "../login/LoginContext";
import { toast } from "react-toastify";
import axios from "axios";

const QuiebraGradientesContext = createContext();

export const QuiebraGradientesProvider = ({ children }) => {
  const { user } = useContext(LoginContext);

  const [isLoading, setIsLoading] = useState(true);
  const [gradientes, setGradientes] = useState([]);
  const [gradiente, setGradiente] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  // Get all quiebra gradientes
  const getGradientes = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/quiebraGradientes", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data.gradientes;
    setGradientes(data);
    setIsLoading(false);
  };

  // Get gradiente by Id
  const getGradiente = async (id) => {
    setIsLoading(true);
    const response = await axios.get(`/api/quiebraGradientes/${id}`);
    const data = await response.data;
    setGradiente(data);
    setIsLoading(false);
  };

  // Add quiebra gradiente
  const addGradiente = async (newGradiente) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "/api/quiebraGradientes",
        newGradiente,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.data;

      await getGradientes();
      setGradiente(data);
      setIsLoading(false);
      toast.success(`¡Nuevo quiebra gradientes agregado a la ASADA!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        `Ha ocurrido un error al agregar el quiebra gradiente. Error: ${error}`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      throw new Error(error);
    }
  };

  // Update gradiente
  const updateGradiente = async (gradiente) => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.put(
        `/api/quiebraGradientes/${id}`,
        gradiente,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      await getGradientes();
      await getGradiente(id);
      setIsLoading(false);
      toast.info(`Se ha actualizado la información del quiebra gradientes`, {
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
      throw new Error(
        `Error al actualizar informacion de quiebra gradientes: ${gradiente.name}`
      );
    }
  };

  // Delete photo
  const deleteGradientePhoto = async (photoId) => {
    try {
      setIsLoading(true);

      const response = await axios.delete(
        `/api/quiebraGradientes/photo/${photoId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const { id } = params;
      await getGradientes();
      await getGradiente(id);
      setIsLoading(false);
      toast.info(`Foto borrada del quiebra gradientes`, {
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
      throw new Error(
        `Error al actualizar informacion del quiebra gradientes: ${gradiente.name}`
      );
    }
  };

  // Delete quiebra gradientes
  const deleteGradiente = async () => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.delete(`/api/quiebraGradientes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      await getGradientes();

      setIsLoading(false);
      toast.info(
        `Se ha borrado el registro del quiebra gradientes y las fotos asociadas`,
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
      navigate(-1);
    } catch (error) {
      console.log(error);
      throw new Error(`Error al borrar quiebra gradientes: ${gradiente.name}`);
    }
  };

  return (
    <QuiebraGradientesContext.Provider
      value={{
        getGradientes,
        isLoading,
        setIsLoading,
        gradiente,
        gradientes,
        addGradiente,
        updateGradiente,
        getGradiente,
        setGradiente,
        deleteGradientePhoto,
        deleteGradiente,
      }}
    >
      {children}
    </QuiebraGradientesContext.Provider>
  );
};

export default QuiebraGradientesContext;
