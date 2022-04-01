import peopleImg from "../../assets/about-us_junta-directiva-img.jpg";
import { FaNewspaper, FaDownload } from "react-icons/fa";

function AboutInformes() {
  return (
    <section className='about-us-informes flex justify-center px-2'>
      <div className='container my-12 '>
        <div className='about-us-informes-title my-12 px-12 '>
          <h1 className='text-7xl border-b pb-5 flex justify-center'>
            Informes
          </h1>
        </div>
        <div className='grid  sm:justify-center lg:grid-cols-2 xl:grid-cols-3 gap-5 about-us-informes-list'>
          <div className='card lg:card-side sm:card-side bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title justify-center'>Presupuesto Anual</h2>
              <p className='flex justify-start'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                rem deleniti, vero quam ratione vitae exercitationem cum
                obcaecati eum.
              </p>
              <div className='justify-center mt-3 card-actions'>
                <button className='btn btn-primary btn-outline btn-sm'>
                  Descargar&nbsp;
                  <FaDownload />
                </button>
                <button className='btn btn-primary btn-sm'>
                  Ver&nbsp;
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                    <path
                      fillRule='evenodd'
                      d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <figure className='bg-base-300'>
              <span
                style={{ width: "200px", height: "90px" }}
                className='flex text-center'
              >
                <FaNewspaper style={{ width: "100%", height: "100%" }} />
              </span>
            </figure>
          </div>

          <div className='card lg:card-side sm:card-side bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title justify-center'>
                Plan de Trabajo de Junta Directiva
              </h2>
              <p className='flex justify-start'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                rem deleniti, vero quam ratione vitae exercitationem cum
                obcaecati eum.
              </p>
              <div className='justify-center mt-3 card-actions'>
                <button className='btn btn-primary btn-outline btn-sm'>
                  Descargar&nbsp;
                  <FaDownload />
                </button>
                <button className='btn btn-primary btn-sm'>
                  Ver&nbsp;
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                    <path
                      fillRule='evenodd'
                      d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <figure className='bg-base-300'>
              <span
                style={{ width: "200px", height: "90px" }}
                className='flex text-center'
              >
                <FaNewspaper style={{ width: "100%", height: "100%" }} />
              </span>
            </figure>
          </div>

          <div className='card lg:card-side sm:card-side bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title justify-center'>Estados Financieros</h2>
              <p className='flex justify-start'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                rem deleniti, vero quam ratione vitae exercitationem cum
                obcaecati eum.
              </p>
              <div className='justify-center mt-3 card-actions'>
                <button className='btn btn-primary btn-outline btn-sm'>
                  Descargar&nbsp;
                  <FaDownload />
                </button>
                <button className='btn btn-primary btn-sm'>
                  Ver&nbsp;
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                    <path
                      fillRule='evenodd'
                      d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <figure className='bg-base-300 hidden'>
              <span
                style={{ width: "200px", height: "90px" }}
                className='flex text-center'
              >
                <FaNewspaper style={{ width: "100%", height: "100%" }} />
              </span>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutInformes;
