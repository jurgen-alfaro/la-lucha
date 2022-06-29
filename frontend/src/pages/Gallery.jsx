import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Framer motion variants
const pageVariants = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};
const pageTransition = {
  duration: 0.5,
};

function Elem() {
  return (
    <span>
      <h1>Cargando</h1>
    </span>
  );
}

function Gallery() {
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

    window.scrollTo(0, 0);
  }, []);

  const handleClick = (e) => window.open(e.target.src);

  const handleScrollToTop = () => window.scrollTo(0, 0);

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <section className='mb-20'>
        <div
          className='fixed right-5 bottom-5 rounded-full bg-primary text-white z-50 p-4 hover:scale-125 hover:bg-secondary duration-150 cursor-pointer active:scale-110'
          onClick={handleScrollToTop}
        >
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        </div>
        <div className='container mx-auto'>
          <div className='title text-center py-6 text-3xl lg:text-7xl'>
            <h1 className='border-b pb-5'>Galería</h1>
          </div>
        </div>
        <div className='grid justify-center '>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 py-0 px-4 justify-center items-center'>
            {images.length !== 0 &&
              images.map((img, i) => {
                return (
                  <div
                    className='flex justify-center items-center my-4 h-[170px] w-[300px] '
                    key={i}
                  >
                    <LazyLoadImage
                      effect='blur'
                      key={i}
                      width='100%'
                      height='100%'
                      src={`${process.env.REACT_APP_BASE_URL}/${img.photo}`}
                      alt='Foto de la galería'
                      className='object-cover cursor-pointer py-0 rounded-xl hover:scale-[0.99] '
                      onClick={handleClick}
                      style={{
                        maxHeight: "200px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Gallery;
