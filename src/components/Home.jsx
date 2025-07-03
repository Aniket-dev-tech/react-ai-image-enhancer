// ✅ Home.jsx (Cleaned Up Version: Enhance + Colorize)
import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { useState } from "react";
import { enhancedImageAPI } from "../utils/enhanceImageApi";
import { colorizeImageAPI } from "../utils/colorizeImageApi";
import toast from "react-hot-toast";

const Home = () => {
  const [mode, setMode] = useState("enhance"); // enhance | colorize
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setloading] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const UploadImageHandler = async (file) => {
    setUploadImage(URL.createObjectURL(file));
    setloading(true);
    try {
      const apiFunc = mode === "enhance" ? enhancedImageAPI : colorizeImageAPI;
      const result = await apiFunc(file);
      setEnhancedImage(result);
      setHistory((prev) => [result.image, ...prev]);
      toast.success(
        mode === "enhance"
          ? "Image enhanced successfully!"
          : "Image colorized successfully!"
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      {/* Toggle Mode Buttons */}
      <div className="flex gap-4 justify-center mb-6">
        {['enhance', 'colorize'].map((m) => (
          <button
            key={m}
            className={`px-4 py-2 rounded-lg transition font-semibold ${
              mode === m
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
            }`}
            onClick={() => setMode(m)}
          >
            {m === "enhance" ? "Enhance" : "Colorize"}
          </button>
        ))}
      </div>

      <ImageUpload UploadImageHandler={UploadImageHandler} />
      <ImagePreview
        loading={loading}
        uploaded={uploadImage}
        enhanced={enhancedImage?.image}
        showDownload={!!enhancedImage}
      />

      {/* History Section */}
      {history.length > 0 && (
        <div className="mt-10 w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            {mode === "enhance" ? "Enhancement" : "Colorization"} History
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {history.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`History ${idx}`}
                onClick={() => setSelectedImage(img)}
                className="rounded-lg shadow-sm object-cover h-32 w-full hover:scale-105 transition-transform duration-200 cursor-pointer"
              />
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Preview"
              className="rounded-lg w-full max-h-[80vh] object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
