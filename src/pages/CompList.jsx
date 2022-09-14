import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '../styles/Grid';
import CompAll from '../components/CompAll';
import CompTopic from '../components/CompTopic';
import CompFree from '../components/CompFree';
import CompleteBanner from '../elem/CompleteBanner';
import ListCategories from '../elem/ListCategories';
import TopScroll from '../elem/TopScroll';

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
    </ListContainer>
  );
};

export default CompList;

const ListContainer = styled.div``;
