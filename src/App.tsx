import { ImageSizer } from "./ImageSizer/ImageSizer";
import { LandingPage } from "./LandingPage/LandingPage";
import { useState } from "react";
import { TTemplate } from "ImageSizer/Const";

export const App = () => {
    const [isStarted, setIsStarted] = useState<TTemplate | undefined | null>(null);

    if (isStarted !== null) {
        return <ImageSizer openLandingPage={() => setIsStarted(null)} initTemplate={isStarted} />;
    }

    return <LandingPage onStart={setIsStarted} />;
};
