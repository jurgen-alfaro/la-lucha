import { createContext, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoginContext from "../login/LoginContext";
import { toast } from "react-toastify";
import axios from "axios";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const { user } = useContext(LoginContext);

  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  // Get all projects
  const getProjects = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/projects", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data.projects;
    setProjects(data);
    setIsLoading(false);
  };

  // Get project by Id
  const getProject = async (id) => {
    setIsLoading(true);
    const response = await axios.get(`/api/projects/${id}`);
    const data = await response.data;
    setProject(data);
    setIsLoading(false);
  };

  // Get project photo by Id
  const getPhoto = async (id) => {
    setIsLoading(true);
    const response = await axios.get(`/api/projects/photo/${id}`);
    const data = await response.data;
    setProject(data);
    setIsLoading(false);
  };

  // Add project
  const addProject = async (newProject) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/projects", newProject, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.data;

      await getProjects();
      setProjects(data);
      setIsLoading(false);
      toast.success(`¡Nuevo proyecto agregado a la ASADA!`, {
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

  // Delete photo
  const deleteProjectPhoto = async (photoId) => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/projects/photo/${photoId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const { id } = params;
      await getProjects();
      await getProject(id);
      setIsLoading(false);
      toast.info(`Foto borrada del proyecto`, {
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
        `Error al actualizar informacion del proyecto: ${project.name}`
      );
    }
  };

  // Update project
  const updateProject = async (project) => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.put(`/api/projects/${id}`, project, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      await getProjects();
      await getProject(id);
      setIsLoading(false);
      toast.info(`Se ha actualizado la información del proyecto`, {
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
        `Error al actualizar informacion del proyecto: ${project.title}`
      );
    }
  };

  // Delete project
  const deleteProject = async () => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.delete(`/api/projects/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      await getProjects();

      setIsLoading(false);
      toast.info(
        `Se ha borrado el registro del proyecto y las fotos asociadas`,
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
      throw new Error(`Error al borrar el proyecto: ${project.title}`);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        getProjects,
        getProject,
        isLoading,
        setIsLoading,
        setProject,
        project,
        projects,
        addProject,
        deleteProjectPhoto,
        updateProject,
        getPhoto,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
