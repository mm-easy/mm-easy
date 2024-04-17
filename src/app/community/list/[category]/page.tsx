import React, { Suspense } from 'react';
import CommunityMain from './CommunityMain';

type Props = {};

const Page = (props: Props) => {
  return (
    <div className='h-[84vh]'>
      <Suspense>
        <CommunityMain />
      </Suspense>
    </div>
  );
};

export default Page;