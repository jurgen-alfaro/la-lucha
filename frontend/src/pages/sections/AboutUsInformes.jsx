import peopleImg from "../../assets/about-us_junta-directiva-img.jpg";
import { FaNewspaper, FaDownload } from "react-icons/fa";

function AboutInformes() {
  return (
    <section className='about-us-informes flex justify-center px-2'>
      <div className='container my-12 '>
        <div className='about-us-informes-title my-12 px-12 '>
          <h1 className='text-7xl border-b pb-5 flex justify-end'>Informes</h1>
        </div>
        <div className='flex flex-col about-us-informes-list'>
          <div className=' mx-auto'>
            <div className='card card-side bg-base-100 shadow-xl'>
              <div className='card-body'>
                <h2 className='card-title justify-center'>Presupuesto Anual</h2>
                <p className='flex justify-start'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat rem deleniti, vero quam ratione vitae exercitationem
                  cum obcaecati eum.
                </p>
                <div className='justify-center mt-3 card-actions'>
                  <button className='btn btn-primary btn-outline btn-sm'>
                    Descargar&nbsp;
                    <FaDownload />
                  </button>
                  <button className='btn btn-primary btn-sm'>Ver</button>
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
          </div>

          <div className=' mx-auto'>
            <div className='card card-side bg-base-100 shadow-xl'>
              <div className='card-body'>
                <h2 className='card-title justify-center'>
                  Plan de Trabajo de Junta Directiva
                </h2>
                <p className='flex justify-start'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat rem deleniti, vero quam ratione vitae exercitationem
                  cum obcaecati eum.
                </p>
                <div className='justify-center mt-3 card-actions'>
                  <button className='btn btn-primary btn-outline btn-sm'>
                    Descargar&nbsp;
                    <FaDownload />
                  </button>
                  <button className='btn btn-primary btn-sm'>Ver</button>
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
          </div>
          <div className=' mx-auto'>
            <div className='card card-side bg-base-100 shadow-xl'>
              <div className='card-body'>
                <h2 className='card-title justify-center'>
                  Estados Financieros
                </h2>
                <p className='flex justify-start'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat rem deleniti, vero quam ratione vitae exercitationem
                  cum obcaecati eum.
                </p>
                <div className='justify-center mt-3 card-actions'>
                  <button className='btn btn-primary btn-outline btn-sm'>
                    Descargar&nbsp;
                    <FaDownload />
                  </button>
                  <button className='btn btn-primary btn-sm'>Ver</button>
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutInformes;
