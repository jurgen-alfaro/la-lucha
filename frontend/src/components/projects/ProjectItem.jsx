import { useEffect, useContext, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectContext from "../../context/projects/ProjectContext";
import ProjectPhotos from "./ProjectPhotos";
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

function ProjectItem() {
  const {
    project,
    getProject,
    setProject,
    isLoading,
    updateProject,
    deleteProject,
  } = useContext(ProjectContext);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTotalCost, setNewTotalCost] = useState("");
  const [newEstimatedCost, setNewEstimatedCost] = useState("");
  const [newIsPending, setNewIsPending] = useState(true);
  const [newPhotos, setNewPhotos] = useState("");

  const { photos } = project;
  const { title, pdesc, total_cost, estimated_cost, is_pending } = project;

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
    const fetchProject = async () => await getProject(id);

    if (Object.keys(project).length === 0) fetchProject();
  }, [project]);

  useLayoutEffect(() => {
    return () => {
      setProject({});
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();

    // If title is not modified, use the current project's title
    if (newTitle === "") fd.set("title", title);
    // If is modified
    else fd.set("title", newTitle);

    if (newDesc === "") fd.set("pdesc", pdesc);
    else fd.set("pdesc", newDesc);

    if (newTotalCost === "") fd.set("total_cost", total_cost);
    else fd.set("total_cost", newTotalCost);

    if (newEstimatedCost === "") fd.set("estimated_cost", estimated_cost);
    else fd.set("estimated_cost", newEstimatedCost);

    fd.set("is_pending", newIsPending);

    if (newPhotos !== "") {
      Array.from(newPhotos).forEach((photo) =>
        fd.append("images", photo, photo.name)
      );
    } else {
      photos.forEach((photo) => fd.append("images", photo.name));
    }

    updateProject(fd);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Se eliminará de la base de datos el registro del proyecto y las fotos asociadas. Esta acción no se puede revertir.\n ¿Seguro que desea continuar?"
      )
    ) {
      await deleteProject();
    }
  };

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
          Editar proyecto
        </h2>

        <div className='text-lg'>
          <form className='w-full max-w-lg' onSubmit={handleSubmit}>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-title'
              >
                Nombre
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-title'
                type='text'
                required
                name='title'
                placeholder='Nombre/Título del proyecto'
                defaultValue={title}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-pdesc'
              >
                Descripción
              </label>
              <textarea
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-pdesc'
                type='text'
                required
                name='pdesc'
                placeholder='Descripción del proyecto'
                defaultValue={pdesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </div>
            <div className='flex flex-wrap w-full'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-estimatedCost'
                >
                  Costo Estimado
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                  id='grid-estimatedCost'
                  type='text'
                  placeholder='₡'
                  name='estimatedCost'
                  required
                  defaultValue={estimated_cost}
                  onChange={(e) => setNewEstimatedCost(e.target.value)}
                />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-apelltotalCostidos'
                >
                  Costo Total
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-totalCost'
                  type='text'
                  placeholder='₡'
                  required
                  name='totalCost'
                  defaultValue={total_cost}
                  onChange={(e) => setNewTotalCost(e.target.value)}
                />
              </div>
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-message'
              >
                {`Estado actual: ${
                  Number(is_pending) === 1 ? "Pendiente" : "Finalizado"
                }`}
              </label>

              <div className='form-control'>
                <select
                  className='select select-md select-ghost w-full max-w-xs mb-2 '
                  defaultValue={is_pending}
                  onChange={(e) => setNewIsPending(e.target.value)}
                >
                  <option value={true}>Pendiente</option>
                  <option value={false}>Finalizado</option>
                </select>
              </div>
            </div>
            <div className='px-3 '>
              <label
                className='block uppercase inline tracking-wide text-gray-700 text-xs font-bold mb-2 '
                htmlFor='grid-photos'
              >
                Fotos
              </label>
              <div className='photos-container relative p-2 mb-12 '>
                <div className={`w-full h-96 transition duration-150 ease-out`}>
                  <Slider {...settings}>
                    {!isLoading && photos ? (
                      photos.map((photo, i) => {
                        return (
                          <ProjectPhotos
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
                  className='appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-photos'
                  type='file'
                  multiple
                  onChange={(e) => setNewPhotos(e.target.files)}
                />
              </div>
            </div>
            <div className='divider'></div>

            <div className='card-actions justify-start'>
              <button
                className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                type='submit'
              >
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
                &nbsp;Borrar proyecto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
