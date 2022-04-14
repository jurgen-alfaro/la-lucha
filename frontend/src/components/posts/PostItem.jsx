import { useEffect, useContext, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostContext from "../../context/posts/PostContext";
import Spinner from "../shared/Spinner";
import PostPhotos from "./PostPhotos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: "scale(2)",
        right: "25px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: "scale(2)",
        left: "25px",
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

function PostItem() {
  const { post, getPost, setPost, isLoading, updatePost } =
    useContext(PostContext);

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPostType, setNewPostType] = useState("");
  const [newPhotos, setNewPhotos] = useState("");

  const { photos } = post;
  const { title, pdesc, post_type } = post;

  // Options for the carouse Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    const fetchPost = async () => await getPost(id);

    if (Object.keys(post).length === 0) fetchPost();
  }, [post]);

  useLayoutEffect(() => {
    return () => {
      setPost({});
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    // If title is not modified, use the current post's title
    if (newTitle === "") fd.set("title", title);
    // If is modified
    else fd.set("title", newTitle);

    if (newDesc === "") fd.set("pdesc", pdesc);
    else fd.set("pdesc", newDesc);

    if (newPostType === "") fd.set("post_type", post_type);
    else fd.set("post_type", newPostType);

    if (newPhotos !== "") {
      Array.from(newPhotos).forEach((photo) =>
        fd.append("images", photo, photo.name)
      );
    } else {
      photos.forEach((photo) => fd.append("images", photo.name));
    }

    await updatePost(fd);
  };

  return (
    <div className='rounded-lg shadow-lg card bg-base-100 overflow-y-scroll'>
      <div className='card-body '>
        <h2 className='text-2xl my-4 font-bold card-title'>
          <button
            onClick={() => navigate(-1)}
            className='btn btn-outline btn-secondary btn-sm hover:text-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 '
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          Editar publicación
        </h2>

        <div className='text-lg'>
          <form className='w-full max-w-lg' onSubmit={handleSubmit}>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-title'
              >
                Título
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-title'
                type='text'
                required
                name='title'
                placeholder='Título de la publicación'
                defaultValue={title}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-desc'
              >
                Descripción
              </label>
              <textarea
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-pdesc'
                type='text'
                required
                name='pdesc'
                placeholder='Descripción de la publicación'
                defaultValue={pdesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase inline tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-message'
              >
                Tipo de publicación&nbsp;
              </label>

              <div className='form-control'>
                <select
                  className='select select-md select-ghost w-full max-w-xs mb-2 '
                  defaultValue={post_type}
                  onChange={(e) => setNewPostType(e.target.value)}
                >
                  <option value={"Anuncios"}>Anuncios</option>
                  <option value={"Eventos"}>Eventos</option>
                  <option value={"Noticias"}>Noticias</option>
                  <option value={"Financieros"}>Financieros</option>
                </select>
              </div>
            </div>
            <div className='px-3 '>
              <label
                className='block uppercase inline tracking-wide text-gray-700 text-xs font-bold mb-2 '
                htmlFor='grid-photos'
              >
                Fotos
              </label>
              <div className='photos-container relative p-2 mb-12 '>
                <div className={`w-full h-96 transition duration-150 ease-out`}>
                  <Slider {...settings}>
                    {!isLoading && photos ? (
                      photos.map((photo, i) => {
                        return (
                          <PostPhotos
                            photo={photo}
                            key={i}
                            idphoto={photo.idphotos}
                          />
                        );
                      })
                    ) : (
                      <Spinner />
                    )}
                  </Slider>
                </div>
              </div>
              <div className='form-control'>
                <input
                  className='appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-photos'
                  type='file'
                  multiple
                  onChange={(e) => setNewPhotos(e.target.files)}
                />
              </div>
            </div>
            <div className='divider'></div>

            <div className='card-actions justify-start'>
              <button
                className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                type='submit'
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
