import peopleImg from "../../assets/about-us_junta-directiva-img.jpg";

function AboutUsJuntaDirectiva() {
  return (
    <section
      id='#junta-directiva'
      className='about-us-junta-directiva flex justify-center px-2'
    >
      <div className='container my-12'>
        <div className='junta-directiva-title my-12 px-12'>
          <h1 className='text-7xl border-b pb-5 w-50'>Junta Directiva</h1>
        </div>
        <div className='junta-directiva-members flex flex-wrap justify-around'>
          <div className='card lg:card-side bg-base-100 shadow-xl mt-5'>
            <figure>
              <img src={peopleImg} alt='Album' />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>Ana Lourdes Zuñiga Rojas</h2>
              <p>
                <strong>Cargo:</strong> <br />
                <strong>Vigencia:</strong> Febrero 2023
              </p>
            </div>
          </div>

          <div className='card lg:card-side bg-base-100 shadow-xl mt-5'>
            <figure>
              <img src={peopleImg} alt='Album' />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>Juan Morera Gutierrez</h2>
              <p>
                <strong>Cargo:</strong> Administradora <br />
                <strong>Vigencia:</strong> Febrero 2023
              </p>
            </div>
          </div>
          <div className='card lg:card-side bg-base-100 shadow-xl mt-5'>
            <figure>
              <img src={peopleImg} alt='Album' />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>New album is released!</h2>
              <p>Click the button to listen on Spotiwhy app.</p>
            </div>
          </div>
          <div className='card lg:card-side bg-base-100 shadow-xl mt-5'>
            <figure>
              <img src={peopleImg} alt='Album' />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>Ana Lourdes Zuñiga Rojas</h2>
              <p>
                <strong>Cargo:</strong> <br />
                <strong>Vigencia:</strong> Febrero 2023
              </p>
            </div>
          </div>
          <div className='card lg:card-side  bg-base-100 shadow-xl mt-5'>
            <figure>
              <img src={peopleImg} alt='Album' />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>New album is released!</h2>
              <p>Click the button to listen on Spotiwhy app.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsJuntaDirectiva;
