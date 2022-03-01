import { useState } from "react";
import Dashboard from "./components/layout/Dashboard";
import Client from "./components/layout/Client";

function App() {
  const [user, setUser] = useState({});

  return Object.keys(user).length === 0 ? <Client /> : <Dashboard />;
}

export default App;
