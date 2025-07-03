import axios from "axios";

export const removeBackgroundAPI = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post("http://localhost:5050/remove-bg", formData, {
      responseType: "blob", // expects image back
    });

    const blob = response.data;
    const imageUrl = URL.createObjectURL(blob);

    return { image: imageUrl };
  } catch (error) {
    console.error("Remove BG API Error:", error.message || error);
    alert("Background removal failed. Please try again.");
    throw error;
  }
};
