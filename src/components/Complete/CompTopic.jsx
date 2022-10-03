import React, { useState } from 'react';
import TopicNew from './ComTopic/TopicNew';
import TopicLike from './ComTopic/TopicLike';
import TopicComm from './ComTopic/TopicComm';
import TopicView from './ComTopic/TopicView';
import ListCategories from '../../elem/ListCategories';

const CompTopic = () => {
  const [tap, setTap] = useState(0);

  function Topic({ tap }) {
    return [<TopicNew />, <TopicLike />, <TopicComm />, <TopicView />][tap];
  }

  return (
    <>
      <ListCategories setTap={setTap} />
      <Topic tap={tap} />
    </>
  );
};

export default CompTopic;
