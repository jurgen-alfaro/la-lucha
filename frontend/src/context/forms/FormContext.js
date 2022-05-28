import { createContext, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginContext from "../login/LoginContext";
import FileDownload from "js-file-download";

import { toast } from "react-toastify";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const { user } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true);

  const [forms, setForms] = useState([]);
  const [form, setForm] = useState({});

  const params = useParams();
  const navigate = useNavigate();
  // Get all forms
  const getForms = async () => {
    setIsLoading(true);
    const response = await fetch("/api/forms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setForms(data);
    setIsLoading(false);
  };

  // Get form by Id
  const getForm = async (id) => {
    setIsLoading(true);
    const response = await axios.get(`/api/forms/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.data;
    setForm(data);

    setIsLoading(false);
    return data;
  };

  // Download document as attachement
  const downloadFormDocument = async () => {
    setIsLoading(true);
    const { id } = params,
      download = await axios.get(`/api/forms/${id}/download`, {
        responseType: "blob",
      }),
      response = await axios.get(`/api/forms/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
      file = await response.data.fdoc,
      fileName = file.split("-")[0],
      fileExt = file.split(".")[1];

    FileDownload(download.data, `${fileName}.${fileExt}`);
    setIsLoading(false);
  };

  // Download form
  const downloadFormDocumentClient = async (id) => {
    setIsLoading(true);

    const download = await axios.get(`/api/forms/${id}/download`, {
      responseType: "blob",
    });
    const response = await axios.get(`/api/forms/${id}`);
    const file = await response.data.fdoc;
    const fileName = file.split("-")[0];
    const fileExt = file.split(".")[1];

    FileDownload(download.data, `${fileName}.${fileExt}`);
    setIsLoading(false);
  };

  // Display/show form in different tab
  const displayForm = async (id) => {
    const response = await axios.get(`/api/forms/${id}/display`, {
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
  const displayFormClient = async () => {
    const { id } = params;
    const response = await axios.get(`/api/forms/${id}/display`, {
      method: "GET",
      responseType: "blob",
    });

    const file = new Blob([response.data], {
      type: "application/pdf",
    });

    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  // Add form
  const addForm = async (newForm) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/forms", newForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.data;

      setForms(...forms, data);
      setIsLoading(false);
      toast.success(
        `Se ha agregado un nuevo formulario a la ASADA. Nombre: ${data.form.fname}`,
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
        `Ha ocurrido un error al agregar el formulario. Error: ${error}`,
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

  // Update form
  const updateForm = async (newForm) => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.put(`/api/forms/${id}`, newForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.data;
      const updatedForm = await data.updatedForm[0];

      await getForms();
      await getForm(id);
      setIsLoading(false);
      toast.info(`Formulario actualizado: "${updatedForm.fname}"`, {
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
      throw new Error(`Error al actualizar formulario: ${newForm}`);
    }
  };

  // Delete form
  const deleteForm = async () => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.delete(`/api/forms/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      await getForms();

      setIsLoading(false);
      toast.info(`Se ha borrado el registro del formulario`, {
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
      throw new Error(`Error al borrar formulario: ${form.fname}`);
    }
  };

  return (
    <FormContext.Provider
      value={{
        getForms,
        getForm,
        addForm,
        isLoading,
        setIsLoading,
        forms,
        form,
        setForm,
        downloadFormDocument,
        updateForm,
        downloadFormDocumentClient,
        displayForm,
        displayFormClient,
        deleteForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
