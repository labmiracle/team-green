import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import React from 'react';
import CarouselSlider from './Components/SliderHome/CarouselSlider';



const App: React.FC = () => { 
  return (
    <>
      <BrowserRouter>
        <NavBar />
        {/* <img src="./TripSage/src/styles/img/carousel/Londres.jpg" alt="Imagen"/> */}
        <CarouselSlider/>
      </BrowserRouter>
    </>
  );
}

export default App;
