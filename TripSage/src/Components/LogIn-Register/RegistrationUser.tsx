import { useState } from "react";
import "./registration.scss";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type RegistrationUserProps = {
  onCancel: () => void;
  onRegister: (userData: UserData) => void;
};

const RegistrationUser: React.FC<RegistrationUserProps> = ({
  onCancel,
  onRegister,
}) => {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (userData.password !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
      return;
    }

    if (userData.password.length < 6) {
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
    // Make the POST request to the registration API endpoint
    fetch("api/users/registration", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Handle the successful registration response here
        console.log("User registration successful:", data);
        // You can perform any additional actions or navigation as needed
      })
      .catch((error) => {
        // Handle errors
        console.error("Error registering user:", error);
        // Display an error message to the user or take appropriate action
      });
    onRegister(userData);
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
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
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
