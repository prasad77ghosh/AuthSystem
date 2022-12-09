import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import DashBoard from "./pages/Dashboard/DashBoard";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtrctedRoute from "./protectedRoute/ProtectedRoute";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users/:id/verify/:token" element={<VerifyEmail />} />
          <Route element={<ProtrctedRoute />}>
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
