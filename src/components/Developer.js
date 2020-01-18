import React, { useRef, useState, useEffect } from 'react';

const Developer = () => {
    const [hoverRef, isHovered] = useHover();

    // return <div ref={hoverRef}>{isHovered ? '😁' : '☹️'}</div>;

    return (
        <a
            href="https://devsmranjan.github.io"
            rel="noopener noreferrer"
            target="_blank"
            ref={hoverRef}
            style={{
                color: !isHovered ? '#A0A0A0' : '#4caf50',
                textDecoration: 'none',
                marginLeft: '4px'
            }}
        >
            Smruti Ranjan Rana
        </a>
    );
}

const useHover = () => {
    const [value, setValue] = useState(false);

    const ref = useRef(null);

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener('mouseover', handleMouseOver);
                node.addEventListener('mouseout', handleMouseOut);

                return () => {
                    node.removeEventListener('mouseover', handleMouseOver);
                    node.removeEventListener('mouseout', handleMouseOut);
                };
            }
        },
        [] // Recall only if ref changes
    );

    return [ref, value];
}

export default Developer;