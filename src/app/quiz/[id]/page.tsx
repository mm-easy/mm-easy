'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { useAuth } from '@/hooks/useAuth';
import { langAtom } from '@/store/store';
import { getQuiz } from '@/api/quizzes';
import { getQuestions } from '@/api/questions';
import { supabase } from '@/utils/supabase/supabase';
import { storageUrl } from '@/utils/supabase/storage';
import { handleMaxLength } from '@/utils/handleMaxLength';
import { useSubmitQuizTry, useUpdateQuizTry } from './mutations';
import confetti, { Options as ConfettiOptions } from 'canvas-confetti';
import tailwindColors from '../../../../tailwind.config';

import Header from './Header';
import Options from './Options';
import PageUpBtn from '@/components/common/PageUpBtn';
import ReportButton from '@/components/common/ReportButton';
import LoadingImg from '@/components/common/LoadingImg';
import useMultilingual from '@/utils/useMultilingual';

import { QuestionType, type Question, Answer, Quiz, Params } from '@/types/quizzes';
import type { TailwindColors } from '@/types/tailwind';
import CorrectAnswerBtn from './CorrectAnswerBtn';
import SideHeader from './SideHeader';
import PageAndSubmitBtn from './PageAndSubmitBtn';
import { MobileHeader } from '@/components/common/MobileHeader';

const QuizTryPage = () => {
  const [lang] = useAtom(langAtom);
  const m = useMultilingual('quiz-try');

  const { id } = useParams<Params>();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [score, setScore] = useState(0);
  const [resultMode, setResultMode] = useState(false);
  const [usersAnswers, setUsersAnswers] = useState<Answer[]>([]);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const { getCurrentUserProfile } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  const insertQuizMutation = useSubmitQuizTry();
  const updateQuizMutation = useUpdateQuizTry();

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

  /** 문제 페이지네이션 */
  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  /** Quiz, Question 데이터 불러오기 */
  const {
    data: quizData,
    isLoading: quizIsLoading,
    isError: quizIsError
  } = useQuery({
    queryFn: async () => {
      try {
        const data = await getQuiz(id as string);
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

  if (quizIsLoading || questionsIsLoading) return <LoadingImg height="84vh" />;
  if (quizIsError || questionsIsError) return <div>에러..</div>;

  const quizzes = quizData as Quiz[];

  if (!quizzes[0]) {
    toast.warning('존재하지 않는 퀴즈입니다.');
    router.replace('/quiz/list');
    return <div className="h-full w-full">삭제되었거나 없는 퀴즈입니다.</div>;
  }
  const { title, level, info, thumbnail_img_url: url, creator_id, created_at } = quizzes[0];

  const questions = questionsData as Question[];
  const isAllAnswersSubmitted = questions.length === usersAnswers.length;

  /** 답안 입력 input 에서 엔터 시 다음 페이지로 넘어가도록 */
  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && page < questions.length - 1) {
      e.preventDefault();
      handleNextPage();
    }
  };

  /** 답안 저장 */
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

  /** 주관형 답 길이 알아내기 */
  const handleGetLength = (id: string | undefined) => {
    const usersAnswer = usersAnswers.find((answer) => answer.id === id)?.answer;

    if (usersAnswer && typeof usersAnswer === 'string') {
      return usersAnswer.length;
    } else {
      return 0;
    }
  };

  /** 결과 페이지 실행 */
  const handleResultMode = () => {
    if (!resultMode) {
      // 풀기 모드에서 제출하기 버튼을 눌렀을 때
      const isEmptyAnswersExists = usersAnswers.some((usersAnswer) => usersAnswer.answer === '');

      if (!isAllAnswersSubmitted || isEmptyAnswersExists) {
        // 모든 문제에 답이 제출됐는지 확인
        toast.warn(m('NOTIFY_TO_SOLVE'));
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
        if (countCorrect) handleConfetti();
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

  /** 점수 DB 에 업로드 */
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

  /** 하나라도 정답이라면 폭죽 효과 */
  const handleConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration; // 지금 시간부터 5초동안 폭죽 효과
    const { colors } = tailwindColors.theme?.extend as { colors: TailwindColors };

    const setting: ConfettiOptions = {
      // 폭죽 효과 CSS 설정
      particleCount: 100,
      spread: 100,
      origin: { y: 1.5 },
      colors: [colors?.pointColor1, colors?.pointColor2]
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      // 일정 시간마다 폭죽 터트림
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        // 시간 다 끝나면 폭죽 끔
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration); // 파티클 개수, 시간에 따라 조절됨
      confetti({
        // 위에서 설정한 세팅값을 복사하고, 파티클 수와 발사 위치 정함
        ...setting,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <>
      {!resultMode ? (
        <div className="sm:block hidden">
          <MobileHeader backPage="/quiz/list" text="퀴즈 풀기" />
        </div>
      ) : (
        <div className="sm:block hidden">
          <MobileHeader backPage="/quiz/list" text="퀴즈 결과" />
        </div>
      )}
      <Header
        level={level}
        title={title}
        isAnswerWritten={usersAnswers.length}
        resultMode={resultMode}
        id={id}
        currentUserEmail={currentUserEmail}
        creator={creator_id}
      />
      <div className="grid grid-cols-[16%_84%] sm:pb-[8vh] sm:block bg-bgColor1 sm:bg-white">
        <SideHeader
          url={url}
          info={info}
          creator={creator_id}
          date={created_at}
          currentUserEmail={currentUserEmail}
          id={id}
        />
        <main
          className={` py-14 flex flex-col justify-center items-center gap-10 bg-white border-solid border-l-2 border-pointColor1 sm:border-0`}
        >
          {resultMode && (
            <h1 className="text-2xl">
              🎉 {lang === 'en' ? score : questions.length}
              {m('RESULT_TEXT1')}
              {lang === 'en' ? questions.length : score}
              {m('RESULT_TEXT2')} 🎉
            </h1>
          )}
          <article className="sm:w-4/5 flex flex-col justify-between gap-8">
            {questions.map((question) => {
              const { id, title, type, img_url, correct_answer } = question;
              const questionOrder = questions.indexOf(question);
              const pageMode = !resultMode ? page === questionOrder : true;
              const usersAnswer = usersAnswers.find((answer) => answer.id === id);
              const answer = usersAnswer && (usersAnswer.answer as string);

              return (
                pageMode && (
                  <section key={id} className="w-[570px] sm:w-full flex flex-col items-center gap-4">
                    <div className="w-full flex justify-between place-items-center">
                      <h3 className="self-start text-lg">{`${questions.indexOf(question) + 1}. ${title}`}</h3>
                      <h3>
                        {questionOrder + 1}/{questions.length}
                      </h3>
                    </div>
                    {img_url !== null && (
                      <Image
                        src={`${storageUrl}/question-imgs/${img_url}`}
                        alt="문제 이미지"
                        width={570}
                        height={200}
                        className="h-[200px] mb-2 object-cover rounded-md"
                      />
                    )}
                    {type === QuestionType.objective ? (
                      <Options
                        id={id}
                        resultMode={resultMode}
                        usersAnswer={usersAnswer}
                        onChange={handleGetAnswer}
                        onKeyDown={handleEnterKey}
                      />
                    ) : (
                      <div className="w-full relative">
                        {resultMode ? (
                          <>
                            <p
                              className={`w-full sm:h-12 mb-4 pl-4 py-[9px] border-solid border ${
                                usersAnswer?.answer === correct_answer
                                  ? ' border-pointColor1 bg-bgColor2'
                                  : 'border-pointColor2 bg-bgColor3'
                              } rounded-md`}
                            >
                              {usersAnswer?.answer}
                            </p>
                            <CorrectAnswerBtn answer={correct_answer} />
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              value={answer}
                              className="w-full sm:h-12 pl-4 py-[9px] border-solid border border-pointColor1 rounded-md"
                              onChange={(e) => {
                                handleMaxLength(e, 30);
                                handleGetAnswer(id, e.target.value);
                              }}
                              onKeyDown={handleEnterKey}
                            />
                            <p className="absolute top-0 right-2 pt-3 sm:pt-4 pr-1 text-sm text-pointColor1">
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
            <PageAndSubmitBtn
              resultMode={resultMode}
              questionsLength={questions.length}
              page={page}
              isAllAnswersSubmitted={isAllAnswersSubmitted}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              handleResultMode={handleResultMode}
            />
          </article>
          {resultMode && (
            <ReportButton
              targetId={id}
              type="quiz"
              currentUserEmail={currentUserEmail}
              title={title}
              creatorId={creator_id}
            >
              🚨 {m('REPORT_BTN')}
            </ReportButton>
          )}
        </main>
        <PageUpBtn scrollPosition={scrollPosition} bottom="bottom-[80px]" smallBottom="sm:bottom-28" />
      </div>
    </>
  );
};

export default QuizTryPage;
