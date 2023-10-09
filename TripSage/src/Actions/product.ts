import { IQuery } from "../../server/src/models/Flight/query";

export const productsApiSky = async (query: IQuery) => {
  try {
    const search = await fetch("http://localhost:5000/api/flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    }).then((response: any) => {
      console.log("el query es: ", query);
      console.log("response en productsApiSky es : ", response);
      const data = response.data;
      return data;
    });
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
      console.log("el session token en skyscannerApiSearch es: ", sessionToken);
      console.log("response en skyscannerApiSearch es : ", response);
      const data = response.data;
      return data;
    });
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
    throw error;
  }
};
