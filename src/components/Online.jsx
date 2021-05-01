import { useEffect } from "react";

import { useOnline } from "../hooks";

export function Online({ children, onChange = () => {} }) {
    const isOnline = useOnline();

    useEffect(() => {
        if (!isOnline) {
            onChange();
        }
    }, [isOnline]);

    return (
        isOnline && children
    );
}
