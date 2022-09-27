import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import basicimage from '../images/mypage/basicImg.png';
import personBef from '../images/listCategory/PersonBef.svg';
import personAft from '../images/listCategory/PersonAft.svg';

const Listprofile = ({ item }) => {
  const navigate = useNavigate();
  const [select, setSelect] = useState(false);
  const userList = item?.participantResponseDtoList;
  const id = item.id;

  const node = useRef();
  useEffect(() => {
    const clickOutside = (e) => {
      if (select && node.current && !node.current.contains(e.target)) {
        setSelect(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [select]);

  return (
    <div ref={node}>
      {item?.profileImg === null ? (
        <>
          <Profile onClick={() => setSelect(!select)} img={basicimage} />
        </>
      ) : (
        <>
          <Profile onClick={() => setSelect(!select)} img={item?.profileImg} />
        </>
      )}

      <SelectListBox>
        {select && (
          <SelectList>
            <ul>
              <Title>최초 작성자</Title>
              <UserBox
                key={uuidv4()}
                onClick={() => {
                  navigate(`/user-profile/${item.username}`);
                }}
              >
                {item.profileImg === null ? (
                  <Userimage img={basicimage} />
                ) : (
                  <Userimage img={item.profileImg} />
                )}
                <Username>{item.nickname}</Username>
                <UserGo />
              </UserBox>
              <HR />
              <Title>참여자</Title>
              <>
                {userList?.map((item, index) => (
                  <UserBox
                    key={uuidv4()}
                    onClick={() => {
                      navigate(`/user-profile/${item.username}`);
                    }}
                  >
                    {item.profileImg === null ? (
                      <Userimage img={basicimage} />
                    ) : (
                      <Userimage img={item.profileImg} />
                    )}
                    <Username>{item.nickname}</Username>
                    <UserGo />
                  </UserBox>
                ))}
              </>
            </ul>
          </SelectList>
        )}
      </SelectListBox>
    </div>
  );
};

export default Listprofile;

const HR = styled.hr`
  border: none;
`;

const Profile = styled.button`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  border-radius: 50%;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.backgroundSet('cover')};
`;

const SelectList = styled.div`
  position: absolute;
  background: none;
  ul {
    ${({ theme }) => theme.flexSet('column', 'flex-start', 'flex-start')};
    width: 240px;
    height: 161px;
    padding: 10px;
    position: absolute;
    bottom: 1%;
    right: 12%;
    z-index: 1;
    margin: auto;
    background: white;
    border: 2px solid black;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px;
      background: #e6e6e6;
    }

    &::-webkit-scrollbar-thumb {
      background-color: black;
      background-clip: padding-box;
    }
  }
`;

const SelectListBox = styled.div`
  position: relative;
`;

const Title = styled.span`
  font-family: 'NotoBold';
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
  letter-spacing: -0.02em;
  color: #a3a3a3;
  font-size: 12px;
`;

const UserBox = styled.div`
  width: 210px;
  height: 50px;
  margin-top: 15px;
  position: relative;
  cursor: pointer;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')};
`;

const Userimage = styled.div`
  width: 26px;
  height: 26px;
  margin-left: 5px;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.backgroundSet('cover')};
`;

const Username = styled.div`
  height: 25px;
  margin-left: 10px;
  font-family: 'NotoBold';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 180%;

  letter-spacing: -0.02em;
`;

const UserGo = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 88%;
  background: url(${personBef});
  ${({ theme }) => theme.backgroundSet('cover')};
  &:hover {
    background: url(${personAft});
  }
`;
