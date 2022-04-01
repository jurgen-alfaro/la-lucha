import { createContext, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import LoginContext from "../login/LoginContext";
import axios from "axios";
import FileDownload from "js-file-download";

import { toast } from "react-toastify";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const { user } = useContext(LoginContext);
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({});

  // Get all jobs
  const getJobs = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/jobs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.data;

    setJobs(data.jobs);
    setIsLoading(false);
  };

  // Get job by Id
  const getJob = async (id) => {
    setIsLoading(true);
    const response = await axios.get(`/api/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.data;
    setJob(data);
    setIsLoading(false);
    return data;
  };

  // Add job
  const addJob = async (newJob) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/jobs", newJob, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.data;

      setJobs(data);
      setIsLoading(false);
      toast.success(
        `¡Datos de solicitud enviados! \n Un miembro de la ASADA se pondrá en contacto una vez se haya revisado la información compartida.`,
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

  // Download curriculum
  const downloadCurriculum = async () => {
    setIsLoading(true);
    const { id } = params,
      download = await axios.get(`/api/jobs/${id}/download`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
      response = await axios.get(`/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
      file = await response.data.curriculum,
      fileName = file.split("-")[0],
      fileExt = file.split(".")[1];

    FileDownload(download.data, `${fileName}.${fileExt}`);
    setIsLoading(false);
  };

  // Display/show curriculum in a different tab
  const displayCurriculum = async () => {
    const { id } = params;
    const response = await axios.get(`/api/jobs/${id}/cv`, {
      method: "GET",
      responseType: "blob",
    });

    const file = new Blob([response.data], {
      type: "application/pdf",
    });

    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  // Update job
  const updateJob = async (job) => {
    try {
      setIsLoading(true);
      const { idjobs } = job;

      const response = await axios.put(`/api/jobs/${idjobs}`, job, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.data;

      setIsLoading(false);

      return data;
    } catch (error) {
      console.log(error);
      toast.error(`Error al actualizar solicitud de empleo. Error: ${error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      throw new Error(`Error al actualizar sugerencia: ${job}`);
    }
  };

  return (
    <JobContext.Provider
      value={{
        getJobs,
        getJob,
        jobs,
        job,
        isLoading,
        addJob,
        setJob,
        updateJob,
        downloadCurriculum,
        displayCurriculum,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
