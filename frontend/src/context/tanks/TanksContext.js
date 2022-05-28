import { createContext, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoginContext from "../login/LoginContext";
import { toast } from "react-toastify";
import axios from "axios";

const TanksContext = createContext();

export const TanksProvider = ({ children }) => {
  const { user } = useContext(LoginContext);

  const [isLoading, setIsLoading] = useState(true);
  const [tanks, setTanks] = useState([]);
  const [tank, setTank] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  // Get all water tanks
  const getTanks = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/waterTanks", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data.tanks;
    setTanks(data);
    setIsLoading(false);
  };

  // Get tank by Id
  const getTank = async (id) => {
    setIsLoading(true);
    const response = await axios.get(`/api/waterTanks/${id}`);
    const data = await response.data;
    setTank(data);
    setIsLoading(false);
  };

  // Add project
  const addTank = async (newTank) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/waterTanks", newTank, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.data;

      await getTanks();
      setTanks(data);
      setIsLoading(false);
      toast.success(`¡Nuevo tanque de almacenamiento agregado!`, {
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
        `Ha ocurrido un error al agregar el tanque de almacenamiento. Error: ${error}`,
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

  // Update tank
  const updateTank = async (tank) => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.put(`/api/waterTanks/${id}`, tank, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      await getTanks();
      await getTank(id);
      setIsLoading(false);
      toast.info(
        `Se ha actualizado la información del tanque de almacenamiento`,
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
    } catch (error) {
      console.log(error);
      throw new Error(
        `Error al actualizar informacion del tanque de almacenamiento: ${tank.name}`
      );
    }
  };

  // Delete photo
  const deleteTankPhoto = async (photoId) => {
    try {
      setIsLoading(true);

      const response = await axios.delete(`/api/waterTanks/photo/${photoId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const { id } = params;
      await getTanks();
      await getTank(id);
      setIsLoading(false);
      toast.info(`Foto borrada del tanque de almacenamiento`, {
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
        `Error al actualizar informacion del tanque de almacenamiento: ${tank.name}`
      );
    }
  };

  // Delete tank
  const deleteTank = async () => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.delete(`/api/waterTanks/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      await getTanks();

      setIsLoading(false);
      toast.info(`Se ha borrado el registro del tanque de almacenamiento`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
      throw new Error(`Error al borrar tanque de almacenamiento: ${tank.name}`);
    }
  };

  return (
    <TanksContext.Provider
      value={{
        getTanks,
        isLoading,
        setIsLoading,
        tank,
        tanks,
        addTank,
        getTank,
        setTank,
        updateTank,
        deleteTankPhoto,
        deleteTank,
      }}
    >
      {children}
    </TanksContext.Provider>
  );
};

export default TanksContext;
