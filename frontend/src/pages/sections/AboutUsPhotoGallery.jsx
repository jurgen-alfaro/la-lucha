import { useState, useEffect } from "react";
import AboutUsPhotoGalleryItem from "./AboutUsPhotoGalleryItem";

function AboutUsPhotoGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/user-files")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.userFiles);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
    isModalOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  };

  return (
    <section className='photo-gallery'>
      <div className='title py-12'>
        <h1 className='lg:text-7xl text-3xl text-center'>Galería de Fotos</h1>
      </div>
      <div className='container mx-auto'>
        {!isLoading && images.length === 0 && <h1>Loading...</h1>}

        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-3 gap-3'>
            {images.map((image) => (
              <AboutUsPhotoGalleryItem key={image.id} image={image} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AboutUsPhotoGallery;
