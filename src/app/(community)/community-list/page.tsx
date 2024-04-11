// CommunityPage.tsx
'use client';

import CategorySelector from '../(components)/CategorySelector';
import CommunityForm from '../(components)/CommunityForm';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getFilterPosts, getPosts } from '@/api/posts';
import { CancelButton } from '@/components/common/FormButtons';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '@/store/store'; 

import type { Post } from '@/types/posts';
import { supabase } from '@/utils/supabase/supabase';

const CommunityPage = () => {
  const { getCurrentUserProfile } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [post, setPost] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const params = useSearchParams();
  const category = params.get('category');

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

  /** 로그인이 되어 있다면 프로필 가져오기 */
  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        const userProfile = await getCurrentUserProfile();
        console.log('로그인한 자의 프로필..', userProfile);
      }
    };

    fetchData();
  }, [isLoggedIn]);
  
  const navigateToPostPage = () => {
    if (!isLoggedIn) {
      toast.warn('게시물을 작성하려면 로그인 해주세요.');
    } else {
      router.push('/community-post');
    }
  };

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

  const pageRange = 10; // 페이지당 보여줄 게시물 수
  const btnRange = 5; // 보여질 페이지 버튼의 개수
  const totalNum = post.length; // 총 데이터 수

  const indexOfLastItem = currentPage * pageRange;
  const indexOfFirstItem = indexOfLastItem - pageRange;
  const currentItems = post.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main className="grid grid-cols-[16%_84%]">
      <section>
        <CategorySelector categoryNow={category} />
        <div className="flex justify-center pt-64 pb-12 text-xl font-bold">
          <CancelButton text="작성하기" onClick={navigateToPostPage} width="w-44" height='h-16' border='border-2' />
        </div>
      </section>
      <section className="flex w-full border-l-2 border-solid  border-pointColor1">
        <div className="flex justify-center w-full py-16 px-48">
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
      </section>
    </main>
  );
};

export default CommunityPage;
