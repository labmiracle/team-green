import CarouselSlider from "../SliderHome/CarouselSlider";
import "./Home.scss"

function Home() {
  return (
    <div id= "container-home" className="container-home">
      <div className="carrousel">
        <CarouselSlider />
      </div>
    </div>
  );
}

export default Home;
