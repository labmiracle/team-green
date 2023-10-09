import { useState } from "react";
import "./registration.scss";
import { useNavigate } from "react-router-dom";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

type RegistrationUserProps = {
  onCancel: () => void;
  onRegister: (userData: UserData) => void;
};

const RegistrationUser: React.FC<RegistrationUserProps> = ({
  onCancel,
  onRegister,
}) => {
  const handleCancelRegistration = () => {
    onCancel();
    navigate("/logIn");
  };
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    passwordHash: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (userData.passwordHash !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
      return;
    }

    if (userData.passwordHash.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    fetch("http://localhost:3000/api/users/register", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          // Registro exitoso, no hay datos JSON para analizar
          console.log("User registration successful");
          return;
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("User registration successful:", data);
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });

    onRegister(userData);
    navigate("/logIn");
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
              value={userData.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
            />
          </div>
          <div className="infoR">
            <label>Apellido:</label>
            <input
              type="text"
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
            />
          </div>
          <div className="infoR">
            <label>Email:</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="infoR">
            <label>Contraseña:</label>
            <input
              type="password"
              value={userData.passwordHash}
              onChange={(e) =>
                setUserData({ ...userData, passwordHash: e.target.value })
              }
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
            <button onClick={handleCancelRegistration} className="buttonR4">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationUser;
