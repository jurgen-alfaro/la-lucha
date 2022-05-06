import { useState } from "react";

function TankPhotosClient({ photo }) {
  const [photoId, setPhotoId] = useState(photo.idphotos);

  return (
    <div className={`h-[250px] transition duration-150 ease-out`}>
      <img
        className='w-full h-full object-cover'
        alt='Proyect image'
        src={`http://localhost:5000/${photo.photo}`}
        id={photoId}
      />
    </div>
  );
}

export default TankPhotosClient;
