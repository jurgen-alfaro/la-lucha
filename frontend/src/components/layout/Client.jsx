import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../../pages/Home";
import AboutUs from "../../pages/AboutUs";
import Projects from "../../pages/Projects";
import Services from "../../pages/Services";
import Contact from "../../pages/Contact";
import Footer from "../layout/Footer";

function Client() {
  return (
    <Router>
      <div>
        <Navbar />
        <main className='mx-auto'>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/services' element={<Services />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default Client;
