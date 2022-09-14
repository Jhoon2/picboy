import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Grid from '../styles/Grid';
import ProgressAll from '../components/ProgressAll';
import ProgressFree from '../components/ProgressFree';
import ProgressTopic from '../components/ProgressTopic';
import ProgressBanner from '../elem/ProgressBanner';
import TopScroll from '../elem/TopScroll';

// const onClick = () => {
//   navigate(`/detail/${todo.id}`);
// };

const List = () => {

  const [proTap, setProTap] = useState(0);

  function ListComp({ proTap }) {
    return [<ProgressAll />, <ProgressTopic />, <ProgressFree />][proTap];
  }
  return (
    <ListContainer>
      <Header />
      <TopScroll />
      <ProgressBanner setProTap={setProTap} />
      <ListBox>
        <Grid width="1200px" margin="0 auto">
          <ListComp proTap={proTap} />
        </Grid>
      </ListBox>
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  width: 100%;
  position: relative;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 300px;
  ${({ theme }) => theme.flexSet('column', 'space-between', 'center')}
  text-align: center;
  background: #f4f4f4;
  border: 0.5px solid #a3a3a3;
  span {
    margin-top: 120px;
    font-family: 'SilkLight';
    font-size: 80px;
    line-height: 102px;
    font-weight: 400;
  }
`;

const SelectBox = styled.div`
  min-width: 1180px;
  height: 50px;
  ${({ theme }) => theme.flexSet('row', 'first-start', 'center')}
`;

const SelectButton = styled.button`
  width: 80px;
  height: 80px;
  background: none;

  font-family: 'NotoBold';
  font-size: 13px;
  line-height: 30px;
`;

const ListBox = styled.div``;

const Underline = styled.p`
  color: #2e3248;
  display: inline-block;
  position: relative;
  text-decoration: none;
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
    left: 0;
    width: 100%;
  }
`;
