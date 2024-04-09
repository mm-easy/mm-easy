import React, { useState } from 'react';
import { CategorySelectorProps } from '@/types/posts';

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const categoryMenu: Record<string, string> = {
    전체: '',
    질문: '질문',
    잡담: '잡담',
    공부: '공부',
    일기: '일기'
  };

  const handleSelectCategory = (category: string) => {
    onSelectCategory(categoryMenu[category]);
    setSelectedCategory(category);
  };

  return (
    <nav className="w-40 text-pointColor1 font-bold">
      <ul>
        {Object.keys(categoryMenu).map((category) => (
          <li
            key={category}
            className={`p-5 pl-6 border-x border-b border-solid border-pointColor1 cursor-pointer ${
              selectedCategory === category ? 'bg-pointColor1 text-white' : 'bg-white'
            }`}
            onClick={() => handleSelectCategory(category)}
          >
            <button className="w-full text-left">{category}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategorySelector;
