import { createContext, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginContext from "../login/LoginContext";
import FileDownload from "js-file-download";

import { toast } from "react-toastify";

const InformesContext = createContext();

export const InformesProvider = ({ children }) => {
  const { user } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true);

  const [informes, setInformes] = useState([]);
  const [informe, setInforme] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  // Get all informes
  const getInformes = async () => {
    setIsLoading(true);
    const response = await fetch("/api/informes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setInformes(data);
    setIsLoading(false);
  };

  // Get informe by Id
  const getInforme = async (id) => {
    setIsLoading(true);
    const response = await axios.get(`/api/informes/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.data;
    setInforme(data);

    setIsLoading(false);
    return data;
  };

  // Download informe as attachement
  const downloadInformeDocument = async () => {
    setIsLoading(true);
    const { id } = params,
      download = await axios.get(`/api/informes/${id}/download`, {
        responseType: "blob",
      });
    const response = await axios.get(`/api/informes/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const file = await response.data.idoc,
      fileName = file.split("-")[0],
      fileExt = file.split(".")[1];

    FileDownload(download.data, `${fileName}.${fileExt}`);
    setIsLoading(false);
  };

  // Download informe
  const downloadInformeDocumentClient = async (id) => {
    setIsLoading(true);

    const download = await axios.get(`/api/informes/${id}/download`, {
      responseType: "blob",
    });
    const response = await axios.get(`/api/informes/${id}`);
    const file = await response.data.idoc;
    const fileName = file.split("-")[0];
    const fileExt = file.split(".")[1];

    FileDownload(download.data, `${fileName}.${fileExt}`);
    setIsLoading(false);
  };

  // Display/show informe in different tab
  const displayInforme = async () => {
    const { id } = params;

    const response = await axios.get(`/api/informes/${id}/display`, {
      method: "GET",
      responseType: "blob",
    });

    let file;
    const ext = response.data.type.split("/")[1];
    if (ext === "pptx" || ext === "ppt") {
      file = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      });
    }

    if (ext === "pdf") {
      file = new Blob([response.data], {
        type: "application/pdf",
      });
    }

    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  // Display/show informe in different tab
  const displayInformeClient = async (id) => {
    const response = await axios.get(`/api/informes/${id}/display`, {
      method: "GET",
      responseType: "blob",
    });

    let file;
    const ext = response.data.type.split("/")[1];
    if (ext === "pptx" || ext === "ppt") {
      file = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      });
    }

    if (ext === "pdf") {
      file = new Blob([response.data], {
        type: "application/pdf",
      });
    }

    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  // Add informe
  const addInforme = async (newInforme) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/informes", newInforme, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.data;

      setInformes(...informes, data);
      setIsLoading(false);
      toast.success(
        `Se ha agregado un nuevo informe a la ASADA. Nombre: ${data.informe.iname}`,
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
        `Ha ocurrido un error al agregar el informe. Error: ${error}`,
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

  // Update informe
  const updateInforme = async (newInforme) => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.put(`/api/informes/${id}`, newInforme, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.data;
      const updatedInforme = await data.updatedInforme[0];

      await getInformes();
      await getInforme(id);
      setIsLoading(false);
      toast.info(`Informe actualizado: "${updatedInforme.iname}"`, {
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
      throw new Error(`Error al actualizar informe: ${newInforme}`);
    }
  };

  // Delete informe
  const deleteInforme = async () => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.delete(`/api/informes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      await getInformes();

      setIsLoading(false);
      toast.info(`Se ha borrado el registro del informe`, {
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
      throw new Error(`Error al borrar informe: ${informe.iname}`);
    }
  };

  return (
    <InformesContext.Provider
      value={{
        informes,
        informe,
        isLoading,
        setIsLoading,
        setInforme,
        addInforme,
        getInforme,
        getInformes,
        updateInforme,
        downloadInformeDocument,
        downloadInformeDocumentClient,
        displayInforme,
        displayInformeClient,
        deleteInforme,
      }}
    >
      {children}
    </InformesContext.Provider>
  );
};

export default InformesContext;
