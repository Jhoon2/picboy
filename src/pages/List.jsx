import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '../styles/Grid';
import ProgressAll from '../components/ProgressAll';
import ProgressFree from '../components/ProgressFree';
import ProgressTopic from '../components/ProgressTopic';
import ProgressBanner from '../elem/ProgressBanner';
import TopScroll from '../elem/TopScroll';

const List = () => {
  const [proTap, setProTap] = useState(0);

  function ListComp({ proTap }) {
    return [<ProgressAll />, <ProgressTopic />, <ProgressFree />][proTap];
  }
  return (
    <ListContainer>
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

const ListBox = styled.div``;
