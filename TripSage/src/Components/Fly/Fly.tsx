import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productsApiSky } from "../../Actions/product";
import QueryParams from "./QueryParams";
import "./fly.scss";
import { FlightData } from "../Search/SearchFly";

function Fly() {
  const [searchProd, setSearchProd] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searchResults, setSearchResults] = useState<FlightData | null>(null);

  const handleOriginChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
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

  // useEffect(() => {
  //   if (searchProd) {
  //     navigate("/fligths");
  //   }
  // }, [searchProd, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const queries = QueryParams();

    for (const query of queries) {
      try {
        // Llamar a la función productsApiSky con los parámetros de consulta
        const response = await productsApiSky(query);
        setSearchResults(response);
        setSearchProd(true);
        console.log("Respuesta de la búsqueda:", response);
      } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
      }
    }
    navigate("/fligths");
  };

  return (
    <div id="container-fly">
      <main className="container__main">
        <div className="container-form-fly">
          <form onSubmit={handleSubmit} className="form-fly">
            <label>
              <p>Desde:</p>
              <select
                name="Trasyectos"
                onChange={handleOriginChange}
                value={origin}
              >
                <option value="Andorra">Andorra</option>
                <option value="Afganistán">Afganistán</option>
                <option value="Argentina">Argentina</option>
                <option value="Australia">Australia</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Brasil">Brasil</option>
                <option value="Canadá">Canadá</option>
                <option value="Chile">Chile</option>
                <option value="Croacia">Croacia</option>
                <option value="Hungría">Hungría</option>
                <option value="Indonesia">Indonesia</option>
              </select>
            </label>
            <br />
            <label>
              <p>A:</p>
              <input
                type="text"
                value={destination}
                onChange={handleDestinationChange}
              />
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
            <button type="submit">Buscar</button>
          </form>
          {searchResults && <Link to="/fligths">Ver resultados</Link>}
        </div>
      </main>
    </div>
  );
}

export default Fly;
