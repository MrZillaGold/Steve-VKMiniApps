import { useEffect, useState } from "react";

import { getOnlineStatus } from "../utils";

export function useOnline() {
    const [online, setOnline] = useState(getOnlineStatus());

    const goOnline = () => setOnline(true);

    const goOffline = () => setOnline(false);

    useEffect(() => {
        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);

        return () => {
            window.removeEventListener("online", goOnline);
            window.removeEventListener("offline", goOffline);
        };
    }, []);

    return online;
}
