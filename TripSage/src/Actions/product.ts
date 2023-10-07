export const productsApiSky = async (query: any) => {
  try {
    const result = await fetch("http://localhost:5173/api/flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query), // Convierte el objeto query en una cadena JSON
    });

    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }

    return result.json();
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
    throw error;
  }
};
