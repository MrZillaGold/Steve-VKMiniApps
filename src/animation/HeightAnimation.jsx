import React, { useEffect, useRef, useState } from "react";

import "./HeightAnimation.css";

export function HeightAnimation({ children, className, ...rest }) {

    const ref = useRef();
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const refChildren = ref.current.children;

        setTimeout(() => {
            const height = [...refChildren].reduce((acc, { offsetHeight }) => acc += offsetHeight, 0);

            setHeight(height);
        });
    }, [children]);

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
