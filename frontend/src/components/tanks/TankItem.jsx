import { useEffect, useContext, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TanksContext from "../../context/tanks/TanksContext";
import TankPhotos from "./TankPhotos";
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

function TankItem() {
  const { tank, getTank, setTank, isLoading, updateTank, deleteTank } =
    useContext(TanksContext);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCapacity, setNewCapacity] = useState("");
  const [newCosto, setNewCosto] = useState(0);
  const [newProveedor, setNewProveedor] = useState("");
  const [newPhotos, setNewPhotos] = useState("");

  const { photos } = tank;
  const { name, location, capacity, costo, proveedor } = tank;

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
    const fetchTank = async () => await getTank(id);

    if (Object.keys(tank).length === 0) fetchTank();
  }, [tank]);

  useLayoutEffect(() => {
    return () => {
      setTank({});
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

    if (newCosto === 0) fd.set("costo", costo);
    else fd.set("costo", newCosto);

    if (newProveedor === "") fd.set("proveedor", proveedor);
    else fd.set("proveedor", newProveedor);

    if (newPhotos !== "") {
      Array.from(newPhotos).forEach((photo) =>
        fd.append("images", photo, photo.name)
      );
    } else {
      photos.forEach((photo) => fd.append("images", photo.name));
    }

    updateTank(fd);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Se eliminará de la base de datos el registro del tanque de almacenamiento. Esta acción no se puede revertir.\n ¿Seguro que desea continuar?"
      )
    ) {
      await deleteTank();
    }
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
            Editar tanque de almacenamiento
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
                  Capacidad en m³
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-capacity'
                  type='text'
                  required
                  name='capacity'
                  placeholder='Ingresar capacidad del tanque (m³)'
                  defaultValue={capacity}
                  onChange={(e) => setNewCapacity(e.target.value)}
                />
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-costo'
                >
                  Costo
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-costo'
                  type='text'
                  required
                  name='costo'
                  placeholder='Ingresar costo'
                  defaultValue={costo}
                  onChange={(e) => setNewCosto(e.target.value)}
                />
              </div>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-proveedor'
                >
                  Proveedor
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-proveedor'
                  type='text'
                  required
                  name='proveedor'
                  placeholder='Ingresar proveedor'
                  defaultValue={proveedor}
                  onChange={(e) => setNewProveedor(e.target.value)}
                />
              </div>

              <div className='px-3 '>
                <label
                  className='block uppercase inline tracking-wide text-gray-700 text-xs font-bold mb-2 '
                  htmlFor='grid-photos'
                >
                  Fotos
                </label>
                <div className='photos-container  relative p-2 mb-12 '>
                  <div
                    className={`w-full h-96 transition duration-150 ease-out`}
                  >
                    <Slider {...settings}>
                      {!isLoading && photos ? (
                        photos.map((photo, i) => {
                          return (
                            <TankPhotos
                              photo={photo}
                              key={i}
                              idphoto={photo.idphotos}
                            />
                          );
                        })
                      ) : (
                        <Spinner />
                      )}
                    </Slider>
                  </div>
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
                  {!isLoading ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z' />
                    </svg>
                  ) : (
                    <></>
                  )}
                  &nbsp;Guardar cambios
                </button>
                <button
                  className='btn btn-error hover:bg-red-200'
                  type='button'
                  onClick={handleDelete}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  &nbsp;Borrar tanque
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

export default TankItem;
