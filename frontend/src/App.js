import "./App.css";
import { ToastContainer, toast } from "react-toastify";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./actions/AuthAction";
import Forgot from "./components/ForgotPassword/Forgot";
import ResetPassword from "./components/ResetPassword/ResetPassword";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users/:id/verify/:token" element={<VerifyEmail />} />
          <Route path="/password/forgot" element={<Forgot />} />
          <Route path="/user/password/reset/:token" element={<ResetPassword />} />
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
