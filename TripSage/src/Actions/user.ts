export const users = async (query: any) => {
  const result = await fetch(
    "http://localhost:5000/api/users/register" + query,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return result.json();
};
