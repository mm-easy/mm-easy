// CommunityPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { getFilterPosts, getPosts } from '@/api/posts';
import CategorySelector from '../(components)/CategorySelector';
import CommunityForm from '../(components)/CommunityForm';
import { Post } from '@/types/posts';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlueButton } from '@/components/common/FormButtons';
import { supabase } from '@/utils/supabase/supabase';
import CommunityMenu from '../(components)/CommunityMenu';

const CommunityPage = () => {
  // const [totalList, setTotalList] = useState<Post[]>([]);

  // const [selectedCategory, setSelectedCategory] = useState('');

  // const [filteredList, setFilteredList] = useState<Post[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const [post, setPost] = useState<Post[]>([]);
  const params = useSearchParams();
  const category = params.get('category');
  // console.log('params', params);

  useEffect(() => {
    const postNow = async () => {
      let data;
      try {
        if (category === '전체') {
          data = await getPosts();
        } else {
          data = await getFilterPosts(category);
        }
        setPost(data);
      } catch (error) {
        console.error('포스트를 가져오는 중 오류 발생:', error);
        return [];
      }
    };
    postNow();
  }, [category]);

  const pageRange = 2; // 페이지당 보여줄 게시물 수
  const btnRange = 5; // 보여질 페이지 버튼의 개수
  const totalNum = post.length; // 총 데이터 수

  // const fetchData = async () => {
  //   try {
  //     const data = await getPosts();
  //     setTotalList(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   setFilteredList(
  //     selectedCategory === '' ? totalList : totalList.filter((item) => item.category === selectedCategory)
  //   );
  //   setCurrentPage(1); // 카테고리 변경 시 페이지를 1로 재설정
  // }, [selectedCategory, totalList]);

  const navigateToPostPage = () => {
    router.push('/community-post');
  };

  const indexOfLastItem = currentPage * pageRange;
  const indexOfFirstItem = indexOfLastItem - pageRange;
  // const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = post.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <article className="flex">
      <div className="">
        <div className="">
          {/* <CategorySelector onSelectCategory={setSelectedCategory} /> */}
          <CommunityMenu />
        </div>
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
            category={category}
          />
        </div>
      </div>
    </article>
  );
};

export default CommunityPage;
