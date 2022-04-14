import { Link } from "react-router-dom";

function Projects() {
  return (
    <section>
      <div className='container mx-auto'>
        <div className='title text-center py-6 text-3xl lg:text-7xl'>
          <h1 className='border-b pb-5'>Proyectos</h1>
        </div>

        <div className='info-container grid grid-cols-1 md:grid-cols-2 px-3 gap-3 w-full h-full '></div>
      </div>
    </section>
  );
}

export default Projects;
