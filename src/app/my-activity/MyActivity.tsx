'use client';

import { getMyActivityPosts } from '@/api/posts';
import { fetchUserQuizzes, getQuiz } from '@/api/quizzes';
import { useAuth } from '@/hooks/useAuth';
import { Post } from '@/types/posts';
import { Quiz } from '@/types/quizzes';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { supabase } from '@/utils/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyActivity = () => {
  const { getCurrentUserProfile } = useAuth();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('quizzes'); // 활성 탭 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          router.replace('/login');
          alert('로그인이 필요한 페이지입니다.');
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  const {
    data: userQuiz,
    isLoading: isQuizLoading,
    isError: isQuizError
  } = useQuery({
    queryFn: async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        if (userProfile && userProfile.email) {
          return await fetchUserQuizzes(userProfile.email);
        }
        return [];
      } catch (error) {
        console.error('퀴즈 불러오기 실패:', error);
        throw error;
      }
    },
    queryKey: ['userQuizzes'],
    enabled: isLoggedIn // 로그인 상태일 때만 쿼리 활성화
  });

  const {
    data: userPost,
    isLoading: isPostLoading,
    isError: isPostError
  } = useQuery({
    queryFn: async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        if (userProfile && userProfile.email) {
          return await getMyActivityPosts(userProfile.id);
        }
        return [];
      } catch (error) {
        console.error('내 글 불러오기 실패:', error);
        throw error;
      }
    },
    queryKey: ['userPosts'],
    enabled: isLoggedIn // 로그인 상태일 때만 쿼리 활성화
  });

  {
    isPostLoading && <div>로딩 중...</div>;
  }
  {
    isPostError && <div>게시글을 불러오는 중 오류가 발생했습니다.</div>;
  }
  {
    isQuizLoading && <div>로딩 중...</div>;
  }
  {
    isQuizError && <div>퀴즈를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <main>
      <div className="flex justify-center">
        <p className='text-2xl'>나의 활동</p>
      </div>
      <nav className="flex justify-center">
        <ul className="flex justify-center text-2xl">
          <li onClick={() => setActiveTab('quizzes')}>내가 만든 퀴즈</li>
          <li onClick={() => setActiveTab('posts')}>내가 쓴 글</li>
        </ul>
      </nav>
      {activeTab === 'quizzes' && (
        <div className='flex justify-center w-full py-16 px-48'>
          <table className='w-full text-lg'>
            <thead className='text-left'>
              <tr>
                <th>제목</th>
                <th>완료수</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {userQuiz && userQuiz.length > 0
                ? userQuiz.map((quiz, index) => (
                    <tr key={index}>
                      <td>{quiz.title}</td>
                      <td>푼 횟수가 들어가요</td>
                      <td>{formatToLocaleDateTimeString(quiz.created_at)}</td>
                    </tr>
                  ))
                : !isQuizLoading && (
                    <tr>
                      <td>퀴즈가 없습니다.</td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'posts' && (
        <div className="justify-center w-full py-16 px-48">
          {userPost && userPost.length > 0
            ? userPost.map((post, index) => (
                <div className="text-lg" key={index}>
                  <h3>{post.title}</h3>
                  <p>{formatToLocaleDateTimeString(post.created_at)}</p>
                </div>
              ))
            : !isPostLoading && <div>게시글이 없습니다.</div>}
        </div>
      )}
    </main>
  );
};

export default MyActivity;