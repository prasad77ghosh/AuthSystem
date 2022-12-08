import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import DashBoard from "./pages/Dashboard/DashBoard";
import About from "./pages/About/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
