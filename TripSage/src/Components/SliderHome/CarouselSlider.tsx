import React, { useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselSlider.scss';


interface Image {
  url: string;
  alt: string;
}



const images: Image[] = [   
  {
    url: '/img/carousel/Grecia.jpg',
    alt: 'Imagen 2',
  },
   {
    url:'/img/carousel/Londres.jpg',
    alt: 'Imagen 2',
  },
  {
    url: '/img/carousel/NewYork.jpg',
    alt: 'Imagen 3',
  },
  {
    url: '/img/carousel/Paris.jpg',
    alt: 'Imagen 4',
  },
  {
    url: '/img/carousel/Roma.jpg',
    alt: 'Imagen 5',
  },
  {
    url: '/img/carousel/TajMajal.jpg',
    alt: 'Imagen 6',
  },
  
];

const CarouselSlider: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  

  return (
    <div className="carousel-slider">
      <Slider ref={sliderRef} {...sliderSettings}>
        {images.map((image, index) => (
          <div className='caruselItem thumbnail' key={index}>
            <img src={image.url} alt={image.alt} />
          </div>
        ))}
      </Slider>
      <div className="fixed-text">
        Donde quieras, cuando quieras TripSage te lleva con tan solo un click
      </div>
    </div>
  );
};

export default CarouselSlider;
