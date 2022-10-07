import AdminLayout from "./components/layout/AdminLayout";
import ClientLayout from "./components/layout/ClientLayout";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import PostsClient from "./components/posts/PostsClient";
import AboutUs from "./pages/AboutUs";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Documentation from "./pages/Documentation";
import Jobs from "./components/jobs/Jobs";
import TanksClient from "./components/tanks/TanksClient";
import GradientesClient from "./components/quiebraGradientes/GradientesClient";
/* Admin layout components */
import Dashboard from "./components/layout/Dashboard";
import Contacto from "./components/asada/Contacto";
import ContactoAdd from "./components/asada/ContactoAdd";
import ContactoUpdate from "./components/asada/ContactoUpdate";
import DocsAdmin from "./components/layout/DocsAdmin";
import GeneralInfo from "./components/asada/GeneralInfo";
import UserLogin from "./components/users/UserLogin";
import SuggestionList from "./components/suggestions/SuggestionList";
import SuggestionItem from "./components/suggestions/SuggestionItem";
import FormsList from "./components/forms/FormsList";
import FormAdd from "./components/forms/FormAdd";
import FormItem from "./components/forms/FormItem";
import JobList from "./components/jobs/JobList";
import JobItem from "./components/jobs/JobItem";
import PostsAdmin from "./components/posts/PostsAdmin";
import PostAdd from "./components/posts/PostAdd";
import PostItem from "./components/posts/PostItem";
import { ToastContainer } from "react-toastify";
import JuntaDirectiva from "./components/juntaDirectiva/JuntaDirectiva";
import JuntaDirectivaAdd from "./components/juntaDirectiva/JuntaDirectivaAdd";
import JuntaDirectivaItem from "./components/juntaDirectiva/JuntaDirectivaItem";
import Users from "./components/users/Users";
import UserAdd from "./components/users/UserAdd";
import UserItem from "./components/users/UserItem";
import UserPasswordChange from "./components/users/UserPasswordChange";
import ProjectList from "./components/projects/ProjectList";
import ProjectAdd from "./components/projects/ProjectAdd";
import ProjectItem from "./components/projects/ProjectItem";
import TanksAdmin from "./components/tanks/TanksAdmin";
import TankAdd from "./components/tanks/TankAdd";
import TankItem from "./components/tanks/TankItem";
import GradientesAdmin from "./components/quiebraGradientes/GradientesAdmin";
import GradienteAdd from "./components/quiebraGradientes/GradienteAdd";
import GradienteItem from "./components/quiebraGradientes/GradienteItem";
import InformesList from "./components/informes/InformesList";
import ReglamentosList from "./components/reglamentos/ReglamentosList";
import ReglamentosAdd from "./components/reglamentos/ReglamentosAdd";
import ReglamentosItem from "./components/reglamentos/ReglamentosItem";
import InformesAdd from "./components/informes/InformesAdd";
import InformesItem from "./components/informes/InformesItem";
/* FRAMER MOTION */
import { AnimatePresence, motion } from "framer-motion";
import TransparenciaList from "./components/transparencia/TransparenciaList";
import TransparenciaAdd from "./components/transparencia/TransparenciaAdd";
import TransparenciaItem from "./components/transparencia/TransparenciaItem";
import History from "./pages/sections/History";
import Gallery from "./pages/Gallery";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path='nosotros' element={<AboutUs />} />
            <Route path='historia' element={<History />} />
            <Route path='publicaciones' element={<PostsClient />} />
            <Route path='proyectos' element={<Projects />} />
            <Route path='servicios' element={<Services />} />
            <Route path='contacto' element={<Contact />} />
            <Route path='contacto/curriculum' element={<Jobs />} />
            <Route path='documentacion' element={<Documentation />} />
            <Route path='tanques' element={<TanksClient />} />
            <Route path='quiebraGradientes' element={<GradientesClient />} />
            <Route path='galeria' element={<Gallery />} />
          </Route>
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='dashboard' element={<Dashboard />}>
              <Route path='general' element={<GeneralInfo />} />
              <Route path='contacto' element={<Contacto />} />
              <Route path='contacto/add' element={<ContactoAdd />} />
              <Route path='contacto/:id' element={<ContactoUpdate />} />
              <Route path='juntaDirectiva' element={<JuntaDirectiva />} />
              <Route
                path='juntaDirectiva/add'
                element={<JuntaDirectivaAdd />}
              />
              <Route
                path='juntaDirectiva/:id'
                element={<JuntaDirectivaItem />}
              />
              <Route path='users' element={<Users />} />
              <Route path='users/add' element={<UserAdd />} />
              <Route path='users/:id' element={<UserItem />} />
              <Route
                path='users/:id/changePassword'
                element={<UserPasswordChange />}
              />
            </Route>
            <Route path='suggestions' element={<SuggestionList />} />
            <Route path='suggestions/:id' element={<SuggestionItem />} />
            <Route path='docs' element={<DocsAdmin />}>
              <Route path='formularios' element={<FormsList />} />
              <Route path='formularios/add' element={<FormAdd />} />
              <Route path='formularios/:id' element={<FormItem />} />
              <Route path='informes' element={<InformesList />} />
              <Route path='informes/add' element={<InformesAdd />} />
              <Route path='informes/:id' element={<InformesItem />} />
              <Route path='reglamentos' element={<ReglamentosList />} />
              <Route path='reglamentos/add' element={<ReglamentosAdd />} />
              <Route path='reglamentos/:id' element={<ReglamentosItem />} />
              <Route path='transparencia' element={<TransparenciaList />} />
              <Route path='transparencia/add' element={<TransparenciaAdd />} />
              <Route path='transparencia/:id' element={<TransparenciaItem />} />
            </Route>
            <Route path='jobs' element={<JobList />} />
            <Route path='jobs/:id' element={<JobItem />} />
            <Route path='posts' element={<PostsAdmin />} />
            <Route path='posts/add' element={<PostAdd />} />
            <Route path='posts/:id' element={<PostItem />} />
            <Route path='projects' element={<ProjectList />} />
            <Route path='projects/add' element={<ProjectAdd />} />
            <Route path='projects/:id' element={<ProjectItem />} />
            <Route path='tanks' element={<TanksAdmin />} />
            <Route path='tanks/add' element={<TankAdd />} />
            <Route path='tanks/:id' element={<TankItem />} />
            <Route path='gradientes' element={<GradientesAdmin />} />
            <Route path='gradientes/add' element={<GradienteAdd />} />
            <Route path='gradientes/:id' element={<GradienteItem />} />
            <Route path='login' element={<UserLogin />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
