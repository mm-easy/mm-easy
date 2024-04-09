// CommunityPage.tsx
'use client';

import CategorySelector from '../(components)/CategorySelector';
import CommunityForm from '../(components)/CommunityForm';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getFilterPosts, getPosts } from '@/api/posts';
import { BlueButton } from '@/components/common/FormButtons';

import type { Post } from '@/types/posts';

const CommunityPage = () => {
  const [post, setPost] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const params = useSearchParams();
  const category = params.get('category');

  useEffect(() => {
    const postNow = async () => {
      let data;
      try {
        if (category === '전체' || category === null) {
          data = await getPosts();
        } else {
          data = await getFilterPosts(category);
        }
        setCurrentPage(1);
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

  const navigateToPostPage = () => {
    router.push('/community-post');
  };

  const indexOfLastItem = currentPage * pageRange;
  const indexOfFirstItem = indexOfLastItem - pageRange;
  const currentItems = post.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <article className="flex">
      <div className="">
        <div className="">
          <CategorySelector />
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
