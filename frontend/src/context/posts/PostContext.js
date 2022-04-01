import { createContext, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});

  // Get all posts
  const getPosts = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/posts", {
      method: "GET",
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
    console.log("newPost:", newPost);
    try {
      const response = await axios.post("/api/posts", newPost, {
        headers: {
          "Content-Type": "multipart/form-data",
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

  return (
    <PostContext.Provider
      value={{ getPosts, getPost, setPost, isLoading, posts, post, addPost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
