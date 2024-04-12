'use client';

import { getMyActivityComment } from '@/api/comments';
import { getMyActivityPosts } from '@/api/posts';
import { fetchUserQuizzes, userSolvedQuizzes } from '@/api/quizzes';
import { CommentDeleteBtn, PostDeleteButton } from '@/components/common/DeleteButton';
import { PostEditButton } from '@/components/common/EditButton';
import { useAuth } from '@/hooks/useAuth';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { supabase } from '@/utils/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyActivity = () => {
  const { getCurrentUserProfile } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('quizzes'); // 활성 탭 상태
  const router = useRouter();

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

  // 사용자가 만든 quiz 불러오기
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
    data: userSolvedQuiz,
    isLoading: isSolvedQuizLoading,
    isError: isSolvedQuizError
  } = useQuery({
    queryFn: async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        if (userProfile && userProfile.email) {
          return await userSolvedQuizzes(userProfile.email);
          
        }
        return [];
      } catch (error) {
        console.error('퀴즈 불러오기 실패:', error);
        throw error;
      }
    },
    queryKey: ['userSolvedQuizzes'],
    enabled: isLoggedIn // 로그인 상태일 때만 쿼리 활성화
  });

  console.log("userSolvedQuiz",userSolvedQuiz)

  // 사용자가 작성한 post 불러오기
  const {
    data: userPost,
    isLoading: isPostLoading,
    isError: isPostError
  } = useQuery({
    queryFn: async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        if (userProfile && userProfile.id) {
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

  const {
    data: userComment,
    isLoading: isCommentLoading,
    isError: isCommentError
  } = useQuery({
    queryFn: async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        if (userProfile && userProfile.email) {
          return await getMyActivityComment(userProfile.id);
        }
        return [];
      } catch (error) {
        console.error('내 댓글 불러오기 실패:', error);
        throw error;
      }
    },
    queryKey: ['userComments'],
    enabled: isLoggedIn // 로그인 상태일 때만 쿼리 활성화
  });

  const navigateToQuiz = (puizId: string) => {
    router.push(`/quiz/${puizId}`);
  };

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
  {
    isCommentLoading && <div>로딩 중...</div>;
  }
  {
    isCommentError && <div>댓글을 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <main className="px-[20%]">
      <div className="flex justify-center">
        <p className="py-14 text-2xl font-bold text-pointColor1">나의 활동</p>
      </div>
      <nav className="flex justify-center text-pointColor1 font-medium  border-solid border-pointColor1 pb-16 cursor-pointer">
        <ul className="flex justify-center text-2xl w-full text-center border-b-2 border-solid ">
          <li
            className={`w-[25%] pb-6 ${activeTab === 'quizzesClear' ? 'font-bold border-solid border-b-3' : ''}`}
            onClick={() => setActiveTab('quizzesClear')}
          >
            내가 푼 퀴즈
          </li>
          <li
            className={`w-[25%] pb-6 ${activeTab === 'quizzes' ? 'font-bold  border-solid border-b-3' : ''}`}
            onClick={() => setActiveTab('quizzes')}
          >
            내가 만든 퀴즈
          </li>
          <li
            className={`w-[25%] pb-6 ${activeTab === 'posts' ? 'font-bold  border-solid border-b-3' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            내가 쓴 글
          </li>
          <li
            className={`w-[25%] pb-6 ${activeTab === 'comments' ? 'font-bold  border-solid border-b-3' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            내가 쓴 댓글
          </li>
        </ul>
      </nav>
      {activeTab === 'quizzes' && (
        <div className="flex justify-center w-full ">
          <table className="w-full text-lg font-medium">
            <thead className="text-left">
              <tr className="text-pointColor1 font-bold border-b-2 border-solid border-pointColor1">
                <th className="pb-2 w-[36%]">제목</th>
                <th className="w-[20%]">완료수</th>
                <th>작성 날짜</th>
              </tr>
            </thead>
            <tbody>
              {userQuiz && userQuiz.length > 0
                ? userQuiz.map((quiz, index) => (
                    <tr className="font-bold bg-white border-b border-solid border-pointColor3" key={index}>
                      <td className="py-6 w-24">{quiz.title}</td>
                      <td>120</td>
                      <td>{formatToLocaleDateTimeString(quiz.created_at)}</td>
                      <div className="text-right">
                        <button
                          className="h-12 border border-solid border-pointColor1 px-4 py-2 rounded-md font-bold text-pointColor1"
                          onClick={() => navigateToQuiz(quiz.id)}
                        >
                          다시 풀기
                        </button>
                      </div>
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
        <div>
          {userPost && userPost.length > 0
            ? userPost.map((post, index) => (
                <div
                  className="flex justify-between items-start text-lg py-4 border-b border-solid border-pointColor3"
                  key={index}
                >
                  <div className="">
                    <h3 className="font-bold">{post.title}</h3>
                    <p>작성일 {formatToLocaleDateTimeString(post.created_at)}</p>
                  </div>
                  <div>
                    <PostDeleteButton text="삭제" postId={post.id} width="w-28" height="h-12" />
                  </div>
                </div>
              ))
            : !isPostLoading && <div>게시글이 없습니다.</div>}
        </div>
      )}
      {activeTab === 'comments' && (
        <div>
          {userComment && userComment.length > 0
            ? userComment.map((comment, index) => (
                <div
                  className="flex justify-between items-start text-lg py-4 border-b border-solid border-pointColor3 "
                  key={index}
                >
                  <div>
                    <h3 className="font-bold">{comment.content}</h3>
                    <p>작성일 {formatToLocaleDateTimeString(comment.created_at)}</p>
                  </div>
                  <div>
                    <CommentDeleteBtn text="삭제" userId={comment.id} width="w-28" height="h-12" />
                  </div>
                </div>
              ))
            : !isPostLoading && <div>댓글이 없습니다.</div>}
        </div>
      )}
    </main>
  );
};

export default MyActivity;
