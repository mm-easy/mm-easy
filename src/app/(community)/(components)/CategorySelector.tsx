'use client';

import { CategorySelectorProps } from '@/types/posts';
import React from 'react';

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory }) => {
  const categoryMenu = {
    전체: '',
    질문: '질문',
    잡담: '잡담',
    공부: '공부',
    일기: '일기'
  };

  const handleSelectCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    onSelectCategory(categoryMenu[e.currentTarget.textContent as keyof typeof categoryMenu]);
  };

  return (
    <ul className="flex">
      {Object.keys(categoryMenu).map((category) => (
        <li key={category} className="w-20">
          <button onClick={handleSelectCategory}>{category}</button>
        </li>
      ))}
    </ul>
  );
};

export default CategorySelector;
