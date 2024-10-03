import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Protect from "./pages/Protect";

function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Router basename="/admin" >
        <Routes>
          <Route path="/" index element={<AdminLogin />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* admin routes */}
          <Route path="" element={<Protect />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
          {/* users route */}
          <Route path="" element={<Protect />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
