import { motion } from "framer-motion";

function AboutUsValues() {
  return (
    <section>
      <div className='h-full flex justify-center px-12 my-11'>
        <motion.h1
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                delay: 0.3,
                duration: 0.7,
              },
            },
            hidden: { opacity: 0 },
          }}
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center py-6'
        >
          Nuestros Valores
        </motion.h1>
      </div>
      <div className='flex flex-col justify-evenly gap-12 px-8 pb-12'>
        <div className='flex flex-wrap justify-evenly gap-12'>
          <div className='flex flex-col items-center max-w-lg lg:max-w-sm max-h-sm'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='48'
                width='48'
                style={{
                  fill: "var(--asada-lemonade-green)",
                  fontWeight: "bold",
                }}
              >
                <path d='M26.1 43.6Q25.25 44.45 24 44.45Q22.75 44.45 21.9 43.6L4.4 26.1Q3.55 25.25 3.55 24Q3.55 22.75 4.4 21.9L21.9 4.4Q22.75 3.55 24 3.55Q25.25 3.55 26.1 4.4L43.6 21.9Q44.45 22.75 44.45 24Q44.45 25.25 43.6 26.1ZM24 41.45 41.45 24Q41.45 24 41.45 24Q41.45 24 41.45 24L24 6.55Q24 6.55 24 6.55Q24 6.55 24 6.55L6.55 24Q6.55 24 6.55 24Q6.55 24 6.55 24L24 41.45Q24 41.45 24 41.45Q24 41.45 24 41.45Z' />
              </svg>
            </span>
            <h3 className='text-2xl font-bold'>Honestidad</h3>
            <div className='divider'></div>
            <p className='text-center max-w-xs leading-5'>
              Actuar siempre con fundamento en la verdad, cumpliendo los deberes
              con transparencia y rectitud, y siempre favoreciendo el interés
              general.
            </p>
          </div>
          <div className='flex flex-col items-center max-w-lg lg:max-w-sm'>
            <span className='font-bold'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='48'
                width='48'
                style={{ fill: "var(--asada-lemonade-green)" }}
              >
                <path d='M32.3 25.1Q27.6 20.9 24.1 17.1Q20.6 13.3 20.6 10Q20.6 7.4 22.35 5.65Q24.1 3.9 26.7 3.9Q28.2 3.9 29.675 4.725Q31.15 5.55 32.3 6.95Q33.45 5.55 34.925 4.725Q36.4 3.9 37.9 3.9Q40.5 3.9 42.25 5.65Q44 7.4 44 10Q44 13.3 40.5 17.1Q37 20.9 32.3 25.1ZM32.3 20.95Q35.6 17.95 38.3 15Q41 12.05 41 10Q41 8.65 40.125 7.775Q39.25 6.9 37.9 6.9Q37.05 6.9 36.225 7.3Q35.4 7.7 34.55 8.8L32.3 11.55L30.05 8.8Q29.2 7.7 28.375 7.3Q27.55 6.9 26.7 6.9Q25.35 6.9 24.475 7.775Q23.6 8.65 23.6 10Q23.6 12.05 26.3 15Q29 17.95 32.3 20.95ZM32.3 13.9Q32.3 13.9 32.3 13.9Q32.3 13.9 32.3 13.9Q32.3 13.9 32.3 13.9Q32.3 13.9 32.3 13.9Q32.3 13.9 32.3 13.9Q32.3 13.9 32.3 13.9Q32.3 13.9 32.3 13.9Q32.3 13.9 32.3 13.9Q32.3 13.9 32.3 13.9Q32.3 13.9 32.3 13.9Q32.3 13.9 32.3 13.9Q32.3 13.9 32.3 13.9ZM28.3 44.9 12.75 40.45V43.3H2V23.6H17.45L30.2 28.4Q31.55 28.9 32.475 30.025Q33.4 31.15 33.4 33.25H39.1Q41.2 33.25 42.6 34.75Q44 36.25 44 38.8V40.1ZM5 40.3H9.7V26.6H5ZM28.1 41.8 40.9 37.9Q40.6 36.95 40.15 36.6Q39.7 36.25 39.1 36.25H28.75Q27.25 36.25 25.975 36.05Q24.7 35.85 23.55 35.5L19.5 34.25L20.6 31.35L24.25 32.55Q25.5 32.95 26.625 33.1Q27.75 33.25 30.2 33.25Q30.2 32.65 29.975 32.075Q29.75 31.5 29.2 31.25L16.95 26.6H12.75V37.3ZM9.7 33.45ZM30.2 33.25Q30.2 33.25 30.2 33.25Q30.2 33.25 30.2 33.25Q30.2 33.25 30.2 33.25Q30.2 33.25 30.2 33.25Q30.2 33.25 30.2 33.25Q30.2 33.25 30.2 33.25Q30.2 33.25 30.2 33.25Q30.2 33.25 30.2 33.25ZM9.7 33.45ZM12.75 33.45Q12.75 33.45 12.75 33.45Q12.75 33.45 12.75 33.45Q12.75 33.45 12.75 33.45Q12.75 33.45 12.75 33.45Q12.75 33.45 12.75 33.45Q12.75 33.45 12.75 33.45Q12.75 33.45 12.75 33.45Q12.75 33.45 12.75 33.45Z' />
              </svg>
            </span>

            <h3 className='text-2xl font-bold'>Respeto</h3>
            <div className='divider'></div>
            <p className='text-center max-w-xs leading-5'>
              Reconocer, valorar y tratar de manera digna a todas las personas,
              con sus virtudes y defectos, sin importar su labor, su
              procedencia, títulos o cualquier condición.
            </p>
          </div>
          <div className='flex flex-col items-center max-w-lg lg:max-w-sm'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='48'
                width='48'
                className='font-bold'
                style={{ fill: "var(--asada-lemonade-green)" }}
              >
                <path d='M4 42V39H22.5V14.8Q21.2 14.35 20.175 13.325Q19.15 12.3 18.7 11H10.75L17 26.1Q16.95 28.35 15.075 29.925Q13.2 31.5 10.5 31.5Q7.8 31.5 5.925 29.925Q4.05 28.35 4 26.1L10.25 11H6V8H18.7Q19.3 6.25 20.75 5.125Q22.2 4 24 4Q25.8 4 27.25 5.125Q28.7 6.25 29.3 8H42V11H37.75L44 26.1Q43.95 28.35 42.075 29.925Q40.2 31.5 37.5 31.5Q34.8 31.5 32.925 29.925Q31.05 28.35 31 26.1L37.25 11H29.3Q28.85 12.3 27.825 13.325Q26.8 14.35 25.5 14.8V39H44V42ZM33.75 26H41.25L37.5 16.8ZM6.75 26H14.25L10.5 16.8ZM24 12Q25.05 12 25.775 11.25Q26.5 10.5 26.5 9.5Q26.5 8.45 25.775 7.725Q25.05 7 24 7Q23 7 22.25 7.725Q21.5 8.45 21.5 9.5Q21.5 10.5 22.25 11.25Q23 12 24 12Z' />
              </svg>
            </span>

            <h3 className='text-2xl font-bold'>Justicia</h3>
            <div className='divider'></div>
            <p className='text-center max-w-xs leading-5'>
              Actuar con imparcialidad, garantizando los derechos de las
              personas, con equidad, igualdad y sin discriminación.
            </p>
          </div>
        </div>
        <div className='flex flex-wrap justify-evenly gap-12'>
          <div className='flex flex-col items-center max-w-lg lg:max-w-sm'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='48'
                width='48'
                style={{ fill: "var(--asada-lemonade-green)" }}
              >
                <path d='M9 41.3Q7.75 41.3 6.875 40.425Q6 39.55 6 38.3V9.2Q6 7.95 6.875 7.075Q7.75 6.2 9 6.2H18.25Q18.6 4.45 20.1 3.225Q21.6 2 23.55 2Q25.5 2 27.025 3.225Q28.55 4.45 28.85 6.2H38.1Q39.35 6.2 40.225 7.075Q41.1 7.95 41.1 9.2V21.5H38.1V9.2Q38.1 9.2 38.1 9.2Q38.1 9.2 38.1 9.2H32.8V15.7H14.3V9.2H9Q9 9.2 9 9.2Q9 9.2 9 9.2V38.3Q9 38.3 9 38.3Q9 38.3 9 38.3H21.5V41.3ZM23.55 9.4Q24.45 9.4 25.1 8.75Q25.75 8.1 25.75 7.2Q25.75 6.3 25.1 5.65Q24.45 5 23.55 5Q22.65 5 22 5.65Q21.35 6.3 21.35 7.2Q21.35 8.1 22 8.75Q22.65 9.4 23.55 9.4ZM43.9 46 37.9 40Q36.9 40.8 35.625 41.15Q34.35 41.5 33 41.5Q29.45 41.5 26.975 39.025Q24.5 36.55 24.5 33Q24.5 29.45 26.975 26.975Q29.45 24.5 33 24.5Q36.55 24.5 39.025 26.975Q41.5 29.45 41.5 33Q41.5 34.35 41.15 35.625Q40.8 36.9 40 37.9L46 43.9ZM33 38.5Q35.35 38.5 36.925 36.925Q38.5 35.35 38.5 33Q38.5 30.65 36.925 29.075Q35.35 27.5 33 27.5Q30.65 27.5 29.075 29.075Q27.5 30.65 27.5 33Q27.5 35.35 29.075 36.925Q30.65 38.5 33 38.5Z' />
              </svg>
            </span>

            <h3 className='text-2xl font-bold'>Diligencia</h3>
            <div className='divider'></div>
            <p className='text-center max-w-xs leading-5'>
              Cumplir con los deberes, funciones y responsabilidades asignadas
              de la mejor manera posible, con atención, prontitud y eficiencia,
              para así optimizar los recursos del Acueducto.
            </p>
          </div>

          <div className='flex flex-col items-center max-w-lg lg:max-w-sm'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='48'
                width='48'
                style={{ fill: "var(--asada-lemonade-green)" }}
              >
                <path d='M23.75 41Q24 41 24.325 40.875Q24.65 40.75 24.85 40.55L41.7 23.65Q42.35 23 42.675 22.175Q43 21.35 43 20.5Q43 19.65 42.675 18.8Q42.35 17.95 41.7 17.3L32.7 8.3Q32.05 7.65 31.2 7.325Q30.35 7 29.5 7Q28.65 7 27.825 7.325Q27 7.65 26.35 8.3L25.45 9.2L29.5 13.3Q30.15 14 30.65 14.925Q31.15 15.85 31.15 16.95Q31.15 18.85 29.675 20.3Q28.2 21.75 26.3 21.75Q25.05 21.75 24.225 21.375Q23.4 21 22.7 20.3L19.05 16.65L10 25.7Q9.75 25.95 9.65 26.225Q9.55 26.5 9.55 26.8Q9.55 27.45 9.975 27.875Q10.4 28.3 11.05 28.3Q11.35 28.3 11.625 28.15Q11.9 28 12.1 27.8L19 20.9L21.1 23L14.25 29.85Q14 30.1 13.9 30.4Q13.8 30.7 13.8 31Q13.8 31.6 14.25 32.05Q14.7 32.5 15.3 32.5Q15.6 32.5 15.875 32.375Q16.15 32.25 16.35 32.05L23.25 25.15L25.35 27.25L18.5 34.1Q18.3 34.3 18.175 34.625Q18.05 34.95 18.05 35.25Q18.05 35.85 18.5 36.3Q18.95 36.75 19.55 36.75Q19.85 36.75 20.1 36.65Q20.35 36.55 20.6 36.3L27.5 29.4L29.6 31.5L22.7 38.4Q22.45 38.65 22.35 38.95Q22.25 39.25 22.25 39.5Q22.25 40.2 22.65 40.6Q23.05 41 23.75 41ZM23.75 44Q22.1 44 20.8 42.775Q19.5 41.55 19.25 39.75Q17.55 39.5 16.4 38.35Q15.25 37.2 15 35.5Q13.3 35.25 12.175 34.075Q11.05 32.9 10.8 31.25Q8.95 31 7.75 29.75Q6.55 28.5 6.55 26.75Q6.55 25.9 6.875 25.05Q7.2 24.2 7.85 23.55L19.05 12.35L24.55 17.85Q24.95 18.25 25.425 18.475Q25.9 18.7 26.35 18.7Q27 18.7 27.575 18.125Q28.15 17.55 28.15 16.9Q28.15 16.6 27.975 16.225Q27.8 15.85 27.4 15.45L20.25 8.3Q19.6 7.65 18.75 7.325Q17.9 7 17.05 7Q16.2 7 15.375 7.325Q14.55 7.65 13.9 8.3L6.3 15.9Q5.6 16.6 5.325 17.375Q5.05 18.15 5 19.1Q4.95 20.1 5.375 21.025Q5.8 21.95 6.4 22.7L4.25 24.85Q3.25 23.75 2.625 22.2Q2 20.65 2 19.05Q2 17.55 2.575 16.175Q3.15 14.8 4.2 13.75L11.75 6.2Q12.85 5.1 14.25 4.575Q15.65 4.05 17.1 4.05Q18.55 4.05 19.925 4.575Q21.3 5.1 22.4 6.2L23.3 7.1L24.2 6.2Q25.3 5.1 26.7 4.575Q28.1 4.05 29.55 4.05Q31 4.05 32.375 4.575Q33.75 5.1 34.85 6.2L43.8 15.15Q44.9 16.25 45.45 17.65Q46 19.05 46 20.5Q46 21.95 45.45 23.325Q44.9 24.7 43.8 25.8L26.95 42.65Q26.3 43.3 25.475 43.65Q24.65 44 23.75 44ZM18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Q18.85 16.7 18.85 16.7Z' />
              </svg>
            </span>

            <h3 className='text-2xl font-bold '>Compromiso</h3>
            <div className='divider'></div>
            <p className='text-center max-w-xs leading-5'>
              Ser consciente de la importancia del rol como servidor público y
              estar en disposición permanente para comprender y resolver las
              necesidades de las personas con las que éste se relaciona en las
              labores cotidianas, buscando siempre mejorar su bienestar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsValues;
