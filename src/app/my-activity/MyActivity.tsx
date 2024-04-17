'use client';

import { getMyActivityComment } from '@/api/comments';
import { getMyActivityPosts } from '@/api/posts';
import { fetchUserQuizzes, userSolvedQuizzes } from '@/api/quizzes';
import { CommentDeleteBtn, PostDeleteButton } from '@/components/common/DeleteButton';
import { useAuth } from '@/hooks/useAuth';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { supabase } from '@/utils/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Pagination } from './Pagination';
import { TabName } from '@/types/pagination';

const MyActivity = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('solvedQuizzes'); // 활성 탭 상태
  const [currentPage, setCurrentPage] = useState(1);
  const { getCurrentUserProfile } = useAuth();
  const router = useRouter();

  // 사용자 정보 확인
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
    data: userQuiz = [],
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

  // 사용자가 푼 quiz 불러오기
  const {
    data: userSolvedQuiz = [],
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

  // 사용자가 작성한 post 불러오기
  const {
    data: userPost = [],
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

  // 사용자가 작성한 content 불러오기
  const {
    data: userComment = [],
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

  //
  const navigateToQuiz = (puizId: string) => {
    router.push(`/quiz/${puizId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const changeTab = (newTab: TabName) => {
    setActiveTab(newTab);
    setCurrentPage(1); // 탭을 변경할 때 페이지를 1로 리셋
  };

  // 페이지
  const itemsPerPage = 8; // 페이지 당 항목 수
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 각 탭의 데이터 슬라이싱
  const currentSolvedQuizzes = userSolvedQuiz.slice(indexOfFirstItem, indexOfLastItem);
  const currentQuizzes = userQuiz.slice(indexOfFirstItem, indexOfLastItem);
  const currentPosts = userPost.slice(indexOfFirstItem, indexOfLastItem);
  const currentComments = userComment.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main className="px-[25%]">
      <h3 className="text-center my-10 text-2xl font-bold text-pointColor1">나의 활동</h3>
      <nav className="flex justify-center text-pointColor1 font-medium  border-solid border-pointColor1 pb-8 cursor-pointer">
        <ul className="flex justify-center text-xl w-full text-center border-b-2 border-solid ">
          <li
            className={`w-[25%] pb-3 ${activeTab === 'solvedQuizzes' ? 'font-bold border-solid border-b-3' : ''}`}
            onClick={() => changeTab('solvedQuizzes')}
          >
            내가 푼 퀴즈
          </li>
          <li
            className={`w-[25%] pb-3 ${activeTab === 'quizzes' ? 'font-bold  border-solid border-b-3' : ''}`}
            onClick={() => changeTab('quizzes')}
          >
            내가 만든 퀴즈
          </li>
          <li
            className={`w-[25%] pb-3 ${activeTab === 'posts' ? 'font-bold  border-solid border-b-3' : ''}`}
            onClick={() => changeTab('posts')}
          >
            내가 쓴 글
          </li>
          <li
            className={`w-[25%] pb-3 ${activeTab === 'comments' ? 'font-bold  border-solid border-b-3' : ''}`}
            onClick={() => changeTab('comments')}
          >
            내가 쓴 댓글
          </li>
        </ul>
      </nav>

      {activeTab === 'solvedQuizzes' && (
        <div className="flex justify-center w-full ">
          <table className="w-full font-medium">
            <thead className="text-left">
              <tr className="text-pointColor1 font-bold text-lg border-b-2 border-solid border-pointColor1">
                <th className="pb-2 w-[55%]">제목</th>
                <th className="w-[13%]">점수</th>
                <th>푼 날짜</th>
              </tr>
            </thead>
            <tbody>
              {currentSolvedQuizzes && currentSolvedQuizzes.length > 0 ? (
                currentSolvedQuizzes.map((quiz, index) => (
                  <tr className="bg-white border-b border-solid border-grayColor" key={index}>
                    <td className="py-4 w-24">{quiz.quizzes.title}</td>
                    <td>{quiz.score}</td>
                    <td>{formatToLocaleDateTimeString(quiz.created_at)}</td>
                    <div className="text-right">
                      <button
                        className="h-8 w-28 border border-solid border-pointColor1 px-4 rounded-md font-bold text-pointColor1"
                        onClick={() => navigateToQuiz(quiz)}
                      >
                        다시 풀기
                      </button>
                    </div>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-pointColor1 font-bold text-lg">
                    푼 퀴즈가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'quizzes' && (
        <div className="flex justify-center w-full ">
          <table className="w-full font-medium">
            <thead className="text-left">
              <tr className="text-pointColor1 font-bold text-lg border-b-2 border-solid border-pointColor1">
                <th className="pb-2 w-[55%]">제목</th>
                <th className="w-[13%]">완료수</th>
                <th>작성 날짜</th>
              </tr>
            </thead>
            <tbody>
              {currentQuizzes && currentQuizzes.length > 0 ? (
                currentQuizzes.map((quiz, index) => (
                  <tr className="bg-white border-b border-solid border-grayColor" key={index}>
                    <td className="py-4 w-24">
                      <a href={`/quiz/${quiz.id}`}>{quiz.title}</a>
                    </td>
                    <td>{quiz.quiz_tries.length}</td>
                    <td>{formatToLocaleDateTimeString(quiz.created_at)}</td>
                    <div className="text-right">
                      <button
                        className="h-8 w-28 border border-solid border-pointColor1 px-4 rounded-md font-bold text-pointColor1"
                        onClick={() => navigateToQuiz(quiz.id)}
                      >
                        다시 풀기
                      </button>
                    </div>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-pointColor1 font-bold text-lg">
                    만든 퀴즈가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="flex justify-center w-full">
          <table className="w-full font-medium">
            <thead className="text-left">
              <tr className="text-pointColor1 font-bold text-lg border-b-2 border-solid border-pointColor1">
                <th className="pb-2 w-[55%]">제목</th>
                <th className="w-[13%]">조회수</th>
                <th>작성 날짜</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts && currentPosts.length > 0 ? (
                currentPosts.map((post, index) => (
                  <tr className="bg-white border-b border-solid border-grayColor" key={index}>
                    <td className="truncate max-w-xs pr-12 py-4 w-24">
                      <a href={`/community/list/${post.category}/${post.id}`}>{post.title}</a>
                    </td>
                    <td>{post.view_count}</td>
                    <td>{formatToLocaleDateTimeString(post.created_at)}</td>
                    <td className="text-right">
                      <PostDeleteButton text="삭제" postId={post.id} width="w-28" height="h-8" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-pointColor1 font-bold text-lgtext-center">
                    게시글이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'comments' && (
        <div className="flex justify-center w-full">
          <table className="w-full font-medium">
            <thead className="text-left">
              <tr className="text-pointColor1 font-bold text-lg border-b-2 border-solid border-pointColor1">
                <th className="pb-2 w-[55%]">내용</th>
                <th>작성 날짜</th>
              </tr>
            </thead>
            <tbody>
              {currentComments && currentComments.length > 0 ? (
                currentComments.map((comment, index) => (
                  <tr className="bg-white border-b border-solid border-grayColor" key={index}>
                    <td className="truncate max-w-xs py-4 w-24">{comment.content}</td>
                    <td>{formatToLocaleDateTimeString(comment.created_at)}</td>
                    <td className="text-right">
                      <CommentDeleteBtn text="삭제" userId={comment.id} width="w-28" height="h-8" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-pointColor1 font-bold text-lg">
                    댓글이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        total={
          activeTab === 'solvedQuizzes'
            ? userSolvedQuiz.length
            : activeTab === 'quizzes'
              ? userQuiz.length
              : activeTab === 'posts'
                ? userPost.length
                : userComment.length
        }
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default MyActivity;
