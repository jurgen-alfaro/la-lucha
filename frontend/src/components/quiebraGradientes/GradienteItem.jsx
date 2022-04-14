import { useEffect, useContext, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuiebraGradientesContext from "../../context/quiebraGradientes/QuiebraGradientesContext";
import GradientePhotos from "./GradientePhotos";
import Spinner from "../shared/Spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: "scale(2)",
        right: "25px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: "scale(2)",
        left: "25px",
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

function GradienteItem() {
  const { gradiente, getGradiente, setGradiente, isLoading, updateGradiente } =
    useContext(QuiebraGradientesContext);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCapacity, setNewCapacity] = useState("");
  const [newPhotos, setNewPhotos] = useState("");

  const { photos } = gradiente;
  const { name, location, capacity } = gradiente;

  // Options for the carouse Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    const fetchGradiente = async () => await getGradiente(id);

    if (Object.keys(gradiente).length === 0) fetchGradiente();
  }, [gradiente]);

  useLayoutEffect(() => {
    return () => {
      setGradiente({});
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();

    // If name is not modified, use the current post's title
    if (newName === "") fd.set("name", name);
    // If is modified
    else fd.set("name", newName);

    if (newLocation === "") fd.set("location", location);
    else fd.set("location", newLocation);

    if (newCapacity === "") fd.set("capacity", capacity);
    else fd.set("capacity", newCapacity);

    if (newPhotos !== "") {
      Array.from(newPhotos).forEach((photo) =>
        fd.append("images", photo, photo.name)
      );
    } else {
      photos.forEach((photo) => fd.append("images", photo.name));
    }

    updateGradiente(fd);
  };

  if (!isLoading) {
    return (
      <div className='rounded-lg shadow-lg card bg-base-100 overflow-y-scroll'>
        <div className='card-body '>
          <h2 className='text-2xl my-4 font-bold card-title'>
            <button
              onClick={() => navigate(-1)}
              className='btn btn-outline btn-secondary btn-sm hover:text-white'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 '
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            Editar quiebra gradientes
          </h2>

          <div className='text-lg'>
            <form className='w-full max-w-lg' onSubmit={handleSubmit}>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-name'
                >
                  Nombre
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-name'
                  type='text'
                  required
                  name='name'
                  placeholder='Ingresar nombre del tanque'
                  defaultValue={name}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-location'
                >
                  Ubicación
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-location'
                  type='text'
                  required
                  name='location'
                  placeholder='Ingresar descripción del tanque'
                  defaultValue={location}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-capacity'
                >
                  Capacidad en litros
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-capacity'
                  type='text'
                  required
                  name='capacity'
                  placeholder='Ingresar capacidad del tanque'
                  defaultValue={capacity}
                  onChange={(e) => setNewCapacity(e.target.value)}
                />
              </div>

              <div className='px-3 '>
                <label
                  className='block uppercase inline tracking-wide text-gray-700 text-xs font-bold mb-2 '
                  htmlFor='grid-photos'
                >
                  Fotos
                </label>
                <div className='photos-container  p-2 mb-12 '>
                  <Slider {...settings}>
                    {!isLoading && photos ? (
                      photos.map((photo, photoIndex) => {
                        return (
                          <GradientePhotos photo={photo} key={photoIndex} />
                        );
                      })
                    ) : (
                      <Spinner />
                    )}
                  </Slider>
                </div>
                <div className='form-control'>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-photos'
                    type='file'
                    multiple
                    onChange={(e) => setNewPhotos(e.target.files)}
                  />
                </div>
              </div>
              <div className='divider'></div>

              <div className='card-actions justify-start'>
                <button className='btn btn-primary' type='submit'>
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default GradienteItem;
