import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import React from "react";
import Fly from "./Components/Fly/Fly";
import Hotel from "./Components/Hotel/Hotel";
import Home from "./Components/Home/Home";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fly" element={<Fly />} />
          <Route path="/hotel" element={<Hotel />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
