import { createContext, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoginContext from "../login/LoginContext";

import axios from "axios";

import { toast } from "react-toastify";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { user } = useContext(LoginContext);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});

  // Get all posts
  const getPosts = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/posts", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    setPosts(data.posts);
    setIsLoading(false);
  };

  // Get post by Id
  const getPost = async (id) => {
    setIsLoading(true);
    const response = await axios.get(`/api/posts/${id}`);
    const data = await response.data;
    setPost(data);
    setIsLoading(false);
  };

  // Add a post
  const addPost = async (newPost) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/posts", newPost, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.data;
      setPosts(data);
      setIsLoading(false);

      toast.info(`Nueva publicación agregada`, {
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
        `Ha ocurrido un error al agregar la publicación. Error: ${error}`,
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

  // Update post
  const updatePost = async (post) => {
    try {
      setIsLoading(true);
      const { id } = params;
      const response = await axios.put(`/api/posts/${id}`, post, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      await getPosts();
      await getPost(id);
      setIsLoading(false);
      toast.info(`Se ha actualizado la información de la publicación`, {
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
        `Error al actualizar informacion de miembro: ${post.title}`
      );
    }
  };

  // Delete photo
  const deletePostPhoto = async (photoId) => {
    try {
      setIsLoading(true);

      const response = await axios.delete(`/api/posts/photo/${photoId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const { id } = params;
      await getPosts();
      await getPost(id);
      setIsLoading(false);
      toast.info(`Foto borrada de la publicación`, {
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
        `Error al actualizar informacion de la publicación: ${post.title}`
      );
    }
  };

  return (
    <PostContext.Provider
      value={{
        getPosts,
        getPost,
        setPost,
        isLoading,
        setIsLoading,
        posts,
        post,
        addPost,
        updatePost,
        deletePostPhoto,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
