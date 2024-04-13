'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { getQuiz } from '@/api/quizzes';
import { getQuestions } from '@/api/questions';
import { supabase } from '@/utils/supabase/supabase';
import { storageUrl } from '@/utils/supabase/storage';
import { handleMaxLength } from '@/utils/handleMaxLength';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { useAuth } from '@/hooks/useAuth';
import { useSubmitAdmin, useSubmitQuizTry, useSubmitReport, useUpdateQuizTry } from './mutations';

import Header from './Header';
import Creator from './Creator';
import Options from './Options';
import PageUpBtn from '@/components/common/PageUpBtn';

import { QuestionType, type Question, Answer, Quiz } from '@/types/quizzes';

const QuizTryPage = () => {
  const { id } = useParams();
  const [resultMode, setResultMode] = useState(false);
  const [usersAnswers, setUsersAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const { getCurrentUserProfile } = useAuth();

  const insertQuizMutation = useSubmitQuizTry();
  const updateQuizMutation = useUpdateQuizTry();
  const insertAdminMutation = useSubmitAdmin();
  const insertReportMutation = useSubmitReport();

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

  const handleReport = async (id: string | string[]) => {
    try {
      const admin = {
        type: 'quizzes',
        title,
        target_id: id,
        reported_user_id: creator_id
      };
      const insertAdminResult = await insertAdminMutation.mutateAsync(admin);

      const report = {
        user_id: currentUserEmail,
        admin_id: insertAdminResult
      };
      insertReportMutation.mutate(report);
    } catch (error) {
      console.log('관리 등록/업데이트 실패', error);
    }
  };

  return (
    <>
      <Header level={level} title={title} />
      <main className="grid grid-cols-[16%_84%] bg-bgColor1">
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
        </article>
        <article className="pt-12 pb-20 flex flex-col justify-center place-items-center gap-10 bg-white border-solid border-l-2 border-pointColor1">
          {resultMode && (
            <h1 className="text-2xl">
              🎉 {questions.length}개 중에 {score}개 맞았습니다! 🎉
            </h1>
          )}
          {questions.map((question) => {
            const { id, title, type, img_url, correct_answer } = question;
            const usersAnswer = usersAnswers.find((answer) => answer.id === id);
            return (
              <section key={id} className="w-[570px] flex flex-col place-items-center gap-4">
                <h3 className="self-start text-lg">{`${questions.indexOf(question) + 1}. ${title}`}</h3>
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
            );
          })}
          <button
            className="w-[570px] pl-4 py-[9px] bg-pointColor1 text-white font-bold tracking-wider rounded-md"
            onClick={handleResultMode}
          >
            {resultMode ? '다시 풀기' : '제출하기'}
          </button>
          {resultMode && (
            <button className="text-pointColor1 underline" onClick={() => handleReport(id)}>
              🚨 퀴즈에 오류가 있나요?
            </button>
          )}
        </article>
        <PageUpBtn scrollPosition={scrollPosition} />
      </main>
    </>
  );
};

export default QuizTryPage;
