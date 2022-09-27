import React, { useState } from 'react';
import styled from 'styled-components';
import { getCookieToken } from '../shared/Cookie';
import { useMyContext } from '../shared/ContextApi';
import { anyApis } from '../shared/apis';
import likeBef from '../images/Com/likeBef.svg';
import likeAft from '../images/Com/likeAft.svg';

const Like = ({ item }) => {
  const [likeApi, setLikeApi] = useState();
  const [likeCountState, setLikeCountState] = useState();
  const [likes, setLikes] = useState(false);
  const accessToken = getCookieToken();

  const myContext = useMyContext();
  const id = item.id;

  const likeHandler = (e) => {
    if (accessToken === undefined) {
      myContext.setCommetApplyBtn(true);
    } else {
      // setLikeState(!likeState);
      const info = {
        like: 0,
      };
      anyApis
        .liked(id, info)

        .then(function (data) {
          setLikeApi(data && data?.data.data);
          if (likeApi && likeApi === false) {
            setLikeCountState(likeCountState + 1);
          } else if (likeApi && likeApi === true) {
            setLikeCountState(likeCountState - 1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      {likes ? (
        <Likebutton
          src={likeAft}
          onClick={(e) => {
            setLikes(!likes);
            e.stopPropagation();
            likeHandler();
          }}
          alt=""
        />
      ) : (
        <Likebutton
          src={likeBef}
          onClick={(e) => {
            setLikes(!likes);
            e.stopPropagation();
            likeHandler();
          }}
          alt=""
        />
      )}
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
