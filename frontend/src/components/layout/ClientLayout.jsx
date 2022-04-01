import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { SuggestionProvider } from "../../context/suggestions/SuggestionContext";
import { JobProvider } from "../../context/jobs/JobContext";
import { PostProvider } from "../../context/posts/PostContext";
import { FormProvider } from "../../context/forms/FormContext";
import { JuntaDirectivaProvider } from "../../context/juntaDirectiva/JuntaDirectivaContext";

function ClientLayout() {
  return (
    <SuggestionProvider>
      <JobProvider>
        <PostProvider>
          <FormProvider>
            <JuntaDirectivaProvider>
              <Navbar />
              <main className='mx-auto'>
                <Outlet />
              </main>
              <Footer />
            </JuntaDirectivaProvider>
          </FormProvider>
        </PostProvider>
      </JobProvider>
    </SuggestionProvider>
  );
}

export default ClientLayout;
