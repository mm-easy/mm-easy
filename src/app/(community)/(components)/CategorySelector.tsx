import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFilterPosts } from '@/api/posts';

const CategorySelector = ({ categoryNow }: { categoryNow: string | null }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');
  const [postNum, setPostNum] = useState<Record<string, number>>({});

  const router = useRouter();

  const categoryMenu: Record<string, string> = {
    전체: '전체',
    질문: '질문',
    잡담: '잡담',
    공부: '공부',
    일기: '일기'
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    router.push(`/community-list?category=${categoryMenu[category]}`);
  };

  useEffect(() => {
    setSelectedCategory(categoryNow);
  }, [categoryNow]);

  useEffect(() => {
    const fetchPostNumbers = async () => {
      const nums: Record<string, number> = {};
      for (const category of Object.keys(categoryMenu)) {
        const categoryPosts = await getFilterPosts(categoryMenu[category]);
        nums[category] = categoryPosts.length;
      }
      setPostNum(nums);
    };
    fetchPostNumbers();
  }, []);

  return (
    <nav className="w-40 text-pointColor1 font-bold">
      <ul>
        {Object.keys(categoryMenu).map((category) => (
          <li
            key={category}
            className={`p-5 pl-6 border-b border-solid border-pointColor1 cursor-pointer ${
              selectedCategory === category || categoryNow === category ? 'bg-pointColor1 text-white' : 'bg-white'
            }`}
            onClick={() => handleSelectCategory(category)}
          >
            <button className="w-full text-left">
              {category}
              {category === '전체' ? '' : postNum[category] !== undefined ? `(${postNum[category]})` : ''}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategorySelector;
