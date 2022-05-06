import { useState } from "react";

function ProjectPhotosClient({ photo }) {
  const [photoId, setPhotoId] = useState(photo.idphotos);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target);
    const url = `http://localhost:5000/${photo.photo}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`w-full block md:h-[600px] h-[300px] transition duration-150 ease-out`}
    >
      <img
        className='object-cover w-full h-full'
        alt='Proyect image'
        src={`http://localhost:5000/${photo.photo}`}
        id={photoId}
        onClick={handleClick}
      />
    </div>
  );
}

export default ProjectPhotosClient;
