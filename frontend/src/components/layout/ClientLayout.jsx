import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { SuggestionProvider } from "../../context/suggestions/SuggestionContext";
import { JobProvider } from "../../context/jobs/JobContext";
import { PostProvider } from "../../context/posts/PostContext";
import { FormProvider } from "../../context/forms/FormContext";
import { JuntaDirectivaProvider } from "../../context/juntaDirectiva/JuntaDirectivaContext";
import { TransparenciaProvider } from "../../context/transparencia/TransparenciaContext";
import { ReglamentosProvider } from "../../context/reglamentos/ReglamentosContext";
import { ProjectProvider } from "../../context/projects/ProjectContext";
import { TanksProvider } from "../../context/tanks/TanksContext";
import { QuiebraGradientesProvider } from "../../context/quiebraGradientes/QuiebraGradientesContext";
import { AsadaProvider } from "../../context/asada/asadaContext";

function ClientLayout() {
  return (
    <SuggestionProvider>
      <JobProvider>
        <PostProvider>
          <FormProvider>
            <JuntaDirectivaProvider>
              <TransparenciaProvider>
                <ReglamentosProvider>
                  <ProjectProvider>
                    <TanksProvider>
                      <QuiebraGradientesProvider>
                        <AsadaProvider>
                          <Navbar />
                          <main className='mx-auto'>
                            <Outlet />
                          </main>

                          <Footer />
                        </AsadaProvider>
                      </QuiebraGradientesProvider>
                    </TanksProvider>
                  </ProjectProvider>
                </ReglamentosProvider>
              </TransparenciaProvider>
            </JuntaDirectivaProvider>
          </FormProvider>
        </PostProvider>
      </JobProvider>
    </SuggestionProvider>
  );
}

export default ClientLayout;
