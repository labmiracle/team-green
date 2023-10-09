import { IQuery } from "../../server/src/models/Flight/query";

export const productsApiSky = async (query: IQuery) => {
  try {
    const response = await fetch("http://localhost:3000/api/flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error("La solicitud no fue exitosa");
    }

    const data = await response.json();

    console.log("el query es: ", query);
    console.log("data en productsApiSky es : ", data);

    return data;
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
    throw error;
  }
};

export const skyscannerApiSearch = async (
  sessionToken: string
): Promise<any> => {
  try {
    const result = await fetch(
      `http://localhost:3000/api/flights/search/${sessionToken}`,
      {
        method: "POST",
      }
    ).then((response: any) => {
      console.log(result);
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
