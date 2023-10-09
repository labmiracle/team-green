import { useEffect, useState } from "react";
import "./SearchFly.scss";
import "./loader.scss";
import ProductosJson from "./mock.json";
import { skyscannerApiSearch } from "../../Actions/product";
import { Link } from "react-router-dom";
import { IFlight } from "../../../server/src/models/Flight/Flight";

export function ProductList(sessionToken: { sessionToken: string }) {
  const [showLoader, setShowLoader] = useState(true);
  const [flightData, setFlightData] = useState<IFlight>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await skyscannerApiSearch(sessionToken.sessionToken);
        const data = JSON.parse(response);
        setFlightData(data.content.results);
        setShowLoader(false);
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
          {flightData?.content?.results?.itineraries &&
            Object.keys(flightData.content.results.itineraries).map(
              (itineraryKey) => {
                const itinerary =
                  flightData.content.results.itineraries[itineraryKey];
                const legIds = itinerary.legIds;
                const deepLink =
                  itinerary.pricingOptions[0]?.items[0]?.deepLink;
                console.log("Itinerary ID:", itineraryKey);
                console.log("Leg IDs:", legIds);
                console.log("Deep Link:", deepLink);

                return (
                  <div className="list__container">
                    <div key={itineraryKey} className="list">
                      <ul className="list__ul">
                        <h2 className="list__title">
                          Itinerary ID: {itineraryKey}
                        </h2>
                        {legIds.map((legId) => {
                          const leg = flightData?.content.results.legs[legId];
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
              }
            )}
        </>
      )}
    </div>
  );
}
export default ProductList;
