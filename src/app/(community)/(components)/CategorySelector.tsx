import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

  useEffect(() => {
    setSelectedCategory(categoryNow);
  }, [categoryNow]);

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
            <button className="text-2xl w-full text-left">{category}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategorySelector;
