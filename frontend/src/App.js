import AdminLayout from "./components/layout/AdminLayout";
import ClientLayout from "./components/layout/ClientLayout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostsList from "./components/posts/PostsList";
import AboutUs from "./pages/AboutUs";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
/* Admin layout components */
import Dashboard from "./components/layout/Dashboard";
import UserLogin from "./components/users/UserLogin";
import SuggestionList from "./components/suggestions/SuggestionList";
import { ToastContainer } from "react-toastify";

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
          <Route path='posts' element={<PostsList />} />
          <Route path='projects' element={<Projects />} />
          <Route path='services' element={<Services />} />
          <Route path='contact' element={<Contact />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' index element={<Dashboard />} />
          <Route path='suggestions' element={<SuggestionList />} />
          <Route path='login' element={<UserLogin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
