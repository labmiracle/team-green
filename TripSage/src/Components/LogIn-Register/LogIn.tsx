import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";

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
              value={password}
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
