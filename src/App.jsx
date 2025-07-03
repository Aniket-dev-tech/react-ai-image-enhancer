import { useEffect, useState } from "react";
import Home from "./components/Home";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex flex-col items-center justify-center py-10 px-4">
        <div className="flex justify-between items-center w-full max-w-5xl mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-1">
              AI Image Enhancer
            </h1>
            <p className="text-sm text-gray-300 dark:text-gray-300">
              Upload an image and enhance it with AI in seconds!
            </p>
          </div>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className={`px-4 py-2 rounded-full transition ${
              darkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <Home />

        <footer className="mt-10 text-sm text-gray-500">
          © 2025 NightCoders
        </footer>
      </div>
    </div>
  );
};

export default App;
