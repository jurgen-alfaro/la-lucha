import { motion } from "framer-motion";

function AboutUsMV({ mision, vision }) {
  return (
    <section className='about-us-mv grid grid-cols-1 md:grid-cols-2 md:h-[50vh] '>
      <div className=' flex flex-col justify-center items-center px-12 my-12 md:my-0'>
        <motion.h1
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={{
            visible: {
              x: "0",
              opacity: 1,
              transition: {
                delay: 0.3,
                duration: 0.4,
              },
            },
            hidden: { opacity: 0, x: "-200px" },
          }}
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center '
        >
          Misión
        </motion.h1>
        <div className='divider'></div>
        <motion.p
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={{
            visible: {
              y: "0",
              opacity: 1,
              transition: {
                delay: 0.3,
                duration: 0.7,
              },
            },
            hidden: { opacity: 0, y: "100px" },
          }}
          className='sm:text-lg text-center '
        >
          {mision}
        </motion.p>
      </div>
      <div
        style={{ backgroundColor: "var(--asada-lemonade-green)" }}
        className='h-full flex flex-col justify-center items-center px-12 my-12 md:my-0'
      >
        <motion.h1
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={{
            visible: {
              x: "0",
              opacity: 1,
              transition: {
                delay: 0.3,
                duration: 0.4,
              },
            },
            hidden: { opacity: 0, x: "200px" },
          }}
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-base-300 text-center'
        >
          Visión
        </motion.h1>
        <div className='divider'></div>
        <motion.p
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={{
            visible: {
              y: "0",
              opacity: 1,
              transition: {
                delay: 0.3,
                duration: 0.7,
              },
            },
            hidden: { opacity: 0, y: "100px" },
          }}
          className='sm:text-lg text-center text-base-300'
        >
          {vision}
        </motion.p>
      </div>
    </section>
  );
}

export default AboutUsMV;
