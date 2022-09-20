import React, { useState } from 'react';
import styled from 'styled-components';
import NewBef from '../images/listCategory/ListNewBef.svg';
import NewAft from '../images/listCategory/ListNewAft.svg';
import LikeBef from '../images/listCategory/ListHeartBef.svg';
import CommBef from '../images/listCategory/ListCommBef.svg';

const ListCategories = (props) => {
  const [select, setSelect] = useState(false);

  return (
    <SelectContainer>
      <SelectBox>
        <Select>
          <div onClick={() => setSelect(!select)}>
            {select ? '닫기' : '카테고리'}
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
          <SelectList>
            <ul>
              <New>
                <Title
                  onClick={() => {
                    props.setTap(0);
                  }}
                >
                  <Newimg img={NewBef} />
                  최신순
                </Title>
              </New>
              <HR />
              <Like>
                <Title
                  onClick={() => {
                    props.setTap(1);
                  }}
                >
                  <Likeimg img={LikeBef} />
                  좋아요
                </Title>
              </Like>
              <HR />
              <Comm>
                <Title
                  onClick={() => {
                    props.setTap(2);
                  }}
                >
                  <Commimg img={CommBef} />
                  댓글 많은 순
                </Title>
              </Comm>
            </ul>
          </SelectList>
        )}
      </SelectListBox>
    </SelectContainer>
  );
};

export default ListCategories;

const SelectContainer = styled.div`
  max-width: 1200px;
  height: 30px;
  position: relative;
  ${({ theme }) => theme.flexSet('row', 'flex-end', 'flex-start')};
`;

const HR = styled.hr`
  width: 110px;
  border: 0;
  height: 1px;
  background: #ccc;
`;

const SelectBox = styled.div`
  position: absolute;
`;

const Select = styled.button`
  margin-left: -130px;
  position: absolute;
  background: none;
  font-family: 'NotoBold';
  font-weight: 400;
  font-size: 16px;
  line-height: 180%;
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
  top: 40px;
  right: 60px;
  z-index: 1;
`;

const SelectList = styled.div`
  position: absolute;
  cursor: pointer;
  ul {
    width: 145px;
    min-height: 154px;
    background: white;
    border: 3px solid black;
    padding: 20px;
  }
`;

const New = styled.li`
  ${({ theme }) => theme.flexSet('column', 'flex-start', 'flex-start')}
  font-family: 'NotoBold';
  font-weight: 700;
  font-size: 14px;
  line-height: 180%;
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

const Newimg = styled.div`
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-right: 7px;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.backgroundSet('contain')}
  &:hover {
    background: url(${NewAft});
  }
`;

const Likeimg = styled(Newimg)`
  &:hover {
    background: url(${NewAft});
  }
`;

const Commimg = styled(Newimg)`
  &:hover {
    background: url(${NewAft});
  }
`;
