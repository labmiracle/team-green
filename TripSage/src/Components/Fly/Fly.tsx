import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productsApiSky } from "../../Actions/product";
import QueryParams from "./QueryParams";
import "./fly.scss";
import { ProductList } from "../Search/SearchFly";
import { IQuery } from "../../../server/src/models/Flight/query";
import { IFlight } from "../../../server/src/models/Flight/Flight";
import geo from "../Search/data/geo.json";

function Fly() {
  const [isSearching, setIsSearching] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searchResults, setSearchResults] = useState<IFlight | null>(null);
  const [sessionTokenP, setSessionTokenP] = useState<string>("");
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
    console.log(event.target.value);
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

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSearching) {
      return;
    }

    const query: IQuery = {
      query: {
        market: "AR",
        locale: "es-ES",
        currency: "ARS",
        queryLegs: [
          {
            originPlaceId: {
              //  iata: origin,
              iata: "LHR",
            },
            destinationPlaceId: {
              //  iata: destination,
              iata: "EDI",
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
      const responseData = await response.json();
      setSessionTokenP(responseData.sessionToken);
      setSearchResults(responseData);
      console.log("Respuesta de la búsqueda:", response);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    } finally {
      setIsSearching(false);
      navigate("/fligths");
    }
  };

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
          {sessionTokenP && <ProductList sessionToken={sessionTokenP} />}
          {searchResults && <Link to="/fligths">Ver resultados</Link>}
        </div>
      </main>
    </div>
  );
}

export default Fly;
