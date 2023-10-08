import { IQuery } from "../../server/src/models/Flight/query";

export const productsApiSky = async (query: IQuery) => {
  try {
    const result = await fetch("http://localhost:5000/api/flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    console.log("el query es: ", query);
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }

    return result.json();
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
    throw error;
  }
};

export const skyscannerApiSearch = async (sessionToken: string) => {
  try {
    const result = await fetch(
      `http://localhost:5000/api/flights/search/${sessionToken}`,
      {
        method: "POST",
      }
    ).then((response: any) => {
      console.log("Datos de busqueda: ", response.data);
      return JSON.parse(response.data);
    });
    return result;
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
    throw error;
  }
};
