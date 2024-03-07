export const getData = async (url) => {
  try {
    const response = await fetch(
      `https://bodero-e-commerce.vercel.app/api/${url}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};
