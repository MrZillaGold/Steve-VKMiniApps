import React, { useEffect, useRef, useState } from "react";

import "./HeightAnimation.css";

export function HeightAnimation({ children, className, ...rest }) {

    const ref = useRef();
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            const height = [...ref.current.children].reduce((acc, { offsetHeight }) => acc += offsetHeight, 0);

            setHeight(height);
        }, 1);
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
