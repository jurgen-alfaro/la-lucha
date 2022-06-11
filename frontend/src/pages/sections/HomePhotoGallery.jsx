import { NavLink } from "react-router-dom";
import homegallery1 from "../../assets/homegallery1.jpg";
import homegallery2 from "../../assets/homegallery2.jpg";
import homegallery3 from "../../assets/homegallery3.jpg";
import homegallery4 from "../../assets/homegallery4.jpg";
import homegallery5 from "../../assets/homegallery5.jpg";
import homegallery6 from "../../assets/homegallery6.jpeg";

function HomePhotoGallery() {
  return (
    <section className='photo-gallery pb-12 '>
      <h1 className='text-center text-3xl sm:"text-4xl md:text-5xl lg:text-7xl pt-11 mb-12'>
        Galería
      </h1>
      <div className='divider my-12 px-12'></div>
      <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-3 gap-3'>
        <div className='portfolio-box cursor-pointer'>
          <img src={homegallery3} alt='' title='portfolio 1 picture' />
          <div className='portfolio-info'>
            <div className='caption'>
              <h4>project name goes here 1</h4>
              <p>category project</p>
            </div>
          </div>
        </div>
        <div className='portfolio-box cursor-pointer'>
          <img src={homegallery2} alt='' title='portfolio 1 picture' />
          <div className='portfolio-info'>
            <div className='caption'>
              <h4>Nombre o Título de Imagen</h4>
              <p>Descripción</p>
            </div>
          </div>
        </div>
        <div className='portfolio-box cursor-pointer '>
          <img src={homegallery1} alt='' title='portfolio 1 picture' />
          <div className='portfolio-info'>
            <div className='caption'>
              <h4>project name goes here 1</h4>
              <p>category project</p>
            </div>
          </div>
        </div>
        <div className='portfolio-box cursor-pointer'>
          <img src={homegallery4} alt='' title='portfolio 1 picture' />
          <div className='portfolio-info'>
            <div className='caption'>
              <h4>project name goes here 1</h4>
              <p>category project</p>
            </div>
          </div>
        </div>
        <div className='portfolio-box cursor-pointer'>
          <img src={homegallery5} alt='' title='portfolio 1 picture' />
          <div className='portfolio-info'>
            <div className='caption'>
              <h4>project name goes here 1</h4>
              <p>category project</p>
            </div>
          </div>
        </div>
        <div className='portfolio-box cursor-pointer'>
          <img src={homegallery6} alt='' title='portfolio 1 picture' />
          <div className='portfolio-info'>
            <div className='caption'>
              <h4>project name goes here 1</h4>
              <p>category project</p>
            </div>
          </div>
        </div>
      </div>
      <div className='btn-container'>
        <NavLink
          to='galeria'
          className='btn btn-primary hover:bg-secondary hover:scale-105  btn-lg my-12'
        >
          Ver más fotos
        </NavLink>
      </div>
    </section>
  );
}

export default HomePhotoGallery;
