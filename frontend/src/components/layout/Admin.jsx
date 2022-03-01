import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import LoginContext from "../../context/login/LoginContext";

function Admin() {
  // const { user, isLoading } = useContext(LoginContext);

  return (
    <Router>
      <Routes>
        <Route path='/dashboard' index element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default Admin;
