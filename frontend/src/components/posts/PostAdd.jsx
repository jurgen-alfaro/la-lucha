import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PostContext from "../../context/posts/PostContext";

function PostAdd() {
  const { getPosts, addPost, isLoading } = useContext(PostContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [postType, setPostType] = useState("Anuncios");
  const [photos, setPhotos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const titleChange = (e) => setTitle(e.target.value);
  const descChange = (e) => setDesc(e.target.value);
  const postTypeChange = (e) => setPostType(e.target.value);
  const onFilesChange = (e) => setPhotos(Array.from(e.target.files));

  const formReset = () => {
    setTitle("");
    setDesc("");
    setPostType("");
    setPostType([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.set("title", title);
    fd.set("desc", desc);
    fd.set("post_type", postType);
    photos.forEach((photo) => fd.append("images", photo, photos.filename));

    await addPost(fd);
    await getPosts();
    formReset();
  };
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
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
          Agregar publicación nueva
        </h2>
        <div className='text-lg'>
          <form className='w-full max-w-lg' onSubmit={handleSubmit}>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-name'
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
                onChange={titleChange}
              />
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-fdesc'
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
                onChange={descChange}
              />
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase inline tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-message'
              >
                Tipo de publicación&nbsp;
                <span
                  className='tooltip inline absolute cursor-pointer text-sm'
                  data-tip='El tipo ayuda a la búsqueda y filtrado de publicaciones por parte del usuario '
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 '
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              </label>

              <div className='form-control'>
                <select
                  className='select select-md select-ghost w-full max-w-xs mb-2'
                  onChange={postTypeChange}
                >
                  <option value={"Anuncios"} defaultValue={"Anuncios"}>
                    Anuncios
                  </option>
                  <option value={"Eventos"}>Eventos</option>
                  <option value={"Noticias"}>Noticias</option>
                  <option value={"Financieros"}>Financieros</option>
                </select>
              </div>
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-email'
              >
                Fotos
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-images'
                type='file'
                multiple
                lang='es'
                name='images'
                onChange={onFilesChange}
              />
              <small className='ml-1 text-2xs text-gray-500'>
                Formato permitido: .png, .jpg, .jpeg
              </small>
            </div>

            <div className='divider'></div>

            <div className='card-actions justify-start'>
              <button type='submit' className={`btn btn-primary `}>
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostAdd;
