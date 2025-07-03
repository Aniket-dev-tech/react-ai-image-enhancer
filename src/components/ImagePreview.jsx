import Loading from "./Loading";
import { Download } from "lucide-react";

const ImagePreview = ({ uploaded, enhanced, loading }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = enhanced;
    link.download = "enhanced-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
      {/* Original Image */}
      <div className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.01] bg-white dark:bg-[#1e1e2f]">
        <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
          Original Image
        </h2>
        {uploaded ? (
          <img
            src={uploaded}
            alt="Original"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-80 bg-gray-200 text-gray-600 dark:bg-[#2a2a3d] dark:text-gray-300">
            No Image Selected
          </div>
        )}
      </div>

      {/* Enhanced Image */}
      <div className="rounded-xl overflow-hidden shadow-lg flex flex-col transition-transform hover:scale-[1.01] bg-white dark:bg-[#1e1e2f]">
        <h2 className="text-xl font-semibold text-center bg-blue-800 text-white py-2">
          Enhanced Image
        </h2>
        <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-[#2a2a3d]">
          {loading ? (
            <Loading />
          ) : enhanced ? (
            <img
              src={enhanced}
              alt="Enhanced"
              className="w-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-80 text-gray-600 dark:text-gray-300">
              No Enhanced Image
            </div>
          )}
        </div>
        {!loading && enhanced && (
          <div className="p-4 text-center bg-gray-50 dark:bg-[#12121c]">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Download className="w-5 h-5" />
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
