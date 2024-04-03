'use client';

import CommunityForm from '@/app/(community)/(components)/CommunityForm';
import CommunityMenu from '../(components)/CommunityMenu';
import { useState } from 'react';

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  return (
    <article>
      <h1 className="text-xl">커뮤니티</h1>
      <div className="flex">
        <CommunityMenu setSelectedCategory={setSelectedCategory} />
        <CommunityForm selectedCategory={selectedCategory} />
      </div>
      <div>
        <button>
          <a href="/community-post">작성하기</a>
        </button>
      </div>
    </article>
  );
};

export default CommunityPage;
