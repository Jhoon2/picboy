import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Listarrow from '../images/listCategory/Listarrow.svg';
import NewBef from '../images/listCategory/ListNewBef.svg';
import LikeBef from '../images/listCategory/ListHeartBef.svg';
import CommBef from '../images/listCategory/ListCommBef.svg';
import NewAft from '../images/listCategory/ListNewAft.svg';
import LikeAft from '../images/listCategory/ListHeartAft.svg';
import CommAft from '../images/listCategory/ListCommAft.svg';
import ViewBef from '../images/listCategory/ViewBef.svg';
import ViewAft from '../images/listCategory/ViewAft.svg';

const ListCategories = (props) => {
  const [select, setSelect] = useState(false);

  const node = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (select && node.current && !node.current.contains(e.target)) {
        setSelect(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [select]);

  return (
    <SelectContainer ref={node}>
      <SelectBox>
        <Select>
          <div onClick={() => setSelect(!select)}>
            {select ? '닫기' : '카테고리'}
            <SelectImg select={select} src={Listarrow} alt="" />
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
                  <Newimg img={NewBef}>
                    <Text>최신순</Text>
                  </Newimg>
                </Title>
              </New>
              <HR />
              <Like>
                <Title
                  onClick={() => {
                    props.setTap(1);
                  }}
                >
                  <Likeimg img={LikeBef}>
                    <Text>좋아요</Text>
                  </Likeimg>
                </Title>
              </Like>
              <HR />
              <Comm>
                <Title
                  onClick={() => {
                    props.setTap(2);
                  }}
                >
                  <Commimg img={CommBef}>
                    <Text>댓글순</Text>
                  </Commimg>
                </Title>
              </Comm>
              <HR />
              <View>
                <Title
                  onClick={() => {
                    props.setTap(3);
                  }}
                >
                  <Viewimg img={ViewBef}>
                    <Text>조회순</Text>
                  </Viewimg>
                </Title>
              </View>
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
  transform: ${({ select }) => (select ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const SelectListBox = styled.div`
  width: 120px;
  position: relative;
  top: 40px;
  right: 60px;
  z-index: 2;
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

const New = styled.div`
  ${({ theme }) => theme.flexSet('column', 'flex-start', 'center')}

  color: #a3a3a3;
  &:hover {
    color: black;
  }
`;
const Like = styled(New)``;
const Comm = styled(New)``;
const View = styled(New)``;

const Title = styled.div`
  width: 100px;
  height: 25px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

const Newimg = styled.div`
  width: 20px;
  height: 19px;
  position: relative;
  margin-right: 7px;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.backgroundSet('contain')}
  &:hover {
    background: url(${NewAft});
  }
`;

const Likeimg = styled(Newimg)`
  &:hover {
    background: url(${LikeAft});
  }
`;

const Commimg = styled(Newimg)`
  &:hover {
    background: url(${CommAft});
  }
`;

const Viewimg = styled(Newimg)`
  width: 20px;
  height: 14px;

  &:hover {
    background: url(${ViewAft});
  }
`;

const Text = styled.div`
  width: 50px;
  margin-left: 30px;
  position: absolute;
  bottom: -4px;
  font-family: 'NotoBold';
  font-weight: 700;
  font-size: 14px;
  line-height: 180%;
`;
