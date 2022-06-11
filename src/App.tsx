import "./App.css";

import { ImageSizer } from "./ImageSizer/ImageSizer";
import { LandingPage } from "./LandingPage/LandingPage";
import { useState } from "react";

export const App = () => {
    const [isStarted, setIsStarted] = useState(false);

    if (isStarted) {
        <ImageSizer />;
    }

    return <LandingPage onStart={() => setIsStarted(true)} />;
};
