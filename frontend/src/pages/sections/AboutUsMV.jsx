function AboutUsMV() {
  return (
    <section className='about-us-mv md:h-screen grid grid-cols-1 md:grid-cols-2'>
      <div className='mission-container  h-full flex flex-col justify-center px-12'>
        <h1 className='lg:text-7xl text-3xl text-center '>Misión</h1>
        <div className='divider'></div>
        <p className='sm:text-lg text-center '>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus doloremque molestiae excepturi error inventore itaque,
          dolor molestias earum sint dolorem omnis delectus, expedita accusamus?
          Quam!
        </p>
      </div>
      <div
        style={{ backgroundColor: "var(--asada-lemonade-green)" }}
        className='vision-container  h-full flex flex-col justify-center px-12'
      >
        <h1 className='lg:text-7xl text-3xl text-white text-center'>Visión</h1>
        <div className='divider'></div>
        <p className='sm:text-lg text-center text-white'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus doloremque molestiae excepturi error inventore itaque,
          dolor molestias earum sint dolorem omnis delectus, expedita accusamus?
          Quam!
        </p>
      </div>
    </section>
  );
}

export default AboutUsMV;
