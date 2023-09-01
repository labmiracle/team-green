import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import RegistrationUser, { UserData } from "./RegistrationUser";

const LogIn = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "" || password === "") {
      setError("Por favor, complete todos los campos.");
    } else {
      alert("Inicio sesion correctamente");
      navigate("/");
    }
  };

  const handleRegister = (userData: UserData) => {
    console.log("Nuevo usuario registrado:", userData);
    setIsRegistering(false);
  };

  const [error, setError] = useState("");

  return (
    <div>
      {isRegistering ? (
        <RegistrationUser
          onCancel={() => setIsRegistering(false)}
          onRegister={handleRegister}
        />
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
            <button onClick={handleLogin} className="buttonR1">
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
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;
