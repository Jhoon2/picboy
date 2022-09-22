import React, { useState, useEffect } from 'react';
import ListCategories from '../elem/ListCategories';
import AllNew from './ComAll/AllNew';
import AllLike from './ComAll/AllLike';
import AllComm from './ComAll/AllComm';
import AllView from '../components/ComAll/AllView';

const CompAll = () => {
  const [tap, setTap] = useState(0);

  function All({ tap }) {
    return [<AllNew />, <AllLike />, <AllComm />, <AllView />][tap];
  }

  return (
    <>
      <ListCategories setTap={setTap} />
      <All tap={tap} />
    </>
  );
};

export default CompAll;
