import { useState } from "react";
import "./registration.scss";

type RegistrationUserProps = {
  onCancel: () => void;
  onRegister: (userData: any) => void; // Aquí sería preferible tener un tipo específico para userData
};

const RegistrationUser: React.FC<RegistrationUserProps> = ({
  onCancel,
  onRegister,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Realiza aquí la lógica para registrar al nuevo usuario
    if (password === confirmPassword) {
      onRegister({
        firstName,
        lastName,
        email,
        password,
      });
    } else {
      // Manejar caso de contraseñas no coincidentes
    }
  };

  return (
    <div id="container-registro">
      <div className="boxR">
        <h2>Registro</h2>
        <div id="container-infoR">
          <div className="infoR">
            <label>Nombre:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="infoR">
            <label>Apellido:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="infoR">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="infoR">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="infoR">
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="buttonR">
            <button onClick={handleRegister} className="buttonR3">
              Registrarse
            </button>
            <button onClick={onCancel} className="buttonR4">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationUser;
