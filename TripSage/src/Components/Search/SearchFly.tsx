import { useEffect, useState } from "react";
import "./SearchFly.scss";
import "./loader.scss";
import ProductosJson from "./mock.json";
import { Link } from "react-router-dom";

interface PricingOption {
  items: {
    price: {
      amount: string;
      unit: string;
    };
    agentId: string;
    deepLink: string;
    fares: {
      segmentId: string;
      bookingCode: string;
      fareBasisCode: string;
    }[];
  }[];
  transferType: string;
  id: string;
  pricingOptionFare: null;
}

interface Itinerary {
  pricingOptions: PricingOption[];
  legIds: string[];
  sustainabilityData: null;
}

interface Leg {
  originPlaceId: string;
  destinationPlaceId: string;
  departureDateTime: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
  arrivalDateTime: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
  durationInMinutes: number;
  stopCount: number;
  marketingCarrierIds: string[];
  operatingCarrierIds: string[];
  segmentIds: string[];
}

interface FlightData {
  itineraries: { [key: string]: Itinerary };
  legs: { [key: string]: Leg };
}

function ProductList() {
  const [showLoader, setShowLoader] = useState(true);
  const [flightData, setFlightData] = useState<FlightData>({
    itineraries: {},
    legs: {},
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = ProductosJson;
        const data = response;
        console.log("Datos del mock", data);
        setFlightData(data.content.results);
        setShowLoader(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="product-list">
      {showLoader && (
        <div id="container__products">
          <h2>Cargando datos...</h2>
          <span className="loader"></span>
        </div>
      )}
      {!showLoader && (
        <>
          <h1>Detalles del Vuelo</h1>
          {Object.keys(flightData?.itineraries || {})
            .slice(0, 10)
            .map((itineraryKey) => {
              const itinerary = flightData.itineraries[itineraryKey];
              const legIds = itinerary.legIds;
              const deepLink = itinerary.pricingOptions[0]?.items[0]?.deepLink;
              return (
                <div className="list__container">
                  <div key={itineraryKey} className="list">
                    <ul className="list__ul">
                      <h2 className="list__title">
                        Itinerary ID: {itineraryKey}
                      </h2>
                      {legIds.map((legId) => {
                        const leg = flightData.legs[legId];
                        return (
                          <li key={legId} className="list__li">
                            <p className="li__text">
                              Origen: {leg.originPlaceId}
                            </p>
                            <p className="li__text">
                              Destino: {leg.destinationPlaceId}
                            </p>
                            <p className="li__text">
                              Duración del vuelo: {leg.durationInMinutes} -
                              minutos
                            </p>
                            <Link
                              to={deepLink}
                              target="_blank"
                              className="list__buttom"
                            >
                              Comprar
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}

export default ProductList;
