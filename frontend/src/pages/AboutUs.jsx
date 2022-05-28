import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import AsadaContext from "../context/asada/asadaContext";
import AboutUsHero from "./sections/AboutUsHero";
import AboutUsMV from "./sections/AboutUsMV";
import AboutUsJuntaDirectiva from "./sections/AboutUsJuntaDirectiva";
import AboutUsSiteMap from "./sections/AboutUsSiteMap";
import AboutUsPhotoGallery from "./sections/AboutUsPhotoGallery";
import { motion } from "framer-motion";
import AboutUsValues from "./sections/AboutUsValues";
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

function AboutUs() {
  const { asada, getAsada } = useContext(AsadaContext);
  const { mision, vision, historia } = asada;

  const { hash } = useLocation();
  const historiaRef = useRef();
  const mvRef = useRef();
  const valoresRef = useRef();
  const juntaRef = useRef();
  const mapaRef = useRef();
  const galeriaRef = useRef();

  useEffect(() => {
    const fetchAsada = async () => await getAsada();
    fetchAsada();
    setTimeout(() => {
      checkHashInURL();
    }, 800);
  }, []);

  function checkHashInURL() {
    switch (hash) {
      case "#historia":
        historiaRef.current.scrollIntoView();
        break;
      case "#mv":
        mvRef.current.scrollIntoView();
        break;
      case "#valores":
        valoresRef.current.scrollIntoView();
        break;
      case "#junta":
        juntaRef.current.scrollIntoView();
        break;
      case "#mapa":
        mapaRef.current.scrollIntoView();
        break;
      case "#galeria":
        galeriaRef.current.scrollIntoView();
        break;
      default:
        window.scrollTo(0, 0);
        break;
    }
  }

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <div ref={historiaRef}>
        <AboutUsHero />
      </div>
      <div ref={mvRef}>
        <AboutUsMV mision={mision} vision={vision} />
      </div>
      <div ref={valoresRef}>
        <AboutUsValues />
      </div>
      <div ref={juntaRef}>
        <AboutUsJuntaDirectiva />
      </div>

      <div ref={mapaRef}>
        <AboutUsSiteMap />
      </div>
      <div ref={galeriaRef}>
        <AboutUsPhotoGallery />
      </div>
    </motion.div>
  );
}

export default AboutUs;
