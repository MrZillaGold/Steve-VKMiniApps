import { createContext, useContext } from "react";

export const schemes = ["bright_light", "space_gray"];

export const AppearanceContext = createContext({
    scheme: "",
    platform: "",
    appPlatform: "",
    toggleScheme: () => {},
    setScheme: () => {},
    setPlatform: () => {}
});

export const useAppearance = () => {
    return useContext(AppearanceContext);
};
