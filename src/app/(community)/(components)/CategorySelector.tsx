import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFilterPosts } from '@/api/posts';
import { useQuery } from '@tanstack/react-query';

const CategorySelector = ({ categoryNow }: { categoryNow: string | null }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');

  const router = useRouter();

  const categoryMenu: Record<string, string> = {
    전체: '전체',
    질문: '질문',
    잡담: '잡담',
    공부: '공부',
    일기: '일기'
  };

  const { data: postNum = {} } = useQuery<Record<string, number>>({
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
    },
    queryKey: ['categoryPostNums']
  });

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    router.push(`/community-list?category=${categoryMenu[category]}`);
  };

  return (
    <nav className="text-pointColor1 font-bold">
      <ul>
        {Object.keys(categoryMenu).map((category) => (
          <li
            key={category}
            className={`p-8 pl-12 border-b-2 border-solid border-pointColor1 cursor-pointer ${
              selectedCategory === category || categoryNow === category ? 'bg-pointColor1 text-white' : 'bg-white'
            }`}
            onClick={() => handleSelectCategory(category)}
          >
            <button className="text-[calc(2vh+5px)] w-full text-left flex">
              {category}
              <div className='pl-2'>{category === '전체' ? '' : postNum[category] !== undefined ? `(${postNum[category]})` : ''}</div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategorySelector;
