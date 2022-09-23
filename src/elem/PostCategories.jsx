import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import '../elem/Down.css';
import Down from '../elem/Down';
import bubble1 from '../images/bubble1.png';
import right from '../images/right.png';
import UseGetUser from '../hooks/UseGetUser';
import { useMyContext } from '../shared/ContextApi';

import AnyModal from '../elem/AnyModal';

const Categories = () => {
  const navigate = useNavigate();
  const myContext = useMyContext();

  const logonUser = UseGetUser();
  // console.log(logonUser && logonUser)
  const [select, setSelect] = useState(false);

  const moveTopic = () => {
    setSelect(false);
    if (!logonUser) return myContext.btnClickOn();
    navigate('/post-topic');
  };
  const moveFree = () => {
    setSelect(false);
    if (!logonUser) return myContext.btnClickOn();
    navigate('/post-free');
  };

  //모달창 닫기
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
      {myContext.btnOpen ? (
        <ErrorBox onClick={() => myContext.btnClickOff()}>
          <AnyModal title="회원정보" content="로그인 후 가능합니다" />
        </ErrorBox>
      ) : null}
      <SelectBox>
        <DrawingBox onClick={() => setSelect(!select)}>
          <Select>
            <div>DRAWING</div>
          </Select>
        </DrawingBox>
      </SelectBox>
      <SelectListBox>
        <Down select={select}>
          <DownUl>
            <Topic onClick={moveTopic}>
              <Title>
                <TopicBubble />
                TOPIC
                <Right left={'150px'} />
              </Title>
              <Desc>
                제시어를 설정해 유저들과 그림을
                <br />
                그릴 수 있어요!
              </Desc>
            </Topic>
            <HR />
            <Free onClick={moveFree}>
              <Title>
                <TopicBubble />
                Free
                <Right left={'162px'} />
              </Title>
              <Desc>
                제시어 없이 유저들과 그림을
                <br />
                그릴 수 있어요!
              </Desc>
            </Free>
          </DownUl>
        </Down>
      </SelectListBox>
    </div>
  );
};

export default Categories;

const ErrorBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const Label = css`
  width: 100px;
  max-width: 110px;
  position: absolute;
  top: 50%;
  z-index: 10;
`;

const HR = styled.hr`
  width: 273px;
  margin-top: 20px;
  border: 0;
  height: 1px;
  background: #ccc;
`;

const Checkbox = css`
  position: absolute;
  opacity: 0;
`;

const SelectBox = styled.div`
  display: flex;
`;

const DrawingBox = styled.div`
  width: 140px;
  height: 40px;
  margin-left: -120px;
  text-align: center;
  border: 1px #a3a3a3 solid;
  cursor: pointer;
  &:hover {
    background: white;
  }
`;

const Select = styled.button`
  margin-top: 10px;
  margin-left: auto;
  position: relative;
  background: none;
  font-family: 'PopLight';
  font-size: 12px;
  color: #a3a3a3;
  &:hover {
  }
  div {
    label {
      ${Label}
    }
    input {
      ${Checkbox}
    }
  }
`;

const SelectListBox = styled.div`
  width: 120px;
  position: relative;
  top: 10px;
  right: 170px;
  z-index: 1;
`;

const DownUl = styled.ul`
    width: 280px;
    min-height: 100px; 
    background: white;
    border: 3px solid black;
    padding: 20px;
`

const Topic = styled.li`
  ${({ theme }) => theme.flexSet('column', 'flex-start', 'flex-start')}
  font-family: 'NotoBold';
  margin-left: 20px;
  font-size: 16px;
  color: #a3a3a3;
  &:hover {
    color: black;
  }
`;
const Free = styled(Topic)``;

const Desc = styled.span`
  padding-top: 10px;
  font-family: 'NotoLight';
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

const Title = styled.div`
  font-family: 'NotoBold';
  font-weight: 700;
  font-size: 16px;
  line-height: 180%;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'flex-start')}
`;

const TopicBubble = styled.div`
  width: 20px;
  height: 20px;
  margin-top: 7px;
  margin-right: 5px;
  background: url(${bubble1});
  ${({ theme }) => theme.backgroundSet('contain')}
`;

const Right = styled.div`
  width: 13px;
  height: 13px;
  margin-top: 4px;
  margin-left: ${(props) => props.left};
  background: url(${right});
  ${({ theme }) => theme.backgroundSet('contain')}
`;
