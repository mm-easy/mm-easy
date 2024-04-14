// CommunityPage.tsx
'use client';

import CommunityMain from '../(components)/CommunityMain';
import { Suspense } from 'react';

const CommunityPage = () => {
  return (
    <div>
      <Suspense>
        <CommunityMain />
      </Suspense>
    </div>
  );
};

export default CommunityPage;
