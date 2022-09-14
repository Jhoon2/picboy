import React, { useState } from 'react';
import TopicNew from '../components/ComTopic/TopicNew';
import TopicLike from '../components/ComTopic/TopicLike';
import TopicComm from '../components/ComTopic/TopicComm';
import ListCategories from '../elem/ListCategories';

const CompTopic = () => {
  const [tap, setTap] = useState(0);

  function Like({ tap }) {
    return [<TopicNew />, <TopicLike />, <TopicComm />][tap];
  }

  return (
    <>
      <ListCategories setTap={setTap} />
      <Like tap={tap} />
    </>
  );
};

export default CompTopic;
