import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import React from "react";
import Fly from "./Components/Fly/Fly";
import Hotel from "./Components/Hotel/Hotel";
import Home from "./Components/Home/Home";

import CarouselSlider from "./Components/SliderHome/CarouselSlider";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <CarouselSlider />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fly" element={<Fly />} />
          <Route path="/hotel" element={<Hotel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
