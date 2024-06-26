'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase/supabase';
import { useAtom } from 'jotai';
import { getFilterPosts, getPosts } from '@/api/posts';
import { isLoggedInAtom } from '@/store/store';
import CommunityForm from './CommunityForm';
import LoadingImg from '@/components/common/LoadingImg';

import type { Post } from '@/types/posts';

const CommunityMain = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [currentPage, setCurrentPage] = useState(1);

  const params = useParams<{ category: string }>();
  const category = decodeURIComponent(params.category);

  /** 게시글 가져오기 */
  const { data: post = [], isLoading } = useQuery<Post[]>({
    queryKey: ['postPage', category],
    queryFn: async () => {
      try {
        let nextPosts;
        if (category === '전체' || category === null) {
          nextPosts = await getPosts();
        } else {
          nextPosts = await getFilterPosts(category);
        }
        setCurrentPage(1);
        return nextPosts;
      } catch (error) {
        return [];
      }
    }
  });

  /** 사용자 로그인 인증 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          return;
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);


  const pageRange = 10; // 페이지당 보여줄 게시물 수
  const btnRange = 5; // 보여질 페이지 버튼의 개수
  const totalNum = post.length; // 총 데이터 수

  const indexOfLastItem = currentPage * pageRange;
  const indexOfFirstItem = indexOfLastItem - pageRange;
  const currentItems = post.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return <LoadingImg height="84vh" />;
  }

  return (
    <section className="sm:px-0 sm:min-h-screen sm:mt-0 sm:bg-white w-full px-[5vw] flex justify-center mt-[calc(8vh-25px)]">
      <CommunityForm
        currentItems={currentItems}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalNum={totalNum}
        pageRange={pageRange}
        btnRange={btnRange}
        category={category}
      />
    </section>
  );
};

export default CommunityMain;
