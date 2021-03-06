import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function TankPhotosClient({ photo }) {
  const [photoId, setPhotoId] = useState(photo.idphotos);

  const handleClick = () => {
    const url = `http://localhost:5000/${photo.photo}`;
    window.open(url, "_blank");
  };

  return (
    <div className={`h-[250px] transition duration-150 ease-out`}>
      <button
        className='btn btn-sm btn-square btn-primary absolute top-4 right-4 z-10'
        type='button'
        onClick={handleClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
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

      <LazyLoadImage
        width='100%'
        height='100%'
        className='w-full h-full object-cover'
        alt='Proyect image'
        src={`${process.env.REACT_APP_BASE_URL}/${photo.photo}`}
        id={photoId}
      />
    </div>
  );
}

export default TankPhotosClient;
