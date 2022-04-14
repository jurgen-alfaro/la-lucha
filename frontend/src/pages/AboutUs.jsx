import AboutUsHero from "./sections/AboutUsHero";
import AboutUsMV from "./sections/AboutUsMV";
import AboutUsJuntaDirectiva from "./sections/AboutUsJuntaDirectiva";
import AboutUsInformes from "./sections/AboutUsInformes";
import AboutUsSiteMap from "./sections/AboutUsSiteMap";
import AboutUsPhotoGallery from "./sections/AboutUsPhotoGallery";
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

function AboutUs() {
  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <AboutUsHero />
      <AboutUsMV />
      <AboutUsJuntaDirectiva />
      <AboutUsInformes />
      <AboutUsSiteMap />
      <AboutUsPhotoGallery />
    </motion.div>
  );
}

export default AboutUs;
