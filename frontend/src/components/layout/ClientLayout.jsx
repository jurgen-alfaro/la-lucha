import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { SuggestionProvider } from "../../context/suggestions/SuggestionContext";

function ClientLayout() {
  return (
    <SuggestionProvider>
      <Navbar />
      <main className='mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </SuggestionProvider>
  );
}

export default ClientLayout;
