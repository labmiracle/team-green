import { loginUser } from "../../server/src/models/authuser/login"
export const users = async (query: any) => {
  const result = await fetch(
    "http://localhost:3000/api/users/register" + query,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return result.json();
};


export const login = async (user: loginUser) : Promise<boolean> => { 
  try { 
const userLogin = await fetch( 
  "http://localhost:3000/api/auth/login" ,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (userLogin.status === 200) {
//    const data = await userLogin.json();
    return true; // Inicio de sesión exitoso
  } else {
    return false; // Inicio de sesión fallido
  }
  }
  catch (error) {
  console.error("Error al realizar la búsqueda:", error);
  throw error;
}
};
