import React, { useState } from 'react';
import TopicNew from '../components/ComTopic/TopicNew';
import TopicLike from '../components/ComTopic/TopicLike';
import TopicComm from '../components/ComTopic/TopicComm';
import TopicView from '../components/ComTopic/TopicView';
import ListCategories from '../elem/ListCategories';

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
