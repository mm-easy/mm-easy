'use client';

import CommunityForm from '../(components)/CommunityForm';
import CommunityMenu from '../(components)/CommunityMenu';
import SubHeader from '@/components/common/SubHeader';

import { useState } from 'react';

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  return (
    <article>
      {/* subheader 임시로 제거 */}
      {/* <SubHeader text="커뮤니티" /> */}
      <div className="flex">
        <div>
          <CommunityMenu setSelectedCategory={setSelectedCategory} />
          <div className="flex justify-center pt-64">
            <button className="">
              <a href="/community-post">작성하기</a>
            </button>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <CommunityForm selectedCategory={selectedCategory}  />
        </div>
      </div>
    </article>
  );
};

export default CommunityPage;
