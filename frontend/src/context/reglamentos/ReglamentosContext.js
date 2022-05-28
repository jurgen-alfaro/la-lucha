import { createContext, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginContext from "../login/LoginContext";
import FileDownload from "js-file-download";

import { toast } from "react-toastify";

const ReglamentosContext = createContext();

export const ReglamentosProvider = ({ children }) => {
  const { user } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true);

  const [reglamentos, setReglamentos] = useState([]);
  const [reglamento, setReglamento] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  // Get all reglamentos
  const getReglamentos = async () => {
    setIsLoading(true);
    const response = await fetch("/api/reglamentos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setReglamentos(data);
    setIsLoading(false);
  };

  // Get reglamento by Id
  const getReglamento = async (id) => {
    setIsLoading(true);
    const response = await axios.get(`/api/reglamentos/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.data;
    setReglamento(data);

    setIsLoading(false);
    return data;
  };

  // Download document as attachement
  const downloadReglamentoDocument = async () => {
    setIsLoading(true);
    const { id } = params,
      download = await axios.get(`/api/reglamentos/${id}/download`, {
        responseType: "blob",
      }),
      response = await axios.get(`/api/reglamentos/${id}`),
      file = await response.data.rdoc,
      fileName = file.split("-")[0],
      fileExt = file.split(".")[1];

    FileDownload(download.data, `${fileName}.${fileExt}`);
    setIsLoading(false);
  };

  // Download reglamento
  const downloadReglamentoDocumentClient = async (id) => {
    setIsLoading(true);

    const download = await axios.get(`/api/reglamentos/${id}/download`, {
      responseType: "blob",
    });
    const response = await axios.get(`/api/reglamentos/${id}`);
    const file = await response.data.rdoc;
    const fileName = file.split("-")[0];
    const fileExt = file.split(".")[1];

    FileDownload(download.data, `${fileName}.${fileExt}`);
    setIsLoading(false);
  };

  // Display/show reglamento in different tab
  const displayReglamento = async () => {
    const { id } = params;
    const response = await axios.get(`/api/reglamentos/${id}/display`, {
      method: "GET",
      responseType: "blob",
    });

    const file = new Blob([response.data], {
      type: "application/pdf",
    });

    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  // Display/show reglamento in client view in different tab
  const displayReglamentoClient = async (id) => {
    const response = await axios.get(`/api/reglamentos/${id}/display`, {
      method: "GET",
      responseType: "blob",
    });

    const file = new Blob([response.data], {
      type: "application/pdf",
    });

    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  // Add reglamento
  const addReglamento = async (newReglamento) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/reglamentos", newReglamento, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.data;

      setReglamentos(...reglamentos, data);
      setIsLoading(false);
      toast.success(
        `Se ha agregado un nuevo reglamento a la ASADA. Nombre: ${data.reglamento.rname}`,
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
    } catch (error) {
      console.log(error);
      toast.error(
        `Ha ocurrido un error al agregar el reglamento. Error: ${error}`,
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

  // Update reglamento
  const updateReglamento = async (newReglamento) => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.put(
        `/api/reglamentos/${id}`,
        newReglamento,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.data;
      const updatedReglamento = await data.updatedReglamento[0];

      await getReglamentos();
      await getReglamento(id);
      setIsLoading(false);
      toast.info(`Reglamento actualizado: "${updatedReglamento.rname}"`, {
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
      throw new Error(`Error al actualizar formulario: ${newReglamento}`);
    }
  };

  const deleteReglamento = async () => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.delete(`/api/reglamentos/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      await getReglamentos();

      setIsLoading(false);
      toast.info(`Se ha borrado el registro del reglamento`, {
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
      throw new Error(`Error al borrar reglamento: ${reglamento.rname}`);
    }
  };

  return (
    <ReglamentosContext.Provider
      value={{
        getReglamentos,
        getReglamento,
        addReglamento,
        updateReglamento,
        downloadReglamentoDocument,
        downloadReglamentoDocumentClient,
        displayReglamento,
        reglamento,
        reglamentos,
        isLoading,
        setIsLoading,
        setReglamento,
        displayReglamentoClient,
        deleteReglamento,
      }}
    >
      {children}
    </ReglamentosContext.Provider>
  );
};

export default ReglamentosContext;
