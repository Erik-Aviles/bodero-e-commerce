import axios from "axios";

export const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango de 2xx
      throw new Error(
        `Error al obtener datos: ${error.response.status} ${error.response.statusText} - ${error.response.data}`
      );
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      throw new Error(
        `Error al obtener datos: no se recibió respuesta - ${error.request}`
      );
    } else {
      // Algo pasó al configurar la solicitud que desencadenó un error
      throw new Error(`Error al obtener datos: ${error.message}`);
    }
  }
};
