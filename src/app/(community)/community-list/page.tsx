// CommunityPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { getPosts } from '@/api/posts';
import CategorySelector from '../(components)/CategorySelector';
import CommunityForm from '../(components)/CommunityForm';
import { Post } from '@/types/posts';
import { useRouter } from 'next/navigation';
import { BlueButton } from '@/components/common/FormButtons';
import Menu from '../(components)/Menu';

const CommunityPage = () => {
  const [totalList, setTotalList] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredList, setFilteredList] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

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
    setCurrentPage(1); // 카테고리 변경 시 페이지를 1로 재설정
  }, [selectedCategory, totalList]);

  const navigateToPostPage = () => {
    router.push('/community-post');
  };

  const indexOfLastItem = currentPage * pageRange;
  const indexOfFirstItem = indexOfLastItem - pageRange;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <article className="flex">
      <div className="">
        <div className="">
          <CategorySelector onSelectCategory={setSelectedCategory} />
        </div>
        <Menu />
        <div className="flex justify-center pt-64 pb-12">
          <BlueButton text="작성하기" onClick={navigateToPostPage} width="w-28" />
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex justify-center w-full px-24">
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
