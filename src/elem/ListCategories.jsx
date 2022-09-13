import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Fade from 'react-reveal/Fade';
import bubble1 from '../images/bubble1.png';

const ListCategories = () => {
    const navigate = useNavigate();
    const [select, setSelect] = useState(false);
    return (
        <>
            <SelectBox>
                <Select>
                    <div onClick={() => setSelect(!select)}>
                        {select ? 'Close' : 'CATEGORY'}
                        <SelectImg
                            select={select}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAYUlEQVR4Ae2UQQ5AEQxE5yhz/0s5yv8WXSAStLOiL2kiTF83AJLkKlirWBFiaOLPSjqEjbwMayIIJ8LZnky+cxaWn2Tcck/W13DSsx309C4D0SGqu83B1Q2QPBz0X0ryAj9fvT8BBg0rqgAAAABJRU5ErkJggg=="
                            alt=""
                        />
                    </div>
                </Select>
            </SelectBox>
            <SelectListBox>
                {select && (
                    <Fade bottom>
                        <SelectList>
                            <ul>
                                <New>
                                    <Title>
                                        <TopicBubble />
                                        최신순
                                    </Title>
                                </New>
                                <HR />
                                <Like>
                                    <Title>
                                        <TopicBubble />
                                        좋아요
                                    </Title>
                                </Like>
                                <HR />
                                <Comm>
                                    <Title>
                                        <TopicBubble />
                                        댓글 많은 순
                                    </Title>
                                </Comm>
                            </ul>
                        </SelectList>
                    </Fade>
                )}
            </SelectListBox>
        </>
    );
};

export default ListCategories;

const Label = css`
  width: 100px;
  max-width: 110px;
  position: absolute;
  top: 50%;
  z-index: 10;
`;

const HR = styled.hr`
  width: 110px;
  border: 0;
  height: 1px;
  background: #ccc;
`;

const Checkbox = css`
  position: absolute;
  opacity: 0;
`;

const SelectBox = styled.div`
  position: relative;
  left: 801px;
`;

const Select = styled.button`
  margin-left: auto;
  position: relative;
  background: none;
  font-family: 'NotoBold';
  line-height: 30px;
  font-size: 13px;
  div {
    ::after {
      background: none repeat scroll 0 0 transparent;
      background: #2e3248;
      bottom: 0;
      content: '';
      display: block;
      height: 3px;
      left: 50%;
      position: absolute;
      transition: width 0.3s ease 0s, left 0.3s ease 0s;
      width: 0;
    }
    :hover::after {
      left: 2px;
      width: 100%;
    }
  }
`;

const SelectImg = styled.img`
  position: absolute;
  top: 50%;
  left: 80px;
  width: 12px;
  height: 12px;
  margin-top: -5px;
  display: block;
  transform: ${({ select }) => (select ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

const SelectListBox = styled.div`
  width: 120px;
  position: relative;
  top: 30px;
  left: 690px;
  z-index: 1;
`;

const SelectList = styled.div`
  position: absolute;
  cursor: pointer;
  ul {
    width: 160px;
    min-height: 100px;
    background: white;
    border: 3px solid black;
    padding: 20px;
  }
`;

const New = styled.li`
  ${({ theme }) => theme.flexSet('column', 'flex-start', 'flex-start')}
  font-family: 'NotoBold';
  font-size: 16px;
  color: #a3a3a3;
  &:hover {
    color: black;
  }
`;
const Like = styled(New)``;
const Comm = styled(New)``;

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