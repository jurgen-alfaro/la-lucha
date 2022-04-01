import { useEffect, useContext, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostContext from "../../context/posts/PostContext";
import Spinner from "../shared/Spinner";
import PostPhotos from "./PostPhotos";

function PostItem() {
  const { post, getPost, setPost, isLoading } = useContext(PostContext);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const { photos } = post;
  const { title, desc, post_type } = post;

  useEffect(() => {
    const fetchPost = async () => await getPost(id);

    if (Object.keys(post).length === 0) fetchPost();
  }, [post]);

  useLayoutEffect(() => {
    return () => {
      setPost({});
    };
  }, []);

  if (!isLoading) {
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
            <form className='w-full max-w-lg'>
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
                  id='grid-desc'
                  type='text'
                  required
                  name='desc'
                  placeholder='Descripción de la publicación'
                  defaultValue={desc}
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
                  >
                    <option value={"Anuncios"}>Anuncios</option>
                    <option value={"Eventos"}>Eventos</option>
                    <option value={"Noticias"}>Noticias</option>
                    <option value={"Finanacieros"}>Financieros</option>
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
                <div className='photos-container  p-2 mb-3   h-96'>
                  <div className='carousel rounded-box w-full h-full'>
                    {!isLoading && photos ? (
                      photos.map((photo, photoIndex) => {
                        let position = "nextSlide";
                        if (photoIndex === index) position = "activeSlide";
                        if (
                          photoIndex === index - 1 ||
                          (index === 0 && photoIndex === photos.length - 1)
                        )
                          position = "lastSlide";
                        return (
                          <PostPhotos
                            photo={photo}
                            key={photoIndex}
                            pos={position}
                            setIndex={setIndex}
                            index={index}
                          />
                        );
                      })
                    ) : (
                      <Spinner />
                    )}
                  </div>
                </div>
                <div className='form-control'>
                  <input
                    className='appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-photos'
                    type='file'
                    multiple
                  />
                </div>
              </div>
              <div className='divider'></div>

              <div className='card-actions justify-start'>
                <button className='btn btn-primary' type='submit'>
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default PostItem;
