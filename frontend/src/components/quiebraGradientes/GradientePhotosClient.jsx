import { useState } from "react";

function GradientePhotosClient({ photo }) {
  const [photoId, setPhotoId] = useState(photo.idphotos);

  return (
    <div
      className={`w-full relative h-[200px] transition duration-150 ease-out`}
    >
      <img
        className='object-cover w-full h-full cursor-pointer'
        alt='Quiebra gradientes'
        src={`http://localhost:5000/${photo.photo}`}
        id={photoId}
      />
    </div>
  );
}

export default GradientePhotosClient;
