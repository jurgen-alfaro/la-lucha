import { createContext, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginContext from "../login/LoginContext";
import FileDownload from "js-file-download";

import { toast } from "react-toastify";

const TransparenciaContext = createContext();

export const TransparenciaProvider = ({ children }) => {
  const { user } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true);

  const [documentos, setDocumentos] = useState([]);
  const [documento, setDocumento] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  // Get all documentos
  const getDocumentos = async () => {
    setIsLoading(true);
    const response = await fetch("/api/transparencias", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setDocumentos(data);
    setIsLoading(false);
  };

  // Get documento by Id
  const getDocumento = async (id) => {
    setIsLoading(true);
    const response = await axios.get(`/api/transparencias/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.data;
    setDocumento(data);

    setIsLoading(false);
    return data;
  };

  // Download document as attachement
  const downloadTransparenciaDocument = async () => {
    setIsLoading(true);
    const { id } = params,
      download = await axios.get(`/api/transparencias/${id}/download`, {
        responseType: "blob",
      }),
      response = await axios.get(`/api/transparencias/${id}`),
      file = await response.data.ddoc,
      fileName = file.split("-")[0],
      fileExt = file.split(".")[1];

    FileDownload(download.data, `${fileName}.${fileExt}`);
    setIsLoading(false);
  };

  // Download documento
  const downloadTransparenciaDocumentClient = async (id) => {
    setIsLoading(true);

    const download = await axios.get(`/api/transparencias/${id}/download`, {
      responseType: "blob",
    });
    const response = await axios.get(`/api/transparencias/${id}`);
    const file = await response.data.ddoc;
    const fileName = file.split(".")[0];
    const fileExt = file.split(".")[1];

    FileDownload(download.data, `${fileName}.${fileExt}`);
    setIsLoading(false);
  };

  // Display/show transparencia document in different tab
  const displayDocumento = async () => {
    const { id } = params;
    const response = await axios.get(`/api/transparencias/${id}/display`, {
      method: "GET",
      responseType: "blob",
    });

    const file = new Blob([response.data], {
      type: "application/pdf",
    });

    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  // Display/show transparencia document in client view in different tab
  const displayDocumentoClient = async (id) => {
    const response = await axios.get(`/api/transparencias/${id}/display`, {
      method: "GET",
      responseType: "blob",
    });

    const file = new Blob([response.data], {
      type: "application/pdf",
    });

    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };
  // Add documento
  const addDocumento = async (newDoc) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/transparencias", newDoc, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.data;

      setDocumentos(...documentos, data);
      setIsLoading(false);
      toast.success(
        `Se ha agregado un nuevo documento de transparencia a la ASADA. Nombre: ${data.documento.dname}`,
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
        `Ha ocurrido un error al agregar el documento. Error: ${error}`,
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

  // Update documento
  const updateDocumento = async (newDoc) => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.put(`/api/transparencias/${id}`, newDoc, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.data;
      const updatedDocumento = await data.updatedDocumento[0];

      await getDocumentos();
      await getDocumento(id);
      setIsLoading(false);
      toast.info(
        `Documento de transparencia actualizado: "${updatedDocumento.dname}"`,
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
      throw new Error(`Error al actualizar documento: ${newDoc}`);
    }
  };

  // Delete form
  const deleteDocumento = async () => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.delete(`/api/transparencias/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      await getDocumentos();

      setIsLoading(false);
      toast.info(`Se ha borrado el registro del documento de transparencia`, {
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
      throw new Error(
        `Error al borrar documento de transparencia: ${documento.dname}`
      );
    }
  };

  return (
    <TransparenciaContext.Provider
      value={{
        documento,
        documentos,
        isLoading,
        setIsLoading,
        setDocumento,
        addDocumento,
        getDocumento,
        getDocumentos,
        updateDocumento,
        downloadTransparenciaDocument,
        downloadTransparenciaDocumentClient,
        displayDocumento,
        displayDocumentoClient,
        deleteDocumento,
      }}
    >
      {children}
    </TransparenciaContext.Provider>
  );
};

export default TransparenciaContext;
