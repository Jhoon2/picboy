import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCookieToken } from '../shared/Cookie';
import { useMyContext } from '../shared/ContextApi';
import { anyApis } from '../shared/apis';
import likeBef from '../images/Com/likeBef.svg';
import likeAft from '../images/Com/likeAft.svg';

const Like = ({ item }) => {
  const [likePlus, setLikePlus] = useState(item.liked && item.liked);
  const [smallLikeBtn, setSmallLikeBtn] = useState(
    item.likeCount && item.likeCount
  );
  const accessToken = getCookieToken();

  useEffect(() => {
    setSmallLikeBtn(item.likeCount && item.likeCount);
  }, [item.likeCount && item.likeCount]);

  const clickLikeBtn = (e) => {
    e.stopPropagation();
    setLikePlus(!likePlus);
    anyApis.liked(item.id, '').then((response) => {
      if (!response.data.data.like) {
        setSmallLikeBtn(smallLikeBtn - 1);
      } else {
        setSmallLikeBtn(smallLikeBtn + 1);
      }
    });
  };

  return (
    <>
      <Likebutton src={likePlus ? likeAft : likeBef} onClick={clickLikeBtn} />
    </>
  );
};

export default Like;

const Likebutton = styled.img`
  right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  position: absolute;
  top: 165px;
  z-index: 999;
  ${({ theme }) => theme.backgroundSet('contain')};
`;
