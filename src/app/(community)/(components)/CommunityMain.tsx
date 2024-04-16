import CategorySelector from './CategorySelector';
import CommunityForm from './CommunityForm';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { getFilterPosts, getPosts } from '@/api/posts';
import { CancelButton } from '@/components/common/FormButtons';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { isLoggedInAtom } from '@/store/store';
import { supabase } from '@/utils/supabase/supabase';

import type { Post } from '@/types/posts';

const CommunityMain = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [currentPage, setCurrentPage] = useState(1);

  const { getCurrentUserProfile } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const category = params.get('category');

  const {
    data: post = [],
    isLoading,
    isError
  } = useQuery<Post[]>({
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
    },
    queryKey: ['postPage', category]
  });

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

  // 게시글 작성 페이지 이동
  const navigateToPostPage = () => {
    if (!isLoggedIn) {
      toast.warn('게시물을 작성하려면 로그인 해주세요.');
    } else {
      router.push('/community-post');
    }
  };

  const pageRange = 10; // 페이지당 보여줄 게시물 수
  const btnRange = 5; // 보여질 페이지 버튼의 개수
  const totalNum = post.length; // 총 데이터 수

  const indexOfLastItem = currentPage * pageRange;
  const indexOfFirstItem = indexOfLastItem - pageRange;
  const currentItems = post.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return <div>커뮤니티 불러오기중..</div>;
  }

  if (isError) {
    return <div>커뮤니티 불러오기 오류!</div>;
  }

  return (
    <main className="grid grid-cols-[16%_84%] h-[84vh]">
      <section className="flex flex-col justify-between h-[84vh] bg-bgColor1 border-r-2 border-solid border-pointColor1">
        <CategorySelector categoryNow={category} />
        <div className="flex justify-center w-full pb-4 font-bold">
          <CancelButton text="작성하기" onClick={navigateToPostPage} width="w-44" height="h-16" border="border-2" />
        </div>
      </section>
      <section className="w-full px-24 flex justify-center mt-[calc(8vh-25px)]">
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
    </main>
  );
  
};

export default CommunityMain;
