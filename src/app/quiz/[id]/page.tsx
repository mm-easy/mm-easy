'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CancelButton } from '@/components/common/FormButtons';
import { getQuiz } from '@/api/quizzes';
import { getQuestions } from '@/api/questions';
import { supabase } from '@/utils/supabase/supabase';
import { storageUrl } from '@/utils/supabase/storage';
import { handleMaxLength } from '@/utils/handleMaxLength';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { useAuth } from '@/hooks/useAuth';
import { useDeleteQuiz, useSubmitQuizTry, useUpdateQuizTry } from './mutations';
import Header from './Header';
import Creator from './Creator';
import Options from './Options';
import PageUpBtn from '@/components/common/PageUpBtn';
import ReportButton from '@/components/common/ReportButton';

import { QuestionType, type Question, Answer, Quiz } from '@/types/quizzes';

const QuizTryPage = () => {
  const { id } = useParams();
  const [resultMode, setResultMode] = useState(false);
  const [usersAnswers, setUsersAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [page, setPage] = useState(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const { getCurrentUserProfile } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  const insertQuizMutation = useSubmitQuizTry();
  const updateQuizMutation = useUpdateQuizTry();
  const deleteQuizMutation = useDeleteQuiz();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

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

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        const userProfile = await getCurrentUserProfile();
        if (userProfile) setCurrentUserEmail(userProfile.email);
      }
    };
    fetchData();
  }, [isLoggedIn]);

  const handlePrevPage = () => {
    setPage(page - 1);
    console.log(page);
  };

  const handleNextPage = () => {
    setPage(page + 1);
    console.log(page);
  };

  const {
    data: quizData,
    isLoading: quizIsLoading,
    isError: quizIsError
  } = useQuery({
    queryFn: async () => {
      try {
        const data = await getQuiz(id);
        return data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ['quizzes', id]
  });

  const {
    data: questionsData,
    isLoading: questionsIsLoading,
    isError: questionsIsError
  } = useQuery({
    queryFn: async () => {
      try {
        const data = await getQuestions(id);
        return data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ['questions']
  });

  if (quizIsLoading || questionsIsLoading) return <div>로드 중..</div>;
  if (quizIsError || questionsIsError) return <div>에러..</div>;

  const quizzes = quizData as Quiz[];
  const { title, level, info, thumbnail_img_url: url, creator_id, created_at } = quizzes[0];

  const questions = questionsData as Question[];

  const handleGetAnswer = (id: string | undefined, answer: string | boolean, option_id?: string) => {
    const idx = usersAnswers.findIndex((usersAnswer) => usersAnswer.id === id);
    const newAnswers = [...usersAnswers];

    if (option_id) {
      idx !== -1
        ? (newAnswers[idx] = { ...newAnswers[idx], answer, option_id })
        : newAnswers.push({ id, answer, option_id });
    } else {
      idx !== -1 ? (newAnswers[idx] = { ...newAnswers[idx], answer }) : newAnswers.push({ id, answer });
    }
    setUsersAnswers(newAnswers);
  };

  const handleGetLength = (id: string | undefined) => {
    const usersAnswer = usersAnswers.find((answer) => answer.id === id)?.answer;

    if (usersAnswer && typeof usersAnswer === 'string') {
      return usersAnswer.length;
    } else {
      return 0;
    }
  };

  const handleResultMode = () => {
    if (!resultMode) {
      // 풀기 모드에서 제출하기 버튼을 눌렀을 때
      if (questions.length !== usersAnswers.length) {
        // 모든 문제에 답이 제출됐는지 확인
        toast.warn('모든 문제를 풀어줘!');
      } else {
        let countCorrect = 0;

        for (const usersAnswer of usersAnswers) {
          const question = questions.find((question) => question.id === usersAnswer.id);

          if (question?.type === QuestionType.objective) {
            if (usersAnswer.answer) countCorrect++;
          } else {
            if (usersAnswer.answer === question?.correct_answer) countCorrect++;
          }
        }
        setResultMode(true);
        setScore(countCorrect);
        handleInsertQuizTry(countCorrect);
      }

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.location.reload(); // 결과 모드에서 다시 풀기 버튼을 눌렀을 때
    }
  };

  const handleInsertQuizTry = async (countCorrect: number) => {
    try {
      const quizTry = {
        user_id: currentUserEmail,
        quiz_id: id,
        score: level * countCorrect * 100
      };

      const { data: quizTryData } = await supabase
        .from('quiz_tries')
        .select('*')
        .eq('user_id', currentUserEmail)
        .eq('quiz_id', id);

      if (quizTryData?.length !== 0) {
        updateQuizMutation.mutate(quizTry);
        return;
      }
      if (currentUserEmail) {
        insertQuizMutation.mutate(quizTry);
      }
    } catch (error) {
      console.log('퀴즈 점수 저장/업데이트 실패', error);
    }
  };

  /** 삭제 버튼 클릭 핸들러 */
  const handleDeleteQuiz = (id: string) => {
    if (!window.confirm('해당 퀴즈를 삭제하시겠습니까?')) return;
    deleteQuizMutation.mutateAsync(id);
    router.replace('/quiz-list');
  };

  /** 수정 버튼 클릭 핸들러 */
  const handleEditQuiz = (id: string) => {
    router.push(`/quiz/form/edit?id=${id}`);
  };

  return (
    <>
      <Header level={level} title={title} />
      <div className="grid grid-cols-[16%_84%] bg-bgColor1">
        <article className="h-[76vh] text-pointColor1">
          <section>
            <Image
              src={`${storageUrl}/quiz-thumbnails/${url}`}
              alt="샘플 이미지"
              width={230}
              height={230}
              quality={100}
              className="w-full h-[230px] object-cover border-solid border-b-2 border-pointColor1"
            />
            <section className="p-4 flex flex-col gap-4 border-solid border-b-2 border-pointColor1">
              <Creator creator={creator_id} />
              <div>
                <h4>등록일</h4>
                <p>{formatToLocaleDateTimeString(created_at)}</p>
              </div>
            </section>
          </section>
          <p className="p-4">{info}</p>
          <div className="flex mt-10 justify-center font-bold">
            {currentUserEmail === creator_id && (
              <div className="flex gap-2 w-52">
                <CancelButton
                  text="수정"
                  width="w-44"
                  height="h-12"
                  border="border-2"
                  onClick={() => handleEditQuiz(id as string)}
                />
                <CancelButton
                  text="삭제"
                  width="w-44"
                  height="h-12"
                  border="border-2"
                  onClick={() => handleDeleteQuiz(id as string)}
                />
              </div>
            )}
          </div>
        </article>
        <main className="py-14 flex flex-col justify-center items-center gap-10 bg-white border-solid border-l-2 border-pointColor1">
          {resultMode && (
            <h1 className="text-2xl">
              🎉 {questions.length}개 중에 {score}개 맞았습니다! 🎉
            </h1>
          )}
          <article className="flex flex-col justify-between gap-8">
            {questions.map((question) => {
              const { id, title, type, img_url, correct_answer } = question;
              const questionOrder = questions.indexOf(question);
              const pageMode = !resultMode ? page === questionOrder : true;

              const usersAnswer = usersAnswers.find((answer) => answer.id === id);
              const answer = usersAnswer ? (usersAnswer.answer as string) : '';

              return (
                pageMode && (
                  <section key={id} className="w-[570px] flex flex-col items-center gap-4">
                    <div className="w-full flex justify-between place-items-center">
                      <h3 className="self-start text-lg">{`${questions.indexOf(question) + 1}. ${title}`}</h3>
                      <h3>
                        {questionOrder + 1}/{questions.length}
                      </h3>
                    </div>
                    {img_url !== 'tempThumbnail.png' ? (
                      <Image
                        src={`${storageUrl}/question-imgs/${img_url}`}
                        alt="문제 이미지"
                        width={570}
                        height={200}
                        className="h-[200px] mb-2 object-cover rounded-md"
                      />
                    ) : (
                      <></>
                    )}
                    {type === QuestionType.objective ? (
                      <Options id={id} resultMode={resultMode} usersAnswer={usersAnswer} onChange={handleGetAnswer} />
                    ) : (
                      <div className="w-full relative">
                        {resultMode ? (
                          <p
                            className={`w-full pl-4 py-[9px] border-solid border ${
                              usersAnswer?.answer === correct_answer
                                ? ' border-pointColor1 bg-bgColor2'
                                : 'border-pointColor2 bg-bgColor3'
                            } rounded-md`}
                          >
                            {usersAnswer?.answer}
                          </p>
                        ) : (
                          <>
                            <input
                              type="text"
                              value={answer}
                              className="w-full pl-4 py-[9px] border-solid border border-pointColor1 rounded-md"
                              onChange={(e) => {
                                handleMaxLength(e, 30);
                                handleGetAnswer(id, e.target.value);
                              }}
                            />
                            <p className="absolute top-0 right-2 pt-3 pr-1 text-sm text-pointColor1">
                              {handleGetLength(id)}/30
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </section>
                )
              );
            })}
            <section className="w-[570px] flex flex-col justify-between gap-3">
              {!resultMode && (
                <div className="flex justify-between gap-3">
                  <button
                    disabled={page === 0}
                    className={`w-full py-[9px] ${
                      page === 0 ? 'bg-grayColor' : 'border border-solid border-pointColor1'
                    } rounded-md`}
                    onClick={handlePrevPage}
                  >
                    이전 페이지
                  </button>
                  <button
                    disabled={page === questions.length - 1}
                    className={`w-full py-[9px] ${
                      page === questions.length - 1
                        ? 'text-white bg-grayColor'
                        : 'border border-solid border-pointColor1'
                    } rounded-md`}
                    onClick={handleNextPage}
                  >
                    다음 페이지
                  </button>
                </div>
              )}
              <button
                className="w-full py-[9px] bg-pointColor1 text-white font-bold tracking-wider rounded-md"
                onClick={handleResultMode}
              >
                {resultMode ? '다시 풀기' : '제출하기'}
              </button>
            </section>
          </article>
          {resultMode && (
            <ReportButton
              targetId={id}
              type="quizzes"
              currentUserEmail={currentUserEmail}
              title={title}
              creatorId={creator_id}
            >
              🚨 퀴즈에 오류가 있나요?
            </ReportButton>
          )}
        </main>
        <PageUpBtn scrollPosition={scrollPosition} />
      </div>
    </>
  );
};

export default QuizTryPage;
