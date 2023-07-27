import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import React from 'react';
import CarouselSlider from './Components/SliderHome/CarouselSlider';

interface Image {
  url: string;
  alt: string;
}

const App: React.FC = () => { 
  const images: Image[] = [
    {
      url: 'TripSage/src/Img/Carousel/Grecia.jpg',
      alt: 'Imagen 1',
    },
    {
      url: 'TripSage/src/Img/Carousel/Londres.jpg',
      alt: 'Imagen 2',
    },
    {
      url: 'TripSage/src/Img/Carousel/NewYork.jpg',
      alt: 'Imagen 3',
    },
    {
      url: 'TripSage/src/Img/Carousel/Paris.jpg',
      alt: 'Imagen 4',
    },
    {
      url: 'TripSage/src/Img/Carousel/Roma.jpg',
      alt: 'Imagen 5',
    },
    {
      url: 'TripSage/src/Img/Carousel/TajMajal.jpg',
      alt: 'Imagen 6',
    },
    
  ];
  return (
    <>
      <BrowserRouter>
        <CarouselSlider images={images} />
        <NavBar />
      </BrowserRouter>
    </>
  );
}

export default App;
