import { CloudUpload } from "lucide-react";

const ImageUpload = ({ UploadImageHandler }) => {
  const ShowImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      UploadImageHandler(file);
    }
  };

  return (
    <div className="relative w-full max-w-2xl p-[2px] rounded-xl overflow-hidden bg-gradient-to-br from-blue-200 to-blue-400 dark:from-[#1e1e2f] dark:to-[#2d2d49] shadow-xl">
      <div className="bg-white/50 dark:bg-white/10 backdrop-blur-xl rounded-xl p-6">
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-6 cursor-pointer transition-all hover:border-blue-500"
        >
          <CloudUpload className="w-12 h-12 mb-2 text-blue-500 dark:text-blue-300" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Click or drag to upload your image
          </p>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={ShowImageHandler}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
