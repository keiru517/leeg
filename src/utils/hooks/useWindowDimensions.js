import { useState, useEffect } from "react";

export default function useWindowDimensions() {
    const hasWindow = typeof window !== "undefined";

    const getWindowDimensions = () => {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    };

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (hasWindow) {
            const handleResize = () => {
                setWindowDimensions(getWindowDimensions());
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [hasWindow]);

    return windowDimensions;
}