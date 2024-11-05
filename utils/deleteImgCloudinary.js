import axios from 'axios';

const deleteImgCloudinary = async (publicId) => {
  try {
    const response = await axios.delete('/api/deleteImageCloudinary', {
      data: { public_id: publicId },
    });
    if (response.status === 200) {
      console.log(response.data.message); // Mensaje de éxito
    }
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response.data.message);
    } else {
      console.error("Error al eliminar la imagen:", error.message);
    }
  }
};

export default deleteImgCloudinary