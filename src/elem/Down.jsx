import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Down = (props) => {
  const [Animation, setAnimation] = useState(false);
  const [repeat, setRepeat] = useState(null);
  const outsideRef = useRef();
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

  const handleClickOutside = ({ target }) => {
    if (props.select && !outsideRef.current.contains(target))
      props.setSelect(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={outsideRef}>
      <SelectList
        className={`components-dropdown ${
          props.select ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'
        }`}
      >
        {Animation && props.children}
      </SelectList>
    </div>
  );
};

export default Down;

const SelectList = styled.div`
  position: absolute;
  right: -75px;
  cursor: pointer;

`;
