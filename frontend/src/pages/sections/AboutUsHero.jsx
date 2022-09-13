import { Link } from "react-router-dom";
import HeroImg from "../../assets/asada.jpg";

function AboutUsHero() {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 justify-center'>
      <div className='hero-image'>
        <img src={HeroImg} alt='ASADA' className='object-cover' />
      </div>
      <div className='grid items-center justify-center '>
        <div className='p-5 '>
          <h1 className='hero-history_title text-center my-12 xl:text-7xl lg:text-6xl md:text-5xl sm:text-6xl text-4xl '>
            Nuestra Historia
          </h1>
          <p className='sm:text-lg max-h-min text-center'>
            Todo gran proyecto empieza con un sueño; y el sueño de esta
            comunidad se ha vuelto realidad gracias al esfuerzo de todos y cada
            uno de los involucrados que han aportado su granito de arena hacia
            un bien común.
          </p>
          <br />
          <p className='sm:text-lg max-h-min text-center'>
            ¿Quieres saber cómo comenzó todo?
          </p>
          <div className='flex justify-center'>
            <Link to='/historia' className='btn btn-primary text-center mt-6'>
              Ver Historia
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsHero;
