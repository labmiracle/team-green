export const users = async (query: any) => {
  const result = await fetch("http://localhost:5173/user" + query, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return result.json();
};
