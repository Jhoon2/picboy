import React, { useState } from 'react';
import ListCategories from '../elem/ListCategories';
import AllNew from './ComAll/AllNew';
import AllLike from './ComAll/AllLike';
import AllComm from './ComAll/AllComm';

const CompAll = () => {
  const [tap, setTap] = useState(0);

  function All({ tap }) {
    return [<AllNew />, <AllLike />, <AllComm />][tap];
  }

  return (
    <>
      <ListCategories setTap={setTap} />
      <All tap={tap} />
    </>
  );
};

export default CompAll;
