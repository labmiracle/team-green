import React, { useState } from "react";
import "./login.scss";
import RegistrationUser from "./RegistrationUser"; // Asegúrate de importar correctamente

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para iniciar sesión
    console.log("Iniciar sesión:", email, password);
  };

  const handleRegister = (userData: any) => {
    // Lógica para registrar al nuevo usuario
    console.log("Nuevo usuario registrado:", userData);
  };

  const handleCancel = () => {
    setIsRegistering(false);
  };

  return (
    <form onSubmit={isRegistering ? undefined : handleLogin}>
      {isRegistering ? (
        <RegistrationUser onCancel={handleCancel} onRegister={handleRegister} />
      ) : (
        <div id="container-logIn">
          <div className="container-infoL">
            <div className="infoL">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="infoL">
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="buttonR1">
              Iniciar sesión
            </button>
            <div className="createAcount">
              <p>¿No tienes una cuenta?</p>
              <button
                onClick={() => setIsRegistering(true)}
                className="buttonR2"
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default LogIn;
