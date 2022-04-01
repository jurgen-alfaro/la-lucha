import { createContext, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoginContext from "../login/LoginContext";
import axios from "axios";

import { toast } from "react-toastify";

const JuntaDirectivaContext = createContext();

export const JuntaDirectivaProvider = ({ children }) => {
  const { user } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  // Get all members
  const getMembers = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/junta", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;

    setMembers(data);
    setIsLoading(false);
  };

  // Get member by Id
  const getMember = async (id) => {
    setIsLoading(true);
    const response = await axios.get(`/api/junta/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.data;
    setMember(data);
    setIsLoading(false);
  };

  // Add a member
  const addMember = async (newMember) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/junta", newMember, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.data;

      setMembers(data);
      setIsLoading(false);

      toast.info(`Nueva miembro agregado a la Junta Directiva`, {
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
      toast.error(
        `Ha ocurrido un error al agregar la miembro a la Junta Directiva. Error: ${error}`,
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

  // Update member
  const updateMember = async (member) => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.put(`/api/junta/${id}`, member, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      await getMembers();
      await getMember(id);
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
    } catch (error) {
      console.log(error);
      throw new Error(
        `Error al actualizar informacion de miembro: ${member.name}`
      );
    }
  };

  const deleteMember = async () => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.delete(`/api/junta/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      await getMembers();

      setIsLoading(false);
      toast.info(
        `Se ha borrado el registro del miembro de la Junta Directiva`,
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
      throw new Error(
        `Error al actualizar informacion de miembro: ${member.name}`
      );
    }
  };

  return (
    <JuntaDirectivaContext.Provider
      value={{
        getMembers,
        addMember,
        getMember,
        updateMember,
        deleteMember,
        isLoading,
        members,
        setMember,
        member,
      }}
    >
      {children}
    </JuntaDirectivaContext.Provider>
  );
};

export default JuntaDirectivaContext;
