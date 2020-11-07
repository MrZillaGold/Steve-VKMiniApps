import { createContext } from "react";

export const schemes = ["bright_light", "space_gray"];

export const SchemeContext = createContext({
    scheme: "bright_light",
    toggleScheme: () => {}
});
