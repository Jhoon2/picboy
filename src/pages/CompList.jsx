import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Grid from '../styles/Grid';
import CompAll from '../components/CompAll';
import CompTopic from '../components/CompTopic';
import CompFree from '../components/CompFree';
import CompleteBanner from '../elem/CompleteBanner';
import TopScroll from '../elem/TopScroll';

function ListComp({ proTap }) {
  return [<CompAll />, <CompTopic />, <CompFree />][proTap];
}

const CompList = () => {
  const [proTap, setProTap] = useState(0);

  return (
    <ListContainer>
      <Header />
      <TopScroll />
      <CompleteBanner setProTap={setProTap} />
      <ListBox>
        <Grid width="1200px" margin="0 auto">
          <ListComp proTap={proTap} />
        </Grid>
      </ListBox>
    </ListContainer>
  );
};

export default CompList;

const ListContainer = styled.div`
  width: 100%;
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

  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  transition: 0.4s ease;
  &.hide {
    transform: translateY(-250px);
  }
`;

const SelectBox = styled.div`
  min-width: 1180px;
  height: 50px;
  padding-left: 10px;
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

const ListBox = styled.div`
  max-width: 1200px;
  margin: auto;
`;

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
