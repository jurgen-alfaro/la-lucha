import AdminLayout from "./components/layout/AdminLayout";
import ClientLayout from "./components/layout/ClientLayout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostsClient from "./components/posts/PostsClient";
import AboutUs from "./pages/AboutUs";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Documentation from "./pages/Documentation";
import Jobs from "./components/jobs/Jobs";
/* Admin layout components */
import Dashboard from "./components/layout/Dashboard";
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

function App() {
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
      <Routes>
        <Route path='/' element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path='about-us' element={<AboutUs />} />
          <Route path='posts' element={<PostsClient />} />
          <Route path='projects' element={<Projects />} />
          <Route path='services' element={<Services />} />
          <Route path='contact' element={<Contact />} />
          <Route path='contact/jobs' element={<Jobs />} />
          <Route path='documentation' element={<Documentation />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<Dashboard />}>
            <Route path='general' element={<GeneralInfo />} />
            <Route path='juntaDirectiva' element={<JuntaDirectiva />} />
            <Route path='juntaDirectiva/add' element={<JuntaDirectivaAdd />} />
            <Route path='juntaDirectiva/:id' element={<JuntaDirectivaItem />} />
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
          <Route path='forms' element={<FormsList />} />
          <Route path='forms/add' element={<FormAdd />} />
          <Route path='forms/:id' element={<FormItem />} />
          <Route path='jobs' element={<JobList />} />
          <Route path='jobs/:id' element={<JobItem />} />
          <Route path='posts' element={<PostsAdmin />} />
          <Route path='posts/add' element={<PostAdd />} />
          <Route path='posts/:id' element={<PostItem />} />
          <Route path='login' element={<UserLogin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
