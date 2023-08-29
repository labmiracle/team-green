import { useState } from "react";
import "./hotel.scss";

function Hotel() {
  const [destination, setDestination] = useState("");
  const [chekIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestination(event.target.value);
  };

  const handleCheckInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckIn(event.target.value);
  };

  const handleCheckOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOut(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí puedes realizar acciones adicionales con los datos del formulario
    // como enviar una solicitud HTTP o guardarlos en el estado global.
    console.log({
      destination: destination,
      checkIn: chekIn,
      checkOut: checkOut,
    });
  };
  return (
    <div id="container-hotel">
      <main>
        <div className="container-form-hotel">
          <form onSubmit={handleSubmit} className="form-hotel">
            <label>
              <p>Destino:</p>
              <input
                type="text"
                value={destination}
                onChange={handleDestinationChange}
              />
            </label>
            <br />
            <label>
              <p>Check in:</p>
              <input
                type="date"
                value={chekIn}
                onChange={handleCheckInChange}
              />
            </label>
            <br />
            <label>
              <p>Check out:</p>
              <input
                type="date"
                value={checkOut}
                onChange={handleCheckOutChange}
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

export default Hotel;
