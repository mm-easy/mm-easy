import React, { Suspense } from 'react';
import CommunityMain from './CommunityMain';

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <Suspense>
        <CommunityMain />
      </Suspense>
    </div>
  );
};

export default Page;