import { useContext, useState } from "react";
import ProjectContext from "../../context/projects/ProjectContext";
function ProjectPhotos({ photo, onClick }) {
  const { deleteProjectPhoto, getPhoto } = useContext(ProjectContext);
  const [photoId, setPhotoId] = useState(photo.idphoto);

  const handleClick = (e) => {
    e.preventDefault();
    deleteProjectPhoto(photoId);
  };

  const handleOpenPhotoClick = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_BASE_URL}/${photo.photo}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className={`w-full relative h-96 transition duration-150 ease-out `}>
        <img
          className='w-full h-full object-cover z-10'
          alt='Proyect image'
          src={`${process.env.REACT_APP_BASE_URL}/${photo.photo}`}
          id={photoId}
        />
        <button
          className='btn btn-sm btn-square btn-primary absolute top-4 right-14 z-10'
          type='button'
          onClick={handleOpenPhotoClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 '
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
            <path
              fillRule='evenodd'
              d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <button
          className='btn btn-sm btn-square absolute top-4 right-4 z-10'
          type='button'
          onClick={handleClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default ProjectPhotos;
