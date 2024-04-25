'use client';

import { getMyActivityComment } from '@/api/comments';
import { getMyActivityPosts } from '@/api/posts';
import { fetchUserQuizzes, userSolvedQuizzes } from '@/api/quizzes';
import { CommentDeleteBtn, PostDeleteButton } from '@/components/common/DeleteButton';
import { useAuth } from '@/hooks/useAuth';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { supabase } from '@/utils/supabase/supabase';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Pagination } from './Pagination';
import { TabName } from '@/types/pagination';
import { useDeleteQuiz } from '../quiz/[id]/mutations';
import { CancelButton } from '@/components/common/FormButtons';
import useMultilingual from '@/utils/useMultilingual';
import { getUserLike } from '@/api/likes';

const MyActivity = () => {
  const m = useMultilingual('my-activity');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('solvedQuizzes'); // 활성 탭 상태
  const [currentPage, setCurrentPage] = useState(1);
  const { getCurrentUserProfile } = useAuth();
  const queryClient = useQueryClient();
  const deleteQuizMutation = useDeleteQuiz();
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

  // 사용자가 작성한 comment 불러오기
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

  // 사용자의 좋아요 가져오기
  const {
    data: userLike = [],
    isLoading: isLikeLoading,
    isError: isLikeError
  } = useQuery({
    queryFn: async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        if (userProfile && userProfile.email) {
          return await getUserLike(userProfile.id);
        }
        return [];
      } catch (error) {
        console.error('내 좋아요 불러오기 실패:', error);
        throw error;
      }
    },
    queryKey: ['userLikes'],
    enabled: isLoggedIn // 로그인 상태일 때만 쿼리 활성화
  });

  //
  const navigateToQuiz = (quizId: string) => {
    router.push(`/quiz/${quizId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const changeTab = (newTab: TabName) => {
    setActiveTab(newTab);
    setCurrentPage(1); // 탭을 변경할 때 페이지를 1로 리셋
  };

  const handleDeleteQuiz = (id: string) => {
    if (!window.confirm('해당 퀴즈를 삭제하시겠습니까?')) return;
    deleteQuizMutation.mutateAsync(id).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['userQuizzes']
      });
    });
  };

  const navigateToPost = (postId: string) => {
    router.push(`/community/list/전체/${postId}`);
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
  const currentLikes = userLike.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main className="sm:h-auto sm:pt-4 sm:justify-start sm:w-[100vw] sm:px-0 h-[84vh] px-[20%] flex flex-col justify-center items-center">
      <nav className="sm:pb-0 w-full pb-[4vh] flex justify-between text-pointColor1 font-medium  border-solid border-pointColor1 cursor-pointer">
        <ul className="sm:px-4 sm:text-base flex justify-center text-xl w-full text-center border-b-1 border-solid">
          <li
            className={`w-[25%] pb-3 ${
              activeTab === 'solvedQuizzes' && 'sm:border-b-[6px] font-bold border-solid border-b-3'
            }`}
            onClick={() => changeTab('solvedQuizzes')}
          >
            {m('QUIZ_I_SOLVED')}
          </li>
          <li
            className={`w-[25%] pb-3 ${
              activeTab === 'quizzes' && 'sm:border-b-[6px] font-bold border-solid border-b-3'
            }`}
            onClick={() => changeTab('quizzes')}
          >
            {m('QUIZ_I_MADE')}
          </li>
          <li
            className={`w-[25%] pb-3 ${activeTab === 'posts' && 'sm:border-b-[6px] font-bold border-solid border-b-3'}`}
            onClick={() => changeTab('posts')}
          >
            {m('MY_WRITING')}
          </li>
          <li
            className={`w-[25%] pb-3 ${
              activeTab === 'comments' && 'sm:border-b-[6px] font-bold border-solid border-b-3'
            }`}
            onClick={() => changeTab('comments')}
          >
            {m('MY_COMMENT')}
          </li>
          <li
            className={`w-[25%] pb-3 ${activeTab === 'likes' && 'sm:border-b-[6px] font-bold border-solid border-b-3'}`}
            onClick={() => changeTab('likes')}
          >
            {m('MY_LIKE')}
          </li>
        </ul>
      </nav>
      <article className="sm:h-auto w-full h-[calc(302px+16vh)]">
        {activeTab === 'solvedQuizzes' && (
          <div className="sm:hidden w-full flex justify-center">
            <table className="w-full">
              <thead className="text-left">
                <tr className="text-pointColor1 font-bold text-lg border-b-2 border-solid border-pointColor1">
                  <th className="pb-2 w-[65%]">{m('TITLE')}</th>
                  <th className="w-[13%]">{m('SCORE')}</th>
                  <th className="w-[22%]">{m('DATE_SOLVED')}</th>
                </tr>
              </thead>
              <tbody className="font-medium">
                {currentSolvedQuizzes && currentSolvedQuizzes.length > 0 ? (
                  currentSolvedQuizzes.map((quiz, index) => (
                    <tr key={index} className="border-b border-solid border-grayColor2">
                      <td className="w-24">{quiz.quizzes.title}</td>
                      <td>{quiz.score}</td>
                      <td>{formatToLocaleDateTimeString(quiz.created_at)}</td>
                      <td className="text-right py-[1vh]">
                        <button
                          className="w-28 h-8 border border-solid border-pointColor1 rounded-md font-bold text-pointColor1"
                          onClick={() => navigateToQuiz(quiz.quizzes.id)}
                        >
                          {m('RETRY_BTN')}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-pointColor1 font-bold text-lg">
                      {m('NO_QUIZZES_YOU_SOLVED')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* 모바일 전용 HTML */}
        {activeTab === 'solvedQuizzes' && (
          <div className="hidden md:hidden sm:block">
            {currentSolvedQuizzes && currentSolvedQuizzes.length > 0 ? (
              currentSolvedQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="h-[88px] flex px-[5vw] justify-between items-center border-b border-solid border-pointColor1"
                >
                  <div>
                    <div className="truncate max-w-sm font-semibold">
                      <p>{quiz.quizzes.title}</p>
                    </div>
                    <div className="text-sm flex">
                      <p>
                        {m('SCORE')} {quiz.score}
                      </p>
                      <p className="px-1">│</p>
                      <p>{formatToLocaleDateTimeString(quiz.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right py-[1vh]">
                    <button
                      className="text-sm w-20 h-12 border border-solid border-pointColor1 rounded-sm font-bold text-pointColor1"
                      onClick={() => navigateToQuiz(quiz.quizzes.id)}
                    >
                      {m('RETRY_BTN')}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="text-center py-6 text-pointColor1 font-bold text-lg">{m('NO_QUIZZES_YOU_SOLVED')}</p>
              </div>
            )}
          </div>
        )}
        {activeTab === 'quizzes' && (
          <div className="w-full flex justify-center">
            <table className="sm:hidden w-full">
              <thead className="text-left">
                <tr className="text-pointColor1 font-bold text-lg border-b-2 border-solid border-pointColor1">
                  <th className="pb-2 w-[65%]">{m('TITLE')}</th>
                  <th className="w-[13%]">{m('SOLVED_COUNT')}</th>
                  <th className="w-[22%]">{m('DATE_CREATED')}</th>
                </tr>
              </thead>
              <tbody className="font-medium">
                {currentQuizzes && currentQuizzes.length > 0 ? (
                  currentQuizzes.map((quiz, index) => (
                    <tr key={index} className="border-b border-solid border-grayColor2">
                      <td className="w-24">
                        <a href={`/quiz/${quiz.id}`}>{quiz.title}</a>
                      </td>
                      <td>{quiz.quiz_tries.length}</td>
                      <td>{formatToLocaleDateTimeString(quiz.created_at)}</td>
                      <td className="text-right font-bold bg-point py-[1vh]">
                        <CancelButton
                          text={m('DELETE_BTN')}
                          width="w-28"
                          height="h-8"
                          border="border"
                          onClick={() => handleDeleteQuiz(quiz.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-pointColor1 font-bold text-lg">
                      {m('NO_QUIZZES_YOU_MADE')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* 내가 만든 퀴즈 모바일 */}
        {activeTab === 'quizzes' && (
          <div className="hidden md:hidden sm:block">
            {currentQuizzes && currentQuizzes.length > 0 ? (
              currentQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="h-[88px] flex px-[5vw] justify-between items-center border-b border-solid border-pointColor1"
                >
                  <div>
                    <div className="truncate max-w-sm font-semibold">
                      <a href={`/quiz/${quiz.id}`}>{quiz.title}</a>
                    </div>
                    <div className="text-sm flex">
                      <p>
                        {m('SOLVED_COUNT')} {quiz.quiz_tries.length}
                      </p>
                      <p className="px-1">│</p>
                      <p>{formatToLocaleDateTimeString(quiz.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right py-[1vh]">
                    <div className="text-sm font-bold rounded-sm">
                      <CancelButton
                        text={m('DELETE_BTN')}
                        width="w-20"
                        height="h-12"
                        border="border"
                        onClick={() => handleDeleteQuiz(quiz.id)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="text-center py-6 text-pointColor1 font-bold text-lg">{m('NO_QUIZZES_YOU_SOLVED')}</p>
              </div>
            )}
          </div>
        )}
        {activeTab === 'posts' && (
          <div className="w-full flex justify-center">
            <table className="sm:hidden w-full font-medium">
              <thead className="text-left">
                <tr className="text-pointColor1 font-bold text-lg border-b-2 border-solid border-pointColor1">
                  <th className="pb-2 w-[60%]">{m('TITLE')}</th>
                  <th className="w-[13%]">{m('VIEW_COUNT')}</th>
                  <th className="w-[22%]">{m('DATE_CREATED')}</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts && currentPosts.length > 0 ? (
                  currentPosts.map((post, index) => (
                    <tr key={index} className="border-b border-solid border-grayColor2">
                      <td className="truncate max-w-xs pr-12 w-24">
                        <a href={`/community/list/${post.category}/${post.id}`}>{post.title}</a>
                      </td>
                      <td>{post.view_count}</td>
                      <td>{formatToLocaleDateTimeString(post.created_at)}</td>
                      <td className="text-right py-[1vh]">
                        <PostDeleteButton text={m('DELETE_BTN')} postId={post.id} width="w-28" height="h-8" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-pointColor1 font-bold text-lg">
                      {m('NO_POSTS')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* 내가 쓴 게시글 모바일 */}
        {activeTab === 'posts' && (
          <div className="hidden md:hidden sm:block">
            {currentPosts && currentPosts.length > 0 ? (
              currentPosts.map((post, index) => (
                <div
                  key={index}
                  className="h-[88px] flex px-[5vw] justify-between items-center border-b border-solid border-pointColor1"
                >
                  <div>
                    <div className="truncate max-w-xs font-semibold">
                      <a href={`/community/list/${post.category}/${post.id}`}>{post.title}</a>
                    </div>
                    <div className="text-sm flex">
                      <p>
                        {m('VIEW_COUNT')} {post.view_count}
                      </p>
                      <p className="px-1">│</p>
                      <p>{formatToLocaleDateTimeString(post.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right py-[1vh]">
                    <div className="text-sm font-bold rounded-sm">
                      <PostDeleteButton text={m('DELETE_BTN')} postId={post.id} width="w-20" height="h-12" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="text-center py-6 text-pointColor1 font-bold text-lg">{m('NO_QUIZZES_YOU_SOLVED')}</p>
              </div>
            )}
          </div>
        )}
        {activeTab === 'comments' && (
          <div className="w-full flex justify-center">
            <table className="sm:hidden w-full font-medium">
              <thead className="text-left">
                <tr className="text-pointColor1 font-bold text-lg border-b-2 border-solid border-pointColor1">
                  <th className="pb-2 w-[65%]">{m('CONTENT')}</th>
                  <th className="w-[35%]">{m('DATE_CREATED')}</th>
                </tr>
              </thead>
              <tbody>
                {currentComments && currentComments.length > 0 ? (
                  currentComments.map((comment, index) => (
                    <tr key={index} className="border-b border-solid border-grayColor2">
                      <td className="truncate max-w-xs w-24">{comment.content}</td>
                      <td>{formatToLocaleDateTimeString(comment.created_at)}</td>
                      <td className="text-right py-[1vh]">
                        <CommentDeleteBtn text={m('DELETE_BTN')} userId={comment.id} width="w-28" height="h-8" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-pointColor1 font-bold text-lg">
                      {m('NO_COMMTENTS')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* 내가 쓴 댓글 모바일 */}
        {activeTab === 'comments' && (
          <div className="hidden md:hidden sm:block">
            {currentComments && currentComments.length > 0 ? (
              currentComments.map((comment, index) => (
                <div
                  key={index}
                  className="h-[88px] flex px-[5vw] justify-between items-center border-b border-solid border-pointColor1"
                >
                  <div>
                    <div className="truncate max-w-xs font-semibold">
                      <p className="">{comment.content}</p>
                    </div>
                    <div className="text-sm flex">
                      <p>{formatToLocaleDateTimeString(comment.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right py-[1vh]">
                    <div className="text-sm font-bold rounded-sm">
                      <CommentDeleteBtn text={m('DELETE_BTN')} userId={comment.id} width="w-20" height="h-12" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="text-center py-6 text-pointColor1 font-bold text-lg">{m('NO_QUIZZES_YOU_SOLVED')}</p>
              </div>
            )}
          </div>
        )}
        {activeTab === 'likes' && (
          <div className="w-full flex justify-center">
            <table className="sm:hidden w-full font-medium">
              <thead className="text-left">
                <tr className="text-pointColor1 font-bold text-lg border-b-2 border-solid border-pointColor1">
                  <th className="pb-2 w-[65%]">{m('TITLE')}</th>
                  <th className="w-[35%]">{m('DATE_CREATED')}</th>
                </tr>
              </thead>
              <tbody>
                {currentLikes && currentLikes.length > 0 ? (
                  currentLikes.map((like, index) => (
                    <tr key={index} className="border-b border-solid border-grayColor2">
                      <td className="truncate max-w-xs w-24">{like.posts?.title}</td>
                      <td>{formatToLocaleDateTimeString(like.created_at)}</td>
                      <td className="text-right py-[1vh]">
                        <button
                          className="w-28 h-8 border border-solid border-pointColor1 rounded-md font-bold text-pointColor1"
                          onClick={() => navigateToPost(like.post_id)}
                        >
                          {m('POST_NOW_GO')}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-pointColor1 font-bold text-lg">
                      {m('NO_LIKES')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* 내가 한 좋아요 모바일 */}
        {activeTab === 'likes' && (
          <div className="hidden md:hidden sm:block">
            {currentLikes && currentLikes.length > 0 ? (
              currentLikes.map((like, index) => (
                <div
                  key={index}
                  className="h-[88px] flex px-[5vw] justify-between items-center border-b border-solid border-pointColor1"
                >
                  <div>
                    <div className="truncate max-w-xs font-semibold">
                      <p className="">{like.posts?.title}</p>
                    </div>
                    <div className="text-sm flex">
                      <p>{formatToLocaleDateTimeString(like.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right py-[1vh]">
                    <button
                      className="text-sm w-20 h-12 border border-solid border-pointColor1 rounded-sm font-bold text-pointColor1"
                      onClick={() => navigateToPost(like.post_id)}
                    >
                      {m('POST_NOW_GO')}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="text-center py-6 text-pointColor1 font-bold text-lg">{m('NO_QUIZZES_YOU_SOLVED')}</p>
              </div>
            )}
          </div>
        )}
      </article>
      <div className="sm:block sm:pb-20 pt-6">
        <Pagination
          total={
            activeTab === 'solvedQuizzes'
              ? userSolvedQuiz.length
              : activeTab === 'quizzes'
              ? userQuiz.length
              : activeTab === 'posts'
              ? userPost.length
              : activeTab === 'comments'
              ? userComment.length
              : userLike.length
          }
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default MyActivity;
