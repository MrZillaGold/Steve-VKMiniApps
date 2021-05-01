import { useEffect, useState } from "react";

import { useOnline } from "../hooks";

export function Offline({ children, onChange = () => {} }) {

    const [isFirstRun, setFirstRun] = useState(true);
    const isOnline = useOnline();

    useEffect(() => {
        if (isOnline && !isFirstRun) {
            onChange();
        } else {
            setFirstRun(false);
        }
    }, [isOnline]);

    return (
        !isOnline && children
    );
}
