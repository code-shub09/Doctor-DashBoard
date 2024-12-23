import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import DoctorProvider from "./store/contextX.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DoctorProvider>

    
      <App></App>
    </DoctorProvider>
  </StrictMode>
);
