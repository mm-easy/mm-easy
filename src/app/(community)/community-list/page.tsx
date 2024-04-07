// CommunityPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { getPosts } from '@/api/posts';
import CategorySelector from '../(components)/CategorySelector';
import CommunityForm from '../(components)/CommunityForm';

const CommunityPage = () => {
  const [totalList, setTotalList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageRange = 2; // 페이지당 보여줄 게시물 수
  const btnRange = 5; // 보여질 페이지 버튼의 개수
  const totalNum = filteredList.length; // 총 데이터 수

  const fetchData = async () => {
    try {
      const data = await getPosts();
      setTotalList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredList(
      selectedCategory === '' ? totalList : totalList.filter((item) => item.category === selectedCategory)
    );
  }, [selectedCategory, totalList]);

  const indexOfLastItem = currentPage * pageRange;
  const indexOfFirstItem = indexOfLastItem - pageRange;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <article>
      <CategorySelector onSelectCategory={setSelectedCategory} />
      <div className="flex">
        <div className="flex justify-center pt-64">
          <button className="">
            <a href="/community-post">작성하기</a>
          </button>
        </div>
        <div className="flex justify-center w-full">
          <CommunityForm
            currentItems={currentItems}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalNum={totalNum}
            pageRange={pageRange}
            btnRange={btnRange}
          />
        </div>
      </div>
    </article>
  );
};

export default CommunityPage;
