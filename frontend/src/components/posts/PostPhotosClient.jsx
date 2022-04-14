import { useState } from "react";

function PostPhotosClient({ photo }) {
  const [photoId, setPhotoId] = useState(photo.idphotos);

  return (
    <div
      className={`w-full relative md:h-[600px] h-[300px] transition duration-150 ease-out`}
    >
      <img
        className='object-cover w-full h-full'
        alt='Proyect image'
        src={`http://localhost:5000/posts/${photo.photo}`}
        id={photoId}
      />
    </div>
  );
}

export default PostPhotosClient;
