import { useContext, useState } from "react";
import TanksContext from "../../context/tanks/TanksContext";

function TankPhotos({ photo }) {
  const { deleteTankPhoto } = useContext(TanksContext);
  const [photoId, setPhotoId] = useState(photo.idphoto);

  const handleClick = (e) => {
    e.preventDefault();
    deleteTankPhoto(photoId);
  };

  return (
    <>
      <div className={`w-full relative h-96 transition duration-150 ease-out `}>
        <img
          className='w-full h-full object-cover'
          alt='Proyect image'
          src={`http://localhost:5000/${photo.photo}`}
          id={photoId}
        />

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

export default TankPhotos;
