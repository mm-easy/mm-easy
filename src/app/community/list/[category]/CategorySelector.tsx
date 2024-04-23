'use client';

import useMultilingual from '@/utils/useMultilingual';
import { useRouter } from 'next/navigation';
import { getFilterPosts } from '@/api/posts';
import { useQuery } from '@tanstack/react-query';

const CategorySelector = ({ categoryNow }: { categoryNow: string | null }) => {
  const router = useRouter();
  const m = useMultilingual('communityList');

  const categoryMenu: Record<string, string> = {
    [m('COMMUNITY_CATEGORY_ALL')]: '전체',
    [m('COMMUNITY_CATEGORY_NOTICE')]: '공지',
    [m('COMMUNITY_CATEGORY_QUESTION')]: '질문',
    [m('COMMUNITY_CATEGORY_CHAT')]: '잡담',
    [m('COMMUNITY_CATEGORY_STUDY')]: '공부',
    [m('COMMUNITY_CATEGORY_DIARY')]: '일기',
    [m('COMMUNITY_CATEGORY_EVENT')]: '이벤트'
  };

  const { data: postNum = {} } = useQuery<Record<string, number>>({
    queryKey: ['categoryPostNums'],
    queryFn: async () => {
      try {
        const nums: Record<string, number> = {};
        for (const category of Object.keys(categoryMenu)) {
          const categoryPosts = await getFilterPosts(categoryMenu[category]);
          nums[category] = categoryPosts.length;
        }
        return nums;
      } catch (error) {
        return {};
      }
    }
  });

  const handleSelectCategory = (category: string) => {
    router.push(`/community/list/${categoryMenu[category]}`);
  };

  return (
    <nav className="text-pointColor1 font-bold sm:font-normal sm:mx-4">
      <ul className='sm:flex sm:w-full'>
        {Object.keys(categoryMenu).map((category) => (
          <li
            key={category}
            className={`sm:border-b-0 sm:flex-1 sm:h-[4vh] sm:pl-0 h-[8vh] flex items-center pl-12 border-b-2 border-solid border-pointColor1 cursor-pointer ${
              categoryNow === categoryMenu[category] ? 'sm:font-bold sm:bg-white sm:text-pointColor1 sm:border-b-8 sm:border-solid sm:border-pointColor1 bg-pointColor1 text-white' : 'bg-white'
            }`}
            onClick={() => handleSelectCategory(category)}
          >
            <button className="sm:justify-center text-lg w-full text-left flex">
              {category}
              <div className="pl-2 sm:hidden">
                {category === m('COMMUNITY_CATEGORY_ALL')
                  ? ''
                  : postNum[category] !== undefined
                    ? `(${postNum[category]})`
                    : ''}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategorySelector;
