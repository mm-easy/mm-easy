import React, { Suspense } from 'react';
import CommunityMain from './CommunityMain';

type Props = {};

const Page = (props: Props) => {
  return (
    <div className='bg-white h-[84vh] border-l-2 border-solid border-pointColor1'>
      <Suspense>
        <CommunityMain />
      </Suspense>
    </div>
  );
};

export default Page;