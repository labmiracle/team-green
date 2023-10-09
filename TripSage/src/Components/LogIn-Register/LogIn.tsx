import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { login } from "../../Actions/user";

const LogIn = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordHash, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "" || passwordHash === "") {
      setError("Por favor, complete todos los campos.");
      return; // Salir de la función si faltan campos
    } else {
      try {
        const response = await login({email, passwordHash});
        console.log("dadsafasdfasd",response)
        if (response) {
          alert ("Inicio sesión correctamente")
          navigate ("/") 
        } else {
          alert ("Usuario Inexistente")
        }

      } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
      } 
    }
  };

  const [error, setError] = useState("");

  return (
    <div>
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
              value={passwordHash}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin} className="buttonR1">
            Iniciar sesión
          </button>
          <div className="createAcount">
            <p>¿No tienes una cuenta?</p>
            <Link
              to="/register"
              onClick={() => setIsRegistering(true)}
              className="buttonR2"
            >
              Registrarse
            </Link>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
