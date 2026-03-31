import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./custom-theme.scss";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <main className="container py-3">
            <App />
        </main>
    </StrictMode>,
);
