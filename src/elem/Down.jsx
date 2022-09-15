import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Down = (props) => {
    const [Animation, setAnimation] = useState(false);
    const [repeat, setRepeat] = useState(null);
    useEffect(() => {
        if (props.select) {
            clearTimeout(repeat);
            setRepeat(null);
            setAnimation(true);
        } else {
            setRepeat(
                setTimeout(() => {
                    setAnimation(false);
                }, 400)
            );
        }
    }, [props.select]);
    return (
        <SelectList
            className={`components-dropdown ${props.select ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'
                }`}
        >
            {Animation && props.children}
        </SelectList>
    );
};

export default Down;

const SelectList = styled.div`
  position: absolute;
  cursor: pointer;
  ul {
    width: 240px;
    min-height: 100px;
    background: white;
    border: 3px solid black;
    padding: 20px;
  }
`;