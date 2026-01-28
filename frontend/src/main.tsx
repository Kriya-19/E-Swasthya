// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";
// import "leaflet/dist/leaflet.css";
// import "./lib/leafleticon";



// createRoot(document.getElementById("root")!).render(<App />);










import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "./lib/leafleticon";
import { LanguageProvider } from "./context/LanguageContext";



// createRoot(document.getElementById("root")!).render(<App />);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
