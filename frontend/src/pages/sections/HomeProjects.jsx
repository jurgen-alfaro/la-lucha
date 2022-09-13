import { Parallax } from "react-parallax";
import { NavLink } from "react-router-dom";
import useWindowDimensions from "../../components/hooks/useWindowDimensions";
import image1 from "../../assets/projectmain.jpg";

function HomeProjects() {
  const { width } = useWindowDimensions();

  if (width > 768) {
    return (
      <section className='home-projects flex'>
        <div className='projects-info flex flex-col justify-start'>
          <h2 className='text-7xl text-white px-5 '>Nuestros Proyectos</h2>
          <p className='text-lg px-5 py-6 text-white'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At error
            repudiandae adipisci nesciunt commodi dolore nemo cumque esse amet
            debitis autem neque, id quos. Mollitia qui quos inventore sed dolor,
            totam possimus consequatur at aspernatur esse pariatur fugit
            explicabo ipsum quae officia commodi aperiam ab sit adipisci ex
            temporibus excepturi!
          </p>
          <NavLink to='proyectos' className='btn btn-secondary mt-5 btn-lg'>
            Ver proyectos{" "}
          </NavLink>
        </div>

        <div className='projects-image'>
          <Parallax bgImage={image1} strength={400}>
            <div></div>
          </Parallax>
        </div>
      </section>
    );
  } else {
    return (
      <section className='home-projects flex'>
        <div className='projects-info flex flex-col justify-start'>
          <h2 className='lg:text-7xl md:text-4xl text-3xl text-white px-5'>
            Nuestros Proyectos
          </h2>
          <p className='text-lg px-5 py-6 text-white text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At error
            repudiandae adipisci nesciunt commodi dolore nemo cumque esse amet
            debitis autem neque, id quos. Mollitia qui quos inventore sed dolor,
            totam possimus consequatur at aspernatur esse pariatur fugit
            explicabo ipsum quae officia commodi aperiam ab sit adipisci ex
            temporibus excepturi!
          </p>
          <NavLink to='projects' className='btn btn-secondary mt-5 btn-lg'>
            Ver proyectos{" "}
          </NavLink>
        </div>
      </section>
    );
  }
}

export default HomeProjects;
