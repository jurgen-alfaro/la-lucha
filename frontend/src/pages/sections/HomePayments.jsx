import { useState } from "react";

function HomePayments() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <section className='my-12 px-12'>
      <div className='h-full flex flex-col items-center '>
        <h1 className='xl:text-7xl lg:text-6xl md:text-5xl sm:text-6xl text-4xl text-center '>
          Métodos de Pago
        </h1>

        <p className='sm:text-lg text-center max-w-xl mx-auto my-6 tracking-wide md:tracking-normal'>
          Actualmente la ASADA tiene a su disposición diferentes medios de pago
          que pueden ser utilizados para realizar la cancelación de sus recibos.
        </p>
      </div>
      <div className='mx-12 flex flex-col items-center lg:items-stretch lg:flex-row justify-center gap-12'>
        <div className='card w-80 md:w-96 bg-base-00 shadow-xl text-center'>
          <div className='card-body'>
            <h2 className='card-title border-b pb-2'>
              <span>
                <svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'>
                  <path d='M10.6 35.95V19H13.6V35.95ZM22.7 35.95V19H25.7V35.95ZM4 41.95V38.95H44V41.95ZM34.4 35.95V19H37.4V35.95ZM4 16V13.35L24 1.95L44 13.35V16ZM10.7 13H24H37.3ZM10.7 13H37.3L24 5.4Z' />
                </svg>
              </span>
              &nbsp; Recaudadores Autorizados
            </h2>
            <p>
              Realice el pago de su factura de forma sencilla por medio de las
              plataformas digitales disponibles o cancele de forma presencial en
              cualquiera de nuestras entidades autorizadas.{" "}
            </p>
            <button className='btn btn-sm btn-primary' onClick={openModal}>
              Ver entidades autorizadas
            </button>
            <div className={`modal ${isModalOpen ? "modal-open" : ""}  px-3`}>
              <div className='modal-box '>
                <span className='cursor-pointer'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-9 w-9 z-50'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    onClick={closeModal}
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                <div className='flex items-center flex-col'>
                  <h1 className='font-bold text-2xl md:text-3xl'>
                    Recaudadores Autorizados
                  </h1>
                  <p className='my-3 text-center'>
                    Cancele su factura con el número de NIS, de abonado o de
                    medidor en cualquiera de los siguientes recaudadores:
                  </p>
                  <div className='grid grid-cols-2'>
                    <div>
                      <ul className='list-disc px-3 text-left'>
                        <li>Banco Nacional</li>
                        <li>Banco Popular</li>
                        <li>Banco Promerica</li>
                        <li>BN Servicios</li>
                        <li>Caja de Ande</li>
                        <li>Coocique</li>
                        <li>Coopeamistad</li>
                        <li>Coopeande #1</li>
                        <li>Coopejudicial </li>
                        <li>Coopeservidores</li>
                        <li>Correos de Costa Rica</li>
                        <li>Cruz Roja</li>
                        <li>Gente Más Gente</li>
                      </ul>
                    </div>
                    <div>
                      <ul className='list-disc px-3 text-left'>
                        <li>Gollo</li>
                        <li>Grupo Mutual Alajuela</li>
                        <li>Grupo Tecnológico Gamma</li>
                        <li>Internet Banking</li>
                        <li>Pago Automático de Recibo</li>
                        <li>Pago Bots</li>
                        <li>Payser</li>
                        <li>Qpago</li>
                        <li>Scotiabank</li>
                        <li>Servimas</li>
                        <li>Teledolar</li>
                        <li>Tiendas Ekono</li>
                        <li>ASADA La Lucha</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='card w-80 md:w-96 bg-base-100 shadow-xl text-center'>
          <div className='card-body'>
            <h2 className='card-title justify-center border-b pb-2'>
              <span>
                <svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'>
                  <path d='M27 27Q24.5 27 22.75 25.25Q21 23.5 21 21Q21 18.5 22.75 16.75Q24.5 15 27 15Q29.5 15 31.25 16.75Q33 18.5 33 21Q33 23.5 31.25 25.25Q29.5 27 27 27ZM11 34Q9.75 34 8.875 33.125Q8 32.25 8 31V11Q8 9.75 8.875 8.875Q9.75 8 11 8H43Q44.25 8 45.125 8.875Q46 9.75 46 11V31Q46 32.25 45.125 33.125Q44.25 34 43 34ZM16 31H38Q38 28.9 39.45 27.45Q40.9 26 43 26V16Q40.9 16 39.45 14.55Q38 13.1 38 11H16Q16 13.1 14.55 14.55Q13.1 16 11 16V26Q13.1 26 14.55 27.45Q16 28.9 16 31ZM40 40H5Q3.75 40 2.875 39.125Q2 38.25 2 37V14H5V37Q5 37 5 37Q5 37 5 37H40ZM11 31Q11 31 11 31Q11 31 11 31V11Q11 11 11 11Q11 11 11 11Q11 11 11 11Q11 11 11 11V31Q11 31 11 31Q11 31 11 31Z' />
                </svg>
              </span>
              &nbsp; Pago en Efectivo
            </h2>
            <p>
              Visite nuestras oficinas ubicadas 25m Sur, 200m Este de algun
              lugar en la comunidad de la Tigra. La Tigra de la Vega de San
              Carlos, en donde estaremos encantados de ayudarle con cualquier
              trámite que necesite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePayments;
