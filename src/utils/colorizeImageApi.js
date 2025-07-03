import axios from "axios";

const API_KEY = import.meta.env.VITE_PICWISH_API_KEY;

const BASE_URL = "https://techhk.aoscdn.com/";

export const colorizeImageAPI = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image_file", file);

    const { data } = await axios.post(
      `${BASE_URL}/api/tasks/visual/colorization`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": API_KEY,
        },
      }
    );

    const taskId = data?.data?.task_id;
    if (!taskId) throw new Error("No task ID returned");

    const result = await pollForColorizedImage(taskId);
    return result;
  } catch (error) {
    console.error("Colorization error:", error.message);
    throw error;
  }
};

const pollForColorizedImage = async (taskId, retries = 0) => {
  const MAX_RETRIES = 20;
  const result = await fetchColorizedImage(taskId);

  if (result.state === 4) {
    if (retries >= MAX_RETRIES) {
      throw new Error("Max retries reached.");
    }
    await new Promise((res) => setTimeout(res, 2000));
    return pollForColorizedImage(taskId, retries + 1);
  }

  return result;
};

const fetchColorizedImage = async (taskId) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/tasks/visual/colorization/${taskId}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );

  if (!data?.data) throw new Error("Failed to fetch image data");
  return data.data;
};
