import React, { useState } from 'react';
import FreeNew from './ComFree/FreeNew';
import FreeLike from './ComFree/FreeLike';
import FreeComm from './ComFree/FreeComm';
import FreeView from '../components/ComFree/FreeView';
import ListCategories from '../elem/ListCategories';

const CompFree = () => {
  const [tap, setTap] = useState(0);

  function Free({ tap }) {
    return [<FreeNew />, <FreeLike />, <FreeComm />, <FreeView />][tap];
  }

  return (
    <>
      <ListCategories setTap={setTap} />
      <Free tap={tap} />
    </>
  );
};

export default CompFree;
