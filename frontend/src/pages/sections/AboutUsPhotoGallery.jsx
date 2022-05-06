import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function AboutUsPhotoGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/photos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  const handleClick = (e) => window.open(e.target.src);

  return (
    <section className='photo-gallery'>
      <div className='title py-12'>
        <h1 className='xl:text-7xl lg:text-6xl md:text-5xl sm:text-6xl text-4xl text-center'>
          Galería de Fotos
        </h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row-dense py-0 px-[4px]'>
        {images.length !== 0 &&
          images.map((img, i) => {
            return (
              <img
                key={i}
                src={`http://localhost:5000/${img.photo}`}
                alt='Foto de la galería'
                className='mt-[8px] w-full cursor-pointer lg:object-cover hover:opacity-[0.92] lg:max-h-48 py-0 px-[4px]'
                onClick={handleClick}
              />
            );
          })}
      </div>
    </section>
  );
}

export default AboutUsPhotoGallery;
