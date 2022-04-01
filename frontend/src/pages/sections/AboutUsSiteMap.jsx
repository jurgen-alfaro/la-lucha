import { useState } from "react";
import siteMapImg from "../../assets/site_map.png";

function AboutUsSiteMap() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };
  /* 
  const anchor = document.querySelector("#site-map");
  anchor.scrollIntoView({ behavior: "smooth", block: "center" }); */

  return (
    <section
      className='about-us_site-map flex justify-center '
      style={{ backgroundColor: "var(--asada-lemonade-green)" }}
      id='site-map'
    >
      <div className='container about-us_site-map-img px-4 py-8'>
        <img
          src={siteMapImg}
          alt='Mapa del Sitio'
          id='myImg'
          className='cursor-pointer shadow-xl'
          onClick={openModal}
        />
        <div className={`modal ${isModalOpen ? "modal-open" : ""}  px-3`}>
          <div className='modal-box '>
            <span className='cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-10 w-10 z-50'
                viewBox='0 0 20 20'
                fill='currentColor'
                onClick={closeModal}
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  clipRule='evenodd'
                />
              </svg>
            </span>

            <img src={siteMapImg} id='modal-image' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSiteMap;
