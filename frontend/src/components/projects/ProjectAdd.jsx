import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectContext from "../../context/projects/ProjectContext";

function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

function ProjectAdd() {
  const { addProject, getProjects, isLoading, setIsLoading } =
    useContext(ProjectContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [photos, setPhotos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setInputFilter(document.getElementById("grid-totalCost"), function (value) {
      return /^\d*$/.test(value);
    });
    setInputFilter(
      document.getElementById("grid-estimatedCost"),
      function (value) {
        return /^\d*$/.test(value);
      }
    );

    setIsLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.set("title", title);
    fd.set("pdesc", desc);
    fd.set("estimated_cost", estimatedCost);
    totalCost === "" || totalCost === undefined || totalCost === null
      ? fd.set("total_cost", 0)
      : fd.set("total_cost", totalCost);
    photos.forEach((photo) => {
      fd.append("images", photo, photos.filename);
    });

    await addProject(fd);
    await getProjects();
  };

  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
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
          Agregar nuevo proyecto
        </h2>
        <div className='suggestion-info text-lg'>
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
                id='grid-title'
                type='text'
                required
                name='title'
                placeholder='Nombre del proyecto'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-pdesc'
              >
                Descripci??n
              </label>
              <textarea
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-pdesc'
                type='text'
                required
                name='pdesc'
                placeholder='Descripci??n del proyecto'
                onChange={(e) => setDesc(e.target.value)}
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
                  placeholder='???'
                  name='estimatedCost'
                  required
                  onChange={(e) => setEstimatedCost(e.target.value)}
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
                  placeholder='???'
                  name='totalCost'
                  onChange={(e) => setTotalCost(e.target.value)}
                />
              </div>
            </div>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-email'
              >
                Fotos
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-photos'
                type='file'
                multiple
                lang='es'
                name='photos'
                onChange={(e) => setPhotos(Array.from(e.target.files))}
              />
              <small className='ml-1 text-2xs text-gray-500'>
                Formato permitido: .jpg, .jpeg, .png
              </small>
            </div>

            <div className='divider'></div>

            <div className='card-actions justify-start'>
              <button
                type='submit'
                className={`btn btn-primary ${isLoading ? "loading" : ""}`}
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
                &nbsp;Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectAdd;
