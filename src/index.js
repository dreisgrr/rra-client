import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ReservationContextProvider } from "./context/ReservationContext";
import { BrowserRouter } from "react-router-dom";
import { SitesContextProvider } from "./context/SitesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SitesContextProvider>
        <ReservationContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ReservationContextProvider>
      </SitesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
