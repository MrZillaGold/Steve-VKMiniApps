import React, { useEffect, useRef, useState } from "react";

import "./HeightAnimation.css";

export function HeightAnimation({ children, className, ...rest }) {

    const ref = useRef();
    const [mount, setMount] = useState(true);
    const [height, setHeight] = useState(0);


    useEffect(() => {
        const refChildren = ref.current.children;

        setTimeout(() => {
            const height = [...refChildren].reduce((acc, { offsetHeight }) => acc += offsetHeight, 0);

            if (mount) {
                setHeight(height);
            }
        });
    }, [children]);
    useEffect(() => () => setMount(false), []);

    return (
        <div ref={ref}
             className={`HeightAnimation ${className}`}
             style={{ height }}
             {...rest}
        >
            {
                children
            }
        </div>
    )
}
