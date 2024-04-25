import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './App.css'
import "./styles.css";
import Login from "./views/Login.tsx";

createRoot(document.getElementById("main-root") as HTMLElement, <App/>)
createRoot(document.getElementById("login-root") as HTMLElement, <Login/>)

function createRoot(rootDiv: HTMLElement, element: React.JSX.Element) {
    if (!rootDiv) return
    ReactDOM.createRoot(rootDiv).render(
        <React.StrictMode>
            {element}
        </React.StrictMode>,
    );
}

