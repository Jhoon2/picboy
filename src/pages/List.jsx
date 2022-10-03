import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '../styles/Grid';
import ProgressAll from '../components/Progress/ProgressAll';
import ProgressFree from '../components/Progress/ProgressFree';
import ProgressTopic from '../components/Progress/ProgressTopic';
import ProgressBanner from '../elem/ProgressBanner';
import TopScroll from '../global/TopScroll';
import footer from '../images/Com/footer.svg';

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
      <Footers />
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  width: 100%;
  position: relative;
`;

const ListBox = styled.div``;

const Footers = styled.div`
  width: 100%;
  height: 320px;
  background: url(${footer});
  ${({ theme }) => theme.backgroundSet('cover')}
`;
