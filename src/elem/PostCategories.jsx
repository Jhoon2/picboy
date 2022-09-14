import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import '../elem/Down.css';
import Down from '../elem/Down';
import bubble1 from '../images/bubble1.png';
import right from '../images/right.png';

const Categories = (props) => {
    const navigate = useNavigate();
    const [select, setSelect] = useState(false);
    return (
        <>
            <SelectBox>
                <Select>
                    <div onClick={() => setSelect(!select)}>Drawing</div>
                </Select>
            </SelectBox>
            <SelectListBox>
                {/* {select && ( */}
                <Down select={select}>
                    <ul>
                        <Topic
                            onClick={() => {
                                navigate('/list');
                            }}
                        >
                            <Title>
                                <TopicBubble />
                                TOPIC
                                <Right left={'110px'} />
                            </Title>
                            <Desc>
                                제시어를 설정해 유저들과 그림을
                                <br />
                                그릴 수 있어요!
                            </Desc>
                        </Topic>
                        <HR />
                        <Free
                            onClick={() => {
                                navigate('/list');
                            }}
                        >
                            <Title>
                                <TopicBubble />
                                Free
                                <Right left={'122px'} />
                            </Title>
                            <Desc>
                                제시어 없이 유저들과 그림을
                                <br />
                                그릴 수 있어요!
                            </Desc>
                        </Free>
                    </ul>
                </Down>
                {/* // )} */}
            </SelectListBox>
        </>
    );
};

export default Categories;

const Label = css`
  width: 100px;
  max-width: 110px;
  position: absolute;
  top: 50%;
  z-index: 10;
`;

const HR = styled.hr`
  width: 190px;
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

const Select = styled.button`
  margin-left: auto;
  position: relative;
  background: none;
  font-family: 'PopLight';
  font-size: 13px;
  color: white;
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
  top: 30px;
  right: 60px;
  z-index: 1;
`;

const SelectList = styled.div`
  position: absolute;
  cursor: pointer;
  ul {
    width: 240px;
    min-height: 100px;
    background: white;
    border: 3px solid black;
    padding: 20px;
    transform: ${({ select }) => (select ? 'rotate(0deg)' : 'rotate(180deg)')};
  }
`;

const Topic = styled.li`
  ${({ theme }) => theme.flexSet('column', 'flex-start', 'flex-start')}
  font-family: 'NotoBold';
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
  font-size: 13px;
`;

const Title = styled.div`
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'flex-start')}
`;

const TopicBubble = styled.div`
  width: 20px;
  height: 20px;
  margin-top: 2px;
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