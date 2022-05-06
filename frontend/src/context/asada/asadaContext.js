import { createContext, useState, useContext } from "react";
import LoginContext from "../login/LoginContext";
import { toast } from "react-toastify";
import axios from "axios";

const AsadaContext = createContext();

export const AsadaProvider = ({ children }) => {
  const { user } = useContext(LoginContext);

  const [isLoading, setIsLoading] = useState(true);

  const [asada, setAsada] = useState({});

  // Get asada
  const getAsada = async () => {
    setIsLoading(true);
    const response = await axios.get(`/api/asada`);
    const data = await response.data;
    setAsada(data);
    setIsLoading(false);
  };

  // Update asada
  const updateAsada = async (asada) => {
    try {
      setIsLoading(true);
      /* 
  WARNING 
  HARD CODED VALUE 
  It is not recommended to explicitly use a number to call the API endpoint.
  Try to use dinamic variable. 
  */
      const response = await axios.put(`/api/asada/1`, asada, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      await getAsada();
      setIsLoading(false);
      toast.info(`Se ha actualizado la información de la ASADA`, {
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
      throw new Error(`Error al actualizar informacion la ASADA`);
    }
  };

  return (
    <AsadaContext.Provider
      value={{ asada, getAsada, updateAsada, isLoading, setIsLoading }}
    >
      {children}
    </AsadaContext.Provider>
  );
};

export default AsadaContext;
