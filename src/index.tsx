import { App } from "./App";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import dark from "react-utils/theme/dark";
import { UserWrapper } from "react-utils/Wrappers/UserWrapper";
import ThemeWrapper from "react-utils/Wrappers/ThemeWrapper";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <ThemeWrapper theme={dark}>
            <UserWrapper>
                <App />
            </UserWrapper>
        </ThemeWrapper>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
