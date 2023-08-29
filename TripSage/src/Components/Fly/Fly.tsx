import { useState } from "react";
import "./fly.scss";

function Fly() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes realizar acciones adicionales con los datos del formulario
    // como enviar una solicitud HTTP o guardarlos en el estado global.
    console.log({
      origin,
      destination,
      departureDate,
      returnDate,
    });
  };

  return (
    <div id="container-fly">
      <main>
        <div className="container-form-fly">
          <form onSubmit={handleSubmit} className="form-fly">
            <label>
              <p>Desde:</p>
              <input type="text" value={origin} onChange={handleOriginChange} />
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
        </div>
      </main>
    </div>
  );
}

export default Fly;
