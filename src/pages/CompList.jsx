import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '../styles/Grid';
import CompAll from '../components/CompAll';
import CompTopic from '../components/CompTopic';
import CompFree from '../components/CompFree';
import CompleteBanner from '../elem/CompleteBanner';
import TopScroll from '../global/TopScroll';
import footer from '../images/Com/footer.svg';

const CompList = () => {
  const [proTap, setProTap] = useState(0);

  function ListComp({ proTap }) {
    return [<CompAll />, <CompTopic />, <CompFree />][proTap];
  }

  return (
    <ListContainer>
      <TopScroll />
      <CompleteBanner setProTap={setProTap} />
      <Grid width="1200px" margin="0 auto">
        <ListComp proTap={proTap} />
      </Grid>
      <Footers />
    </ListContainer>
  );
};

export default CompList;

const ListContainer = styled.div``;

const Footers = styled.div`
  width: 100%;
  height: 320px;
  background: url(${footer});
  ${({ theme }) => theme.backgroundSet('cover')}
`;
