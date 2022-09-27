import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import UseGetUser from '../hooks/UseGetUser';
import { getCookieToken } from '../shared/Cookie';
import { __getNoti } from '../redux/modules/Noti';
import { __readNoti } from '../redux/modules/Noti';
import { __readAllnoti } from '../redux/modules/Noti';
import Down from '../elem/Down';
import '../elem/Down.css';
import notifi from '../images/main/notifi.svg';
import complete from '../images/main/complete.svg';
import { headerPB, pop1PB } from '../global/sound';

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getNotis } = useSelector((state) => state.getNotis);
  const { notis } = useSelector((state) => state.notis);
  const [select, setSelect] = useState(false);
  const useGet = UseGetUser();
  const usernames = useGet && useGet.data?.data.username;
  const read = notis.data;
  const getList = getNotis.data;

  useEffect(() => {
    dispatch(__getNoti());
  }, []);

  useEffect(() => {
    dispatch(__readNoti());
  }, [dispatch]);

  useEffect(() => {
    dispatch(__readAllnoti());
  }, [dispatch]);

  const myToken = getCookieToken();
  const config = {
    Authorization: myToken,
  };
  const baseURL = process.env.REACT_APP_API_KEY;

  let stompClient = Stomp.over(function () {
    return new SockJS(`${baseURL}/socket/`);
  });

  const stompConnect = () => {
    try {
      stompClient.connect(config, () => {
        stompClient.subscribe(`/sub/${usernames}`, (data) => {
          const returnMessage = JSON.parse(data.body);
        });
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    stompConnect();
    return () => {
      Disconnect();
    };
  }, [usernames]);

  const Disconnect = () => {
    stompClient.disconnect(() => {
      stompClient.unsubscribe('sub-0');
    }, config);
  };

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

  const displayedAt = (paramTime) => {
    const parseTime = Date.parse(paramTime);
    const date = new Date(parseTime);
    const returnDate =
      date.getFullYear() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes();
    return returnDate;
  };

  const moveOtherCom = (id) => {
    window.location.href = `/user-profile/${id}`;
  };

  return (
    <div ref={node}>
      <NotifiImg
        onClick={() => {
          setSelect(!select);
          dispatch(__readAllnoti());
          dispatch(__readNoti());
          headerPB.play();
        }}
      >
        {read === false ? <CountBox onClick={() => {}} /> : null}
      </NotifiImg>

      <NotiBox>
        <Down select={select}>
          <NotiUl>
            <Text>
              <Title>알림({getList?.length}+)</Title>
            </Text>
            {getList?.length <= 0 ? (
              <>
                <HR />
                <Nonoti>
                  <span>새로운 알림이 없습니다.</span>
                </Nonoti>
              </>
            ) : (
                getList?.map((item, index) => (
                  <div key={uuidv4()}>
                    <HR />
                  <DescBox
                      onClick={() => {
                        console.log(item.postId)
                      window.location.href = (`/complete-detail/${item.postId}`);
                      pop1PB.play();
                    }}
                  >
                    <Comimg />
                    {item.topic === null ? (
                      <DescTitle>FREE</DescTitle>
                    ) : (
                      <DescTitle>{item.topic}</DescTitle>
                    )}
                    <Desc>
                      작성하신 게시물이 완성되었습니다.
                      <br />
                      지금 바로 확인하러 가보세요.
                    </Desc>
                    <Days> {displayedAt(item.createAt)}</Days>
                  </DescBox>
                </div>
              ))
            )}
          </NotiUl>
        </Down>
      </NotiBox>
    </div>
  );
};

export default Notification;

const HR = styled.hr`
  width: 250px;
  margin-top: 10px;
  border: 0;
  height: 1px;
  background: #ccc;
`;

const NotifiImg = styled.button`
  width: 30px;
  height: 30px;
  margin-left: 30px;
  margin-top: 5px;
  position: relative;
  background: url(${notifi});
  cursor: pointer;
  ${({ theme }) => theme.backgroundSet('contain')};
`;

const CountBox = styled.div`
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  position: absolute;
  top: 10%;
  right: 5%;
`;

const NotiBox = styled.div`
  width: 50px;
  position: relative;
  top: 10px;
  right: 10px;
`;

const NotiUl = styled.ul`
  height: 210px;
  border: 3px solid black;
  margin: auto;
  background: white;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
    background: #e6e6e6;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
    background-clip: padding-box;
  }
`;

const Text = styled.li`
  height: 50px;
  ${({ theme }) => theme.flexSet('column', ' center', ' center')};
`;

const Title = styled.span`
  padding-top: 10px;
  font-family: 'NotoLight';
  color: ${(props) => props.theme.basic};
  font-weight: ${(props) => props.theme.BodyBD};
  font-size: 18px;
  line-height: ${(props) => props.theme.Body};
  color: black;
`;

const Nonoti = styled.div`
  width: 120px;
  height: 60px;
  margin: auto;
  padding-top: 60px;
  ${({ theme }) => theme.flexSet('column', ' center', ' center')}
  background: white;
  span {
    font-family: 'NotoBold';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 180%;
    letter-spacing: -0.02em;
    color: #a3a3a3;
    &:hover {
      color: black;
    }
  }
`;

const DescBox = styled(Text)`
  width: 260px;
  height: 150px;
  ${({ theme }) => theme.flexSet('column', ' flex-start', ' flex-start')};
  padding: 10px 20px 10px 20px;
`;

const Comimg = styled.div`
  width: 80px;
  height: 20px;
  background: url(${complete});
  ${({ theme }) => theme.backgroundSet('cover')}
`;

const DescTitle = styled.div`
  padding-top: 10px;
  cursor: pointer;
  font-family: 'NotoBold';
  font-size: 16px;
  font-weight: 700;
  line-height: 180%;
  color: #000000;

  ${({ theme }) => theme.flexSet('row', 'flex-start', 'flex-start')};
`;

const Desc = styled.span`
  cursor: pointer;
  font-family: 'NotoRight';
  font-weight: 400;
  font-size: 12px;
  line-height: 180%;
  color: #a3a3a3;
  &:hover {
    color: #000000;
  }
`;

const Days = styled.span`
  margin-left: 135px;
  padding-top: 5px;
  font-family: 'NotoRight';
  font-weight: 400;
  font-size: 10px;
  line-height: 180%;
  color: #a3a3a3;
`;
