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

  // useEffect(() => {
  //   // Verifica si tienes resultados reales (después de hacer la llamada a la API)
  //   if (searchResults) {
  //     setFlightData(searchResults);
  //     setShowLoader(false);
  //   }
  // }, [searchResults]);

  //  useEffect(() => {
  const fetchData = async () => {
    try {
      // Llamar a la función productsApiSky para obtener datos reales
      //const queries = QueryParams();
      //queries.map((query) => productsApiSky(query))
      const response = await skyscannerApiSearch(sessionToken.sessionToken);

      // Obtener los datos de la última respuesta de la API (puedes ajustar esto según tus necesidades)
      //const data = responses[responses.length - 1];

      console.log("Datos de la API:", response);
      //const response = ProductosJson;
      const data = JSON.parse(response);
      console.log("Datos del mock", data);
      setFlightData(data.content.results);
      setShowLoader(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //  });
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
            Object.keys(flightData.content.results.itineraries)
              .slice(0, 10)
              .map((itineraryKey) => {
                const itinerary =
                  flightData.content.results.itineraries[itineraryKey];
                const legIds = itinerary.legIds;
                const deepLink =
                  itinerary.pricingOptions[0]?.items[0]?.deepLink;
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
              })}
        </>
      )}
    </div>
  );
}

export default ProductList;
