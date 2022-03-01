import HeroImg from "../../assets/about-us_hero-img.jpg";
function AboutUsHero() {
  return (
    <section className='about-us-hero md:h-screen grid grid-cols-1 sm:grid-cols-2 justify-center'>
      <div className='hero-image'>
        <img src={HeroImg} alt='People at work' />
      </div>
      <div className='hero-content grid items-center justify-center '>
        <div className='p-5 '>
          <h1 className='hero-history_title text-center my-12 xl:text-7xl lg:text-6xl md:text-5xl sm:text-6xl text-3xl '>
            Nuestra Historia
          </h1>
          <p className='hero-history_description sm:text-lg max-h-min text-center'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero,
            iusto beatae voluptatibus laboriosam cupiditate voluptates.
            Adipisci, et ducimus. Provident officia quia ducimus aliquam. Esse
            recusandae temporibus, optio maxime porro deleniti ipsam, quasi
            perspiciatis alias voluptatum voluptatem facilis, adipisci quia
            sequi.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUsHero;
