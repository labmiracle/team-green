import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsApiSky } from "../../Actions/product";
import "./fly.scss";
import { skyscannerApiSearch } from "../../Actions/product";
import "./loader.scss";
import geo from "./data/geo.json";
import { IQuery } from "../../../server/src/models/Flight/query";
import { IFlight } from "../../../server/src/models/Flight/Flight";

function Fly() {
  const [isSearching, setIsSearching] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searchResults, setSearchResults] = useState<IFlight | null>(null);
  const [sessionTokenP, setSessionTokenP] = useState<string>("");
  const [showLoader, setShowLoader] = useState(false);

  const places: PlacesData = geo;

  interface Place {
    entityId: string;
    parentId: string;
    name: string;
    type: string;
    iata: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }

  interface PlacesData {
    status: string;
    places: Record<string, Place>;
  }

  const handleOriginChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDestination(event.target.value);
  };

  const handleDepartureDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartureDate(event.target.value);
  };

  const handleReturnDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReturnDate(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSearching) {
      return;
    }

    setShowLoader(true);

    const query: IQuery = {
      query: {
        market: "AR",
        locale: "es-ES",
        currency: "ARS",
        queryLegs: [
          {
            originPlaceId: {
              iata: origin,
              // iata: "LHR",
            },
            destinationPlaceId: {
              iata: destination,
              // iata: "EDI",
            },
            date: {
              year: parseInt(departureDate.split("-")[0]),
              month: parseInt(departureDate.split("-")[1]),
              day: parseInt(departureDate.split("-")[2]),
            },
          },
        ],
        adults: 1,
        cabinClass: "CABIN_CLASS_ECONOMY",
      },
    };

    try {
      const response = await productsApiSky(query);
      setSessionTokenP(response.sessionToken);
      setSearchResults(response);
      console.log("Respuesta de la búsqueda:", response);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    } finally {
      setIsSearching(false);
      setShowLoader(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await skyscannerApiSearch(sessionTokenP);
        const data = JSON.parse(response);
        setSearchResults(data.content.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (sessionTokenP) {
      fetchData();
    }
  }, [sessionTokenP]);

  return (
    <div id="container-fly">
      <main className="container__main">
        <div className="container-form-fly">
          <form onSubmit={handleSubmit} className="form-fly">
            <label>
              <p>Desde:</p>
              <select
                name="Trayectos"
                onChange={handleOriginChange}
                value={origin}
              >
                <option value="">Seleccionar origen</option>
                {Object.values(places.places).map((place) => (
                  <option key={place.entityId} value={place.iata}>
                    {place.name}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              <p>A:</p>
              <select
                name="text"
                onChange={handleDestinationChange}
                value={destination}
              >
                <option value="">Seleccionar destino</option>
                {Object.values(places.places).map((place) => (
                  <option key={place.entityId} value={place.iata}>
                    {place.name}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              <p>Fecha de salida:</p>
              <input
                type="date"
                value={departureDate}
                onChange={handleDepartureDateChange}
              />
            </label>
            <br />
            <label>
              <p>Fecha de regreso:</p>
              <input
                type="date"
                value={returnDate}
                onChange={handleReturnDateChange}
              />
            </label>
            <br />
            <button type="submit" disabled={isSearching}>
              Buscar
            </button>
          </form>
          {showLoader && <div className="loader"></div>}
          {searchResults && (
            <div className="product-list">
              <h1>Detalles del Vuelo</h1>
              {searchResults?.content?.results?.itineraries &&
                Object.keys(searchResults.content.results.itineraries).map(
                  (itineraryKey) => {
                    const itinerary =
                      searchResults.content.results.itineraries[itineraryKey];
                    const legIds = itinerary.legIds;
                    const deepLink =
                      itinerary.pricingOptions[0]?.items[0]?.deepLink;

                    return (
                      <div className="list__container" key={itineraryKey}>
                        <div className="list">
                          <ul className="list__ul">
                            {legIds.map((legId) => {
                              const leg =
                                searchResults?.content.results.legs[legId];
                              const price =
                                itinerary.pricingOptions[0].price.amount;
                              const priceInNumber = parseFloat(price);
                              const priceInDecimals = priceInNumber / 100;
                              const formattedPrice = priceInDecimals.toFixed(2);

                              return (
                                <li key={legId} className="list__li">
                                  <p className="li__text">
                                    Origen:{" "}
                                    {
                                      searchResults?.content.results.places[
                                        leg.originPlaceId
                                      ].name
                                    }
                                  </p>
                                  <p className="li__text">
                                    Destino:{" "}
                                    {
                                      searchResults?.content.results.places[
                                        leg.destinationPlaceId
                                      ].name
                                    }
                                  </p>
                                  <p className="li__text">
                                    Duración del vuelo: {leg.durationInMinutes}{" "}
                                    minutos
                                  </p>
                                  <p className="li__text">
                                    Precio: ${formattedPrice}
                                  </p>
                                  <Link to={deepLink} target="_blank">
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
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Fly;
