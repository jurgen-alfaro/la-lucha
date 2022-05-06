import { useContext, useEffect } from "react";
import FormContext from "../context/forms/FormContext";
import TransparenciaContext from "../context/transparencia/TransparenciaContext";
import ReglamentosContext from "../context/reglamentos/ReglamentosContext";
import Spinner from "../components/shared/Spinner";
import bgImg from "../assets/Vision.png";
import { FaNewspaper, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";

// Framer motion variants
const pageVariants = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.5,
};

function Documentation() {
  const { forms, getForms, downloadFormDocumentClient, displayForm } =
    useContext(FormContext);

  const {
    documentos,
    getDocumentos,
    downloadTransparenciaDocumentClient,
    displayDocumentoClient,
  } = useContext(TransparenciaContext);

  const {
    reglamentos,
    getReglamentos,
    downloadReglamentoDocumentClient,
    displayReglamentoClient,
  } = useContext(ReglamentosContext);

  useEffect(() => {
    const fetchTransparenciaDocs = async () => await getDocumentos();
    const fetchForms = async () => await getForms();
    const fetchReglamentos = async () => await getReglamentos();

    fetchTransparenciaDocs();
    fetchForms();
    fetchReglamentos();
    window.scrollTo(0, 0);
  }, []);

  const handleFormDownload = (id) => downloadFormDocumentClient(id); // Download form
  const handleDisplayForm = (id) => displayForm(id); // Display form

  const handleDocDownload = (id) => downloadTransparenciaDocumentClient(id); // Download transparencia doc
  const handleDisplayDocumento = (id) => displayDocumentoClient(id); // Display transparencia doc

  const handleReglamentoDownload = (id) => downloadReglamentoDocumentClient(id); // Download reglamento
  const handleDisplayReglamento = (id) => displayReglamentoClient(id); // Display reglamento

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <section>
        <div className='documentation-lake-bg mb-12'>
          {/* DOCUMENTOS DE TRANSPARENCIA */}
          <div className='grid place-items-center text-center py-6 text-3xl lg:text-6xl xl:text-7xl h-screen'>
            <motion.div
              className='uppercase'
              style={{ backgroundColor: "rgba(126, 174, 70, 0.75)" }}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={{
                visible: {
                  opacity: 1,
                  y: "0",
                  scale: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.4,
                  },
                },
                hidden: { opacity: 0, y: "100px", scale: 0 },
              }}
            >
              <motion.h1
                className='p-12 text-white '
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      delay: 0.7,
                      duration: 0.5,
                    },
                  },
                  hidden: { opacity: 0 },
                }}
              >
                Documentación
              </motion.h1>
            </motion.div>
          </div>
        </div>
        <div className='container mx-auto'>
          <div className='grid sm:justify-center lg:grid-cols-2 '>
            <motion.div
              className='grid place-items-center text-center'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 1,
                    duration: 0.5,
                  },
                },
                hidden: { opacity: 0 },
              }}
            >
              {/*   <img
                src={bgImg}
                alt='Imagen de bomberos'
                className='w-full h-full object-fill'
              /> */}
              <svg
                id='GEAR'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 1600 1400'
              >
                <defs>
                  <style>{`.cls-1{fill:#87bfc1;}.cls-2,.cls-6{fill:#fff;}.cls-2,.cls-5{stroke:#262424;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px;}.cls-3{fill:#de9244;}.cls-4{fill:#dd9144;}.cls-5{fill:none;}.cls-7{fill:#262424;}.cls-8{fill:#88c0c2;`}</style>
                </defs>
                <title>Vision</title>
                <path
                  className='cls-1'
                  d='M1524.4,800l36.34-2.11a219,219,0,0,0,0-84.89l-36.34-2.11A181.4,181.4,0,0,0,1504,661.85l24.2-27.19a218.68,218.68,0,0,0-60-60L1441,598.83a181.4,181.4,0,0,0-49.09-20.35l-2.11-36.34a219,219,0,0,0-84.89,0l-2.11,36.34a181.4,181.4,0,0,0-49.09,20.35l-27.19-24.2a218.68,218.68,0,0,0-60,60l24.2,27.19a181.4,181.4,0,0,0-20.35,49.09L1134,713a219,219,0,0,0,0,84.89l36.34,2.11a181.4,181.4,0,0,0,20.35,49.09l-24.2,27.19a218.68,218.68,0,0,0,60,60l27.19-24.2a181.4,181.4,0,0,0,49.09,20.35l2.11,36.34a219,219,0,0,0,84.89,0l2.11-36.34A181.4,181.4,0,0,0,1441,912.15l27.19,24.2a218.68,218.68,0,0,0,60-60L1504,849.14A181.4,181.4,0,0,0,1524.4,800Zm-177,27.61a72.17,72.17,0,1,1,72.17-72.17A72.17,72.17,0,0,1,1347.39,827.66Z'
                />
                <rect
                  className='cls-2'
                  x='645.36'
                  y='267.93'
                  width='641.04'
                  height='860.69'
                  rx='51.24'
                  ry='51.24'
                  transform='translate(-92.21 149.68) rotate(-8.46)'
                />
                <rect
                  className='cls-3'
                  x='570.83'
                  y='437.49'
                  width='93.39'
                  height='33.36'
                  rx='15'
                  ry='15'
                  transform='translate(-60.09 95.78) rotate(-8.46)'
                />
                <rect
                  className='cls-3'
                  x='599.53'
                  y='630.5'
                  width='93.39'
                  height='33.36'
                  rx='15'
                  ry='15'
                  transform='translate(-88.17 102.1) rotate(-8.46)'
                />
                <rect
                  className='cls-3'
                  x='628.24'
                  y='823.5'
                  width='93.39'
                  height='33.36'
                  rx='15'
                  ry='15'
                  transform='translate(-116.25 108.42) rotate(-8.46)'
                />
                <rect
                  className='cls-3'
                  x='656.94'
                  y='1016.51'
                  width='93.39'
                  height='33.36'
                  rx='15'
                  ry='15'
                  transform='translate(-144.33 114.74) rotate(-8.46)'
                />
                <rect
                  className='cls-2'
                  x='741.57'
                  y='246.89'
                  width='641.04'
                  height='860.69'
                  rx='51.24'
                  ry='51.24'
                  transform='translate(160.32 -202.25) rotate(11.76)'
                />
                <rect
                  className='cls-1'
                  x='882.89'
                  y='298.89'
                  width='99'
                  height='99'
                  rx='18.5'
                  ry='18.5'
                  transform='translate(90.58 -182.72) rotate(11.76)'
                />
                <rect
                  className='cls-3'
                  x='1022.3'
                  y='382.71'
                  width='342'
                  height='40'
                  rx='20'
                  ry='20'
                  transform='translate(107.13 -234.76) rotate(11.76)'
                />
                <rect
                  className='cls-1'
                  x='842.74'
                  y='491.76'
                  width='99'
                  height='99'
                  rx='18.5'
                  ry='18.5'
                  transform='translate(129.04 -170.49) rotate(11.76)'
                />
                <rect
                  className='cls-3'
                  x='982.15'
                  y='575.58'
                  width='342'
                  height='40'
                  rx='20'
                  ry='20'
                  transform='translate(145.59 -222.53) rotate(11.76)'
                />
                <rect
                  className='cls-1'
                  x='802.59'
                  y='684.62'
                  width='99'
                  height='99'
                  rx='18.5'
                  ry='18.5'
                  transform='translate(167.51 -158.26) rotate(11.76)'
                />
                <rect
                  className='cls-3'
                  x='941.99'
                  y='768.44'
                  width='342'
                  height='40'
                  rx='20'
                  ry='20'
                  transform='translate(184.06 -210.29) rotate(11.76)'
                />
                <rect
                  className='cls-1'
                  x='762.44'
                  y='877.49'
                  width='99'
                  height='99'
                  rx='18.5'
                  ry='18.5'
                  transform='translate(205.98 -146.03) rotate(11.76)'
                />
                <rect
                  className='cls-3'
                  x='901.84'
                  y='961.31'
                  width='342'
                  height='40'
                  rx='20'
                  ry='20'
                  transform='translate(222.52 -198.06) rotate(11.76)'
                />
                <path
                  className='cls-2'
                  d='M248.38,711.49s24.92,7.3,29.7,12.95-1.36,12-1.36,12,9.3,20.48,8.8,28-11,3.52-11,3.52S248.76,778.07,241.4,774,230,720.76,230,720.76s-44.2-69-48.88-106.09,14.34-45.4,36.53-34.78C229.42,585.52,243.11,688.55,248.38,711.49Z'
                />
                <path
                  className='cls-4'
                  d='M176,583.16s-0.67,21.44,18.88,33.06,38-.27,38-0.27,78.64-96.83,79.88-123-16.4-37.19-41.06-25.88C239.16,482,176,583.16,176,583.16Z'
                />
                <path
                  className='cls-5'
                  d='M185.55,579.63s2.62,18,17.72,26c16,8.48,30.31-.75,30.31-0.75'
                />
                <path
                  className='cls-1'
                  d='M255.62,1071.56l-52.07-21.13,24-105.56s-10.93-221.95,34.66-267.92c42-42.35,98.06-22.4,87.53,29.31-8,39.47-29,165.17-38.43,222.45-2.94,17.77-4.76,29-4.76,29l-12.36,27.65Z'
                />
                <path
                  className='cls-6'
                  d='M276.67,788.76l-14.55,4.5a4.25,4.25,0,0,1-2.56,0l-14-4.5a3.92,3.92,0,0,1-2.7-4.05l1.72-26a4.61,4.61,0,0,1,4.53-4.25h28.5a3.93,3.93,0,0,1,4,4.25l-1.72,26A4.62,4.62,0,0,1,276.67,788.76Z'
                />
                <path
                  className='cls-6'
                  d='M294.19,985.32a21,21,0,0,1-2.66-1.09c-12.34-6.1-16.41-23-9.11-37.79,6-12.22,18-19.15,28.89-17.72-2.94,17.77-4.76,29-4.76,29Z'
                />
                <polyline
                  className='cls-5'
                  points='290.92 807.22 264.46 952.82 235.92 1046.23'
                />
                <polygon
                  className='cls-2'
                  points='216.61 1057.78 191.44 1130.87 216.63 1138.69 249.93 1073.73 216.61 1057.78'
                />
                <path
                  className='cls-1'
                  d='M296.88,1203.71v10.79H164.31s0-5.09.43-13.11c1-19.17,4.56-55.13,16.53-78.23h48.94s13,38.3,54.75,60.68a22.6,22.6,0,0,1,11.8,17.55A23,23,0,0,1,296.88,1203.71Z'
                />
                <path
                  className='cls-2'
                  d='M296.88,1203.71v10.79H164.31s0-5.09.43-13.11h132A23,23,0,0,1,296.88,1203.71Z'
                />
                <polygon
                  className='cls-2'
                  points='197.68 1039.53 266.49 1071.44 246.6 1107.13 186.03 1078.89 197.68 1039.53'
                />
                <path
                  className='cls-1'
                  d='M489.6,1061.24l-51.24,4.46L409.23,955.6s-72.69-110-81.36-136-30-55.58-22.79-114.79S398.63,641,412.11,692C422.4,731,459.33,853,476.23,908.5c5.24,17.23,8.56,28.07,8.56,28.07L486,966.83Z'
                />
                <path
                  className='cls-6'
                  d='M367.15,788.76l-13.24,4.5a4.25,4.25,0,0,1-2.56,0l-15.26-4.5a5.71,5.71,0,0,1-3.88-4.05l-5.81-26a3.3,3.3,0,0,1,3.3-4.25h28.5a5.62,5.62,0,0,1,5.2,4.25l5.81,26A3.3,3.3,0,0,1,367.15,788.76Z'
                />
                <path
                  className='cls-5'
                  d='M320.31,800.61c-9.47-22.32-20.77-50.32-15.22-95.79a57.06,57.06,0,0,1,3.22-13.28'
                />
                <path
                  className='cls-6'
                  d='M486,966.83a21,21,0,0,1-2.87.2c-13.76,0-24.91-13.36-24.91-29.84,0-13.63,7.63-25.13,18-28.69,5.24,17.23,8.56,28.07,8.56,28.07Z'
                />
                <path
                  className='cls-5'
                  d='M388,707.52l4.34,18.64a28.34,28.34,0,0,1-7.56,26.46l-2.87,2.87'
                />
                <polyline
                  className='cls-5'
                  points='367.48 710.68 444.91 950.87 460.71 1047.25'
                />
                <polygon
                  className='cls-2'
                  points='454.81 1066.17 464.63 1142.84 490.68 1138.69 491.75 1065.7 454.81 1066.17'
                />
                <path
                  className='cls-1'
                  d='M570.93,1203.71v10.79H438.36s0-5.09.43-13.11c1-19.17,4.56-55.13,16.53-78.23h48.94s13,38.3,54.75,60.68a22.6,22.6,0,0,1,11.8,17.55A23,23,0,0,1,570.93,1203.71Z'
                />
                <path
                  className='cls-2'
                  d='M570.93,1203.71v10.79H438.36s0-5.09.43-13.11h132A23,23,0,0,1,570.93,1203.71Z'
                />
                <polygon
                  className='cls-2'
                  points='424.79 1057.36 505.57 1056.31 503.56 1097.12 431.79 1097.8 424.79 1057.36'
                />
                <path
                  className='cls-2'
                  d='M320.66,402.2c1.61,4.75,27.83,36.86,50.39,21.59s12.17-71.92-4.77-79.8S298.85,338,320.66,402.2Z'
                />
                <polygon
                  className='cls-2'
                  points='308.69 445.42 315.69 408.29 337.25 404.89 340.71 446.24 308.69 445.42'
                />
                <path
                  className='cls-7'
                  d='M311.17,410.43c5.61,2,19.79,2.89,26.66,1.39L340.44,398s-16.29-20.77-5.69-29.45,21.57,4.06,22.8,16.12,35-2.27,34.53-21.86-21.57-25.65-21.57-25.65-15.53-21.1-49-6S292.6,380.32,311.17,410.43Z'
                />
                <path
                  className='cls-2'
                  d='M292.67,464.67s2.66-23.8,24.57-24.75,36.2,1.91,38.11,22.39Z'
                />
                <path
                  className='cls-4'
                  d='M311.21,457.47c-44.4,0-59.2,40.17-66.95,88.09s-16.91,192.08-16.91,192.08,80.84,13.42,204.16.73l-28-132.91s14.09-49.33,17.62-63.42-42.28-74.7-55-81S311.21,457.47,311.21,457.47Z'
                />
                <path
                  className='cls-5'
                  d='M275.6,469.87c-17.94,15.5-26.19,43.89-31.34,75.69-2.21,13.63-4.52,35-6.71,58.72'
                />
                <path className='cls-5' d='M240.46,725s82.45,10.68,173.64,0' />
                <path
                  className='cls-2'
                  d='M518.91,392.49c0,10.67-5,19.33-11.28,19.33a7.13,7.13,0,0,1-3.38-.88l-102-7.51V381.54l102-7.5a7,7,0,0,1,3.38-.89C513.86,373.15,518.91,381.81,518.91,392.49Z'
                />
                <ellipse
                  className='cls-2'
                  cx='402.21'
                  cy='392.49'
                  rx='6.38'
                  ry='10.94'
                />
                <path
                  className='cls-2'
                  d='M431.31,510.62s14.24-48.34,17-72.75c0,0-22-15.82-24.76-23s5.5-11.35,5.5-11.35-2.06-23.39,1-30.61,12,0.34,12,.34,28.89-1,34.74,5.5-7.22,56.4-7.22,56.4S485.1,511.81,476.85,550s-35.08,36.45-55,20.29S431.31,510.62,431.31,510.62Z'
                />
                <path
                  className='cls-4'
                  d='M417.63,579.8s22.26,2.45,35.95-16.94,2.83-39.56,2.83-39.56S398,465.18,370.82,461.74s-40,14-30.29,40.61C353.39,537.39,417.63,579.8,417.63,579.8Z'
                />
                <path
                  className='cls-5'
                  d='M414.75,569.53s19-1.25,28.54-16.31c10.13-15.92,1.7-31.61,1.7-31.61'
                />
                <path
                  className='cls-5'
                  d='M339,475.95c-2.65,6.91-2.32,16,1.51,26.4,10,27.18,50.85,58.79,68.7,71.61'
                />
                <path
                  className='cls-7'
                  d='M295.48,344.66s-14.18-36.82-47.2-28.24-36.06,49.95-31.15,76.73S197,427.23,181,429.8s-16.28,61.36,42.28,49.87,51.1-63.86,49.88-90.7,8.61-34.61,22.2-32.1S295.48,344.66,295.48,344.66Z'
                />
                <path
                  className='cls-2'
                  d='M295.87,346.16l-2.34,11.12a3.3,3.3,0,0,0,2.47,3.89l8.78,2.09a3.3,3.3,0,0,0,4-2.66l2-11.63a3.3,3.3,0,0,0-2.65-3.79l-8.41-1.57A3.3,3.3,0,0,0,295.87,346.16Z'
                />
                <line
                  className='cls-5'
                  x1='460.71'
                  y1='211.64'
                  x2='460.71'
                  y2='225.21'
                />
                <line
                  className='cls-5'
                  x1='481.18'
                  y1='232.11'
                  x2='467.61'
                  y2='232.11'
                />
                <line
                  className='cls-5'
                  x1='460.71'
                  y1='252.58'
                  x2='460.71'
                  y2='239.01'
                />
                <line
                  className='cls-5'
                  x1='440.25'
                  y1='232.11'
                  x2='453.82'
                  y2='232.11'
                />
                <line
                  className='cls-5'
                  x1='108.49'
                  y1='809.71'
                  x2='108.49'
                  y2='821.29'
                />
                <line
                  className='cls-5'
                  x1='125.95'
                  y1='827.17'
                  x2='114.37'
                  y2='827.17'
                />
                <line
                  className='cls-5'
                  x1='108.49'
                  y1='844.63'
                  x2='108.49'
                  y2='833.05'
                />
                <line
                  className='cls-5'
                  x1='91.03'
                  y1='827.17'
                  x2='102.6'
                  y2='827.17'
                />
                <line
                  className='cls-5'
                  x1='518.91'
                  y1='690.06'
                  x2='518.91'
                  y2='701.64'
                />
                <line
                  className='cls-5'
                  x1='536.37'
                  y1='707.52'
                  x2='524.79'
                  y2='707.52'
                />
                <line
                  className='cls-5'
                  x1='518.91'
                  y1='724.98'
                  x2='518.91'
                  y2='713.4'
                />
                <line
                  className='cls-5'
                  x1='501.45'
                  y1='707.52'
                  x2='513.03'
                  y2='707.52'
                />
                <circle className='cls-8' cx='637.48' cy='1115.07' r='16.83' />
              </svg>
            </motion.div>
            <div className='text-center px-12'>
              <div className='text-center py-6 text-3xl lg:text-5xl mt-8'>
                <motion.h2
                  className='pb-5'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        delay: 0.3,
                        duration: 0.5,
                      },
                    },
                    hidden: { opacity: 0 },
                  }}
                >
                  Transparencia
                </motion.h2>
              </div>
              <div className='grid sm:justify-center gap-5 px-12'>
                {documentos.length !== 0 &&
                  documentos.map((doc, i) => {
                    return (
                      <motion.div
                        className='card bg-base-100 shadow-xl'
                        key={doc.iddoc}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.3 }}
                        variants={{
                          visible: {
                            opacity: 1,
                          },
                          hidden: { opacity: 0 },
                        }}
                      >
                        <div className='card-body'>
                          <motion.h2
                            className='card-title justify-center'
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            variants={{
                              visible: {
                                opacity: 1,
                                y: "0",
                                scale: 1,
                                transition: {
                                  delay: 0.3,
                                  duration: 0.5,
                                },
                              },
                              hidden: { opacity: 0, y: "100px", scale: 0 },
                            }}
                          >
                            {doc.dname}
                          </motion.h2>
                          <motion.p
                            className='flex justify-start'
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            variants={{
                              visible: {
                                opacity: 1,
                                x: "0",
                                scale: 1,
                                transition: {
                                  delay: 0.7,
                                  duration: 0.5,
                                },
                              },
                              hidden: { opacity: 0, x: "100px", scale: 0 },
                            }}
                          >
                            {doc.ddesc}
                          </motion.p>
                          <motion.div
                            className='justify-center mt-3 card-actions'
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            variants={{
                              visible: {
                                opacity: 1,

                                transition: {
                                  delay: 1,
                                  duration: 1,
                                },
                              },
                              hidden: { opacity: 0 },
                            }}
                          >
                            <button
                              className='btn btn-primary btn-outline btn-sm'
                              onClick={() => {
                                handleDocDownload(doc.iddoc);
                              }}
                            >
                              Descargar&nbsp;
                              <FaDownload />
                            </button>
                            <button
                              className='btn btn-primary btn-sm'
                              onClick={() => {
                                handleDisplayDocumento(doc.iddoc);
                              }}
                            >
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
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* FORMS */}
          <div className='text-center py-6 text-3xl lg:text-5xl mt-8'>
            <motion.h2
              className='pb-5'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.5,
                  },
                },
                hidden: { opacity: 0 },
              }}
            >
              Formularios
            </motion.h2>
          </div>
          <div className='grid sm:justify-center lg:grid-cols-2 xl:grid-cols-3 gap-5 px-12'>
            {forms.length !== 0 &&
              forms.map((form, i) => {
                return (
                  <motion.div
                    className='card lg:card-side sm:card-side bg-base-100 shadow-xl'
                    key={form.idforms}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.3 }}
                    variants={{
                      visible: {
                        opacity: 1,
                      },
                      hidden: { opacity: 0 },
                    }}
                  >
                    <div className='card-body'>
                      <h2 className='card-title justify-center text-center'>
                        {form.fname}
                      </h2>
                      <p className='flex justify-start'>{form.fdesc}</p>
                      <motion.div
                        className='justify-center mt-3 card-actions'
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        variants={{
                          visible: {
                            opacity: 1,
                          },
                          hidden: { opacity: 0 },
                        }}
                      >
                        <button
                          className='btn btn-primary btn-outline btn-sm'
                          onClick={() => {
                            handleFormDownload(form.idforms);
                          }}
                        >
                          Descargar&nbsp;
                          <FaDownload />
                        </button>
                        <button
                          className='btn btn-primary btn-sm'
                          onClick={() => {
                            handleDisplayForm(form.idforms);
                          }}
                        >
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
                      </motion.div>
                    </div>
                    <figure className='bg-base-300'>
                      <motion.span
                        style={{ width: "150px", height: "90px" }}
                        className='flex text-center'
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        transition={{ delay: 1.3 }}
                        variants={{
                          visible: {
                            opacity: 1,
                            scale: 1,
                            rotate: "0deg",
                          },
                          hidden: { opacity: 0, scale: 0.8, rotate: "360deg" },
                        }}
                      >
                        <FaNewspaper
                          style={{ width: "100%", height: "100%" }}
                        />
                      </motion.span>
                    </figure>
                  </motion.div>
                );
              })}
          </div>

          {/* REGLAMENTOS */}
          <div className='grid sm:justify-center lg:grid-cols-2 mt-12 '>
            <div className='text-center px-12  py-6'>
              <div className='text-center py-6 text-3xl lg:text-5xl mt-8'>
                <motion.h2
                  className='pb-5'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        delay: 0.3,
                        duration: 0.5,
                      },
                    },
                    hidden: { opacity: 0 },
                  }}
                >
                  Reglamentos
                </motion.h2>
              </div>
              <div className='grid  place-items-center text-center py-6 px-6 gap-5 max-h-screen overflow-y-auto scrollbar-hide '>
                {reglamentos.length !== 0 &&
                  reglamentos.map((doc, i) => {
                    return (
                      <motion.div
                        className='card bg-base-100 shadow-xl '
                        key={doc.idreglamento}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.4, duration: 0.7 }}
                        variants={{
                          visible: {
                            opacity: 1,
                            x: 0,
                            y: 0,
                          },
                          hidden: { opacity: 0, x: "-200px", y: "-200px" },
                        }}
                      >
                        <div className='card-body'>
                          <motion.h2
                            className='card-title justify-center'
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            variants={{
                              visible: {
                                opacity: 1,

                                scale: 1,
                                transition: {
                                  delay: 1.1,
                                  duration: 0.7,
                                },
                              },
                              hidden: { opacity: 0, scale: 0 },
                            }}
                          >
                            {doc.rname}
                          </motion.h2>
                          <motion.p
                            className='flex justify-start'
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            variants={{
                              visible: {
                                opacity: 1,

                                transition: {
                                  delay: 1.4,
                                  duration: 0.7,
                                },
                              },
                              hidden: { opacity: 0 },
                            }}
                          >
                            {doc.rdesc}
                          </motion.p>
                          <motion.div
                            className='justify-center mt-3 card-actions'
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            variants={{
                              visible: {
                                opacity: 1,

                                transition: {
                                  delay: 1,
                                  duration: 1,
                                },
                              },
                              hidden: { opacity: 0 },
                            }}
                          >
                            <button
                              className='btn btn-primary btn-outline  btn-sm'
                              onClick={() => {
                                handleReglamentoDownload(doc.idreglamento);
                              }}
                            >
                              Descargar&nbsp;
                              <FaDownload />
                            </button>
                            <button
                              className='btn btn-primary btn-sm'
                              onClick={() => {
                                handleDisplayReglamento(doc.idreglamento);
                              }}
                            >
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
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
            <div className='relative text-center'>
              <svg
                id='GEAR'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 1600 1400'
              >
                <defs>
                  <style>{`.cls-1{fill:#87bfc1;}.cls-2,.cls-6{fill:#fff;}.cls-2,.cls-5{stroke:#262424;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px;}.cls-3{fill:#de9244;}.cls-4{fill:#dd9144;}.cls-5{fill:none;}.cls-7{fill:#262424;}.cls-8{fill:#88c0c2;`}</style>
                </defs>
                <title>Vision</title>
                <path
                  className='cls-1'
                  d='M1524.4,800l36.34-2.11a219,219,0,0,0,0-84.89l-36.34-2.11A181.4,181.4,0,0,0,1504,661.85l24.2-27.19a218.68,218.68,0,0,0-60-60L1441,598.83a181.4,181.4,0,0,0-49.09-20.35l-2.11-36.34a219,219,0,0,0-84.89,0l-2.11,36.34a181.4,181.4,0,0,0-49.09,20.35l-27.19-24.2a218.68,218.68,0,0,0-60,60l24.2,27.19a181.4,181.4,0,0,0-20.35,49.09L1134,713a219,219,0,0,0,0,84.89l36.34,2.11a181.4,181.4,0,0,0,20.35,49.09l-24.2,27.19a218.68,218.68,0,0,0,60,60l27.19-24.2a181.4,181.4,0,0,0,49.09,20.35l2.11,36.34a219,219,0,0,0,84.89,0l2.11-36.34A181.4,181.4,0,0,0,1441,912.15l27.19,24.2a218.68,218.68,0,0,0,60-60L1504,849.14A181.4,181.4,0,0,0,1524.4,800Zm-177,27.61a72.17,72.17,0,1,1,72.17-72.17A72.17,72.17,0,0,1,1347.39,827.66Z'
                />
                <rect
                  className='cls-2'
                  x='645.36'
                  y='267.93'
                  width='641.04'
                  height='860.69'
                  rx='51.24'
                  ry='51.24'
                  transform='translate(-92.21 149.68) rotate(-8.46)'
                />
                <rect
                  className='cls-3'
                  x='570.83'
                  y='437.49'
                  width='93.39'
                  height='33.36'
                  rx='15'
                  ry='15'
                  transform='translate(-60.09 95.78) rotate(-8.46)'
                />
                <rect
                  className='cls-3'
                  x='599.53'
                  y='630.5'
                  width='93.39'
                  height='33.36'
                  rx='15'
                  ry='15'
                  transform='translate(-88.17 102.1) rotate(-8.46)'
                />
                <rect
                  className='cls-3'
                  x='628.24'
                  y='823.5'
                  width='93.39'
                  height='33.36'
                  rx='15'
                  ry='15'
                  transform='translate(-116.25 108.42) rotate(-8.46)'
                />
                <rect
                  className='cls-3'
                  x='656.94'
                  y='1016.51'
                  width='93.39'
                  height='33.36'
                  rx='15'
                  ry='15'
                  transform='translate(-144.33 114.74) rotate(-8.46)'
                />
                <rect
                  className='cls-2'
                  x='741.57'
                  y='246.89'
                  width='641.04'
                  height='860.69'
                  rx='51.24'
                  ry='51.24'
                  transform='translate(160.32 -202.25) rotate(11.76)'
                />
                <rect
                  className='cls-1'
                  x='882.89'
                  y='298.89'
                  width='99'
                  height='99'
                  rx='18.5'
                  ry='18.5'
                  transform='translate(90.58 -182.72) rotate(11.76)'
                />
                <rect
                  className='cls-3'
                  x='1022.3'
                  y='382.71'
                  width='342'
                  height='40'
                  rx='20'
                  ry='20'
                  transform='translate(107.13 -234.76) rotate(11.76)'
                />
                <rect
                  className='cls-1'
                  x='842.74'
                  y='491.76'
                  width='99'
                  height='99'
                  rx='18.5'
                  ry='18.5'
                  transform='translate(129.04 -170.49) rotate(11.76)'
                />
                <rect
                  className='cls-3'
                  x='982.15'
                  y='575.58'
                  width='342'
                  height='40'
                  rx='20'
                  ry='20'
                  transform='translate(145.59 -222.53) rotate(11.76)'
                />
                <rect
                  className='cls-1'
                  x='802.59'
                  y='684.62'
                  width='99'
                  height='99'
                  rx='18.5'
                  ry='18.5'
                  transform='translate(167.51 -158.26) rotate(11.76)'
                />
                <rect
                  className='cls-3'
                  x='941.99'
                  y='768.44'
                  width='342'
                  height='40'
                  rx='20'
                  ry='20'
                  transform='translate(184.06 -210.29) rotate(11.76)'
                />
                <rect
                  className='cls-1'
                  x='762.44'
                  y='877.49'
                  width='99'
                  height='99'
                  rx='18.5'
                  ry='18.5'
                  transform='translate(205.98 -146.03) rotate(11.76)'
                />
                <rect
                  className='cls-3'
                  x='901.84'
                  y='961.31'
                  width='342'
                  height='40'
                  rx='20'
                  ry='20'
                  transform='translate(222.52 -198.06) rotate(11.76)'
                />
                <path
                  className='cls-2'
                  d='M248.38,711.49s24.92,7.3,29.7,12.95-1.36,12-1.36,12,9.3,20.48,8.8,28-11,3.52-11,3.52S248.76,778.07,241.4,774,230,720.76,230,720.76s-44.2-69-48.88-106.09,14.34-45.4,36.53-34.78C229.42,585.52,243.11,688.55,248.38,711.49Z'
                />
                <path
                  className='cls-4'
                  d='M176,583.16s-0.67,21.44,18.88,33.06,38-.27,38-0.27,78.64-96.83,79.88-123-16.4-37.19-41.06-25.88C239.16,482,176,583.16,176,583.16Z'
                />
                <path
                  className='cls-5'
                  d='M185.55,579.63s2.62,18,17.72,26c16,8.48,30.31-.75,30.31-0.75'
                />
                <path
                  className='cls-1'
                  d='M255.62,1071.56l-52.07-21.13,24-105.56s-10.93-221.95,34.66-267.92c42-42.35,98.06-22.4,87.53,29.31-8,39.47-29,165.17-38.43,222.45-2.94,17.77-4.76,29-4.76,29l-12.36,27.65Z'
                />
                <path
                  className='cls-6'
                  d='M276.67,788.76l-14.55,4.5a4.25,4.25,0,0,1-2.56,0l-14-4.5a3.92,3.92,0,0,1-2.7-4.05l1.72-26a4.61,4.61,0,0,1,4.53-4.25h28.5a3.93,3.93,0,0,1,4,4.25l-1.72,26A4.62,4.62,0,0,1,276.67,788.76Z'
                />
                <path
                  className='cls-6'
                  d='M294.19,985.32a21,21,0,0,1-2.66-1.09c-12.34-6.1-16.41-23-9.11-37.79,6-12.22,18-19.15,28.89-17.72-2.94,17.77-4.76,29-4.76,29Z'
                />
                <polyline
                  className='cls-5'
                  points='290.92 807.22 264.46 952.82 235.92 1046.23'
                />
                <polygon
                  className='cls-2'
                  points='216.61 1057.78 191.44 1130.87 216.63 1138.69 249.93 1073.73 216.61 1057.78'
                />
                <path
                  className='cls-1'
                  d='M296.88,1203.71v10.79H164.31s0-5.09.43-13.11c1-19.17,4.56-55.13,16.53-78.23h48.94s13,38.3,54.75,60.68a22.6,22.6,0,0,1,11.8,17.55A23,23,0,0,1,296.88,1203.71Z'
                />
                <path
                  className='cls-2'
                  d='M296.88,1203.71v10.79H164.31s0-5.09.43-13.11h132A23,23,0,0,1,296.88,1203.71Z'
                />
                <polygon
                  className='cls-2'
                  points='197.68 1039.53 266.49 1071.44 246.6 1107.13 186.03 1078.89 197.68 1039.53'
                />
                <path
                  className='cls-1'
                  d='M489.6,1061.24l-51.24,4.46L409.23,955.6s-72.69-110-81.36-136-30-55.58-22.79-114.79S398.63,641,412.11,692C422.4,731,459.33,853,476.23,908.5c5.24,17.23,8.56,28.07,8.56,28.07L486,966.83Z'
                />
                <path
                  className='cls-6'
                  d='M367.15,788.76l-13.24,4.5a4.25,4.25,0,0,1-2.56,0l-15.26-4.5a5.71,5.71,0,0,1-3.88-4.05l-5.81-26a3.3,3.3,0,0,1,3.3-4.25h28.5a5.62,5.62,0,0,1,5.2,4.25l5.81,26A3.3,3.3,0,0,1,367.15,788.76Z'
                />
                <path
                  className='cls-5'
                  d='M320.31,800.61c-9.47-22.32-20.77-50.32-15.22-95.79a57.06,57.06,0,0,1,3.22-13.28'
                />
                <path
                  className='cls-6'
                  d='M486,966.83a21,21,0,0,1-2.87.2c-13.76,0-24.91-13.36-24.91-29.84,0-13.63,7.63-25.13,18-28.69,5.24,17.23,8.56,28.07,8.56,28.07Z'
                />
                <path
                  className='cls-5'
                  d='M388,707.52l4.34,18.64a28.34,28.34,0,0,1-7.56,26.46l-2.87,2.87'
                />
                <polyline
                  className='cls-5'
                  points='367.48 710.68 444.91 950.87 460.71 1047.25'
                />
                <polygon
                  className='cls-2'
                  points='454.81 1066.17 464.63 1142.84 490.68 1138.69 491.75 1065.7 454.81 1066.17'
                />
                <path
                  className='cls-1'
                  d='M570.93,1203.71v10.79H438.36s0-5.09.43-13.11c1-19.17,4.56-55.13,16.53-78.23h48.94s13,38.3,54.75,60.68a22.6,22.6,0,0,1,11.8,17.55A23,23,0,0,1,570.93,1203.71Z'
                />
                <path
                  className='cls-2'
                  d='M570.93,1203.71v10.79H438.36s0-5.09.43-13.11h132A23,23,0,0,1,570.93,1203.71Z'
                />
                <polygon
                  className='cls-2'
                  points='424.79 1057.36 505.57 1056.31 503.56 1097.12 431.79 1097.8 424.79 1057.36'
                />
                <path
                  className='cls-2'
                  d='M320.66,402.2c1.61,4.75,27.83,36.86,50.39,21.59s12.17-71.92-4.77-79.8S298.85,338,320.66,402.2Z'
                />
                <polygon
                  className='cls-2'
                  points='308.69 445.42 315.69 408.29 337.25 404.89 340.71 446.24 308.69 445.42'
                />
                <path
                  className='cls-7'
                  d='M311.17,410.43c5.61,2,19.79,2.89,26.66,1.39L340.44,398s-16.29-20.77-5.69-29.45,21.57,4.06,22.8,16.12,35-2.27,34.53-21.86-21.57-25.65-21.57-25.65-15.53-21.1-49-6S292.6,380.32,311.17,410.43Z'
                />
                <path
                  className='cls-2'
                  d='M292.67,464.67s2.66-23.8,24.57-24.75,36.2,1.91,38.11,22.39Z'
                />
                <path
                  className='cls-4'
                  d='M311.21,457.47c-44.4,0-59.2,40.17-66.95,88.09s-16.91,192.08-16.91,192.08,80.84,13.42,204.16.73l-28-132.91s14.09-49.33,17.62-63.42-42.28-74.7-55-81S311.21,457.47,311.21,457.47Z'
                />
                <path
                  className='cls-5'
                  d='M275.6,469.87c-17.94,15.5-26.19,43.89-31.34,75.69-2.21,13.63-4.52,35-6.71,58.72'
                />
                <path className='cls-5' d='M240.46,725s82.45,10.68,173.64,0' />
                <path
                  className='cls-2'
                  d='M518.91,392.49c0,10.67-5,19.33-11.28,19.33a7.13,7.13,0,0,1-3.38-.88l-102-7.51V381.54l102-7.5a7,7,0,0,1,3.38-.89C513.86,373.15,518.91,381.81,518.91,392.49Z'
                />
                <ellipse
                  className='cls-2'
                  cx='402.21'
                  cy='392.49'
                  rx='6.38'
                  ry='10.94'
                />
                <path
                  className='cls-2'
                  d='M431.31,510.62s14.24-48.34,17-72.75c0,0-22-15.82-24.76-23s5.5-11.35,5.5-11.35-2.06-23.39,1-30.61,12,0.34,12,.34,28.89-1,34.74,5.5-7.22,56.4-7.22,56.4S485.1,511.81,476.85,550s-35.08,36.45-55,20.29S431.31,510.62,431.31,510.62Z'
                />
                <path
                  className='cls-4'
                  d='M417.63,579.8s22.26,2.45,35.95-16.94,2.83-39.56,2.83-39.56S398,465.18,370.82,461.74s-40,14-30.29,40.61C353.39,537.39,417.63,579.8,417.63,579.8Z'
                />
                <path
                  className='cls-5'
                  d='M414.75,569.53s19-1.25,28.54-16.31c10.13-15.92,1.7-31.61,1.7-31.61'
                />
                <path
                  className='cls-5'
                  d='M339,475.95c-2.65,6.91-2.32,16,1.51,26.4,10,27.18,50.85,58.79,68.7,71.61'
                />
                <path
                  className='cls-7'
                  d='M295.48,344.66s-14.18-36.82-47.2-28.24-36.06,49.95-31.15,76.73S197,427.23,181,429.8s-16.28,61.36,42.28,49.87,51.1-63.86,49.88-90.7,8.61-34.61,22.2-32.1S295.48,344.66,295.48,344.66Z'
                />
                <path
                  className='cls-2'
                  d='M295.87,346.16l-2.34,11.12a3.3,3.3,0,0,0,2.47,3.89l8.78,2.09a3.3,3.3,0,0,0,4-2.66l2-11.63a3.3,3.3,0,0,0-2.65-3.79l-8.41-1.57A3.3,3.3,0,0,0,295.87,346.16Z'
                />
                <line
                  className='cls-5'
                  x1='460.71'
                  y1='211.64'
                  x2='460.71'
                  y2='225.21'
                />
                <line
                  className='cls-5'
                  x1='481.18'
                  y1='232.11'
                  x2='467.61'
                  y2='232.11'
                />
                <line
                  className='cls-5'
                  x1='460.71'
                  y1='252.58'
                  x2='460.71'
                  y2='239.01'
                />
                <line
                  className='cls-5'
                  x1='440.25'
                  y1='232.11'
                  x2='453.82'
                  y2='232.11'
                />
                <line
                  className='cls-5'
                  x1='108.49'
                  y1='809.71'
                  x2='108.49'
                  y2='821.29'
                />
                <line
                  className='cls-5'
                  x1='125.95'
                  y1='827.17'
                  x2='114.37'
                  y2='827.17'
                />
                <line
                  className='cls-5'
                  x1='108.49'
                  y1='844.63'
                  x2='108.49'
                  y2='833.05'
                />
                <line
                  className='cls-5'
                  x1='91.03'
                  y1='827.17'
                  x2='102.6'
                  y2='827.17'
                />
                <line
                  className='cls-5'
                  x1='518.91'
                  y1='690.06'
                  x2='518.91'
                  y2='701.64'
                />
                <line
                  className='cls-5'
                  x1='536.37'
                  y1='707.52'
                  x2='524.79'
                  y2='707.52'
                />
                <line
                  className='cls-5'
                  x1='518.91'
                  y1='724.98'
                  x2='518.91'
                  y2='713.4'
                />
                <line
                  className='cls-5'
                  x1='501.45'
                  y1='707.52'
                  x2='513.03'
                  y2='707.52'
                />
                <circle className='cls-8' cx='637.48' cy='1115.07' r='16.83' />
              </svg>
              {/*  <img
                src={bgImg}
                alt='Imagen de bomberos'
                className='w-full h-full object-fill'
              /> */}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Documentation;
