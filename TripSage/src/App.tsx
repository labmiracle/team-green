import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import React from 'react';
import CarouselSlider from './Components/SliderHome/CarouselSlider';



const App: React.FC = () => { 
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <CarouselSlider/>
      </BrowserRouter>
    </>
  );
}

export default App;
