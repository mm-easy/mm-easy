'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getQuiz } from '@/api/quizzes';
import { getQuestions } from '@/api/questions';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { GetQuestions, QuestionType, type GetQuiz } from '@/types/quizzes';
import { useState } from 'react';
import Options from './Options';
import { handleMaxLength } from '@/utils/handleMaxLength';
import Header from './Header';
import { toast } from 'react-toastify';

const QuizTryPage = () => {
  const { id } = useParams();
  const [resultMode, setResultMode] = useState(false);
  const [score, setScore] = useState(0);

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
    queryKey: ['quizzes']
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

  if (quizIsLoading) return <div>퀴즈 로드 중..</div>;
  if (quizIsError) return <div>퀴즈 로드 에러..</div>;

  if (questionsIsLoading) return <div>퀴즈 로드 중..</div>;
  if (questionsIsError) return <div>퀴즈 로드 에러..</div>;

  const quizzes = quizData as GetQuiz[];
  const { title, level, info, thumbnail_img_url: url, creator_id, created_at } = quizzes[0];

  let questions = questionsData as GetQuestions[];

  /** 선택형 채점 */
  const handleGradeSubjectiveAnswer = (id: string | undefined, is_correct: boolean) => {
    if (is_correct) {
      checkRightAnswer(id);
    } else {
      checkWrongAnswer(id);
    }
  };

  /** 주관형 채점 */
  const handleGradeobjectiveAnswer = (id: string | undefined, usersAnswer: string, correct_answer: string) => {
    if (usersAnswer === correct_answer) {
      checkRightAnswer(id);
    } else {
      checkWrongAnswer(id);
    }
  };

  const checkRightAnswer = (id: string | undefined) => {
    questions = questions.map((question) => (question.id === id ? { ...question, is_correct: true } : question));
  };

  const checkWrongAnswer = (id: string | undefined) => {
    questions = questions.map((question) => (question.id === id ? { ...question, is_correct: false } : question));
  };

  const handleResultMode = () => {
    let questionsHasNotAnswer = false;

    if (!resultMode) {
      // 풀기 모드에서 제출하기 버튼을 눌렀을 때
      console.log(questions);
      for (const question of questions) {
        // 모든 문제에 답이 제출됐는지 확인
        if (!question.hasOwnProperty('is_correct')) {
          questionsHasNotAnswer = true; // 답이 없다면 true
          break;
        }
      }

      if (questionsHasNotAnswer) {
        toast.warn('모든 문제를 풀어줘!');
      } else {
        let countCorrect = 0;

        for (const question of questions) {
          if (question.is_correct) countCorrect++;
        }
        setResultMode(true);
        setScore(countCorrect);
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

  return (
    <>
      <Header level={level} title={title} />
      <main className="grid grid-cols-[10%_90%]">
        <article className="bg-bgColor1 text-pointColor1 border-solid border-r-2 border-pointColor1">
          <section>
            <Image
              src={`https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/quiz-thumbnails/${url}`}
              alt="샘플 이미지"
              width={144}
              height={144}
              className="w-full h-[144px] object-cover border-solid border-b-2 border-pointColor1"
            />
            <section className="p-4 flex flex-col gap-4 border-solid border-b-2 border-pointColor1">
              <div>
                <h4>작성자</h4>
                <p>{creator_id}</p>
              </div>
              <div>
                <h4>등록일</h4>
                <p>{formatToLocaleDateTimeString(created_at)}</p>
              </div>
            </section>
          </section>
          <p className="p-4">{info}</p>
        </article>
        <article className="py-8 flex flex-col place-items-center gap-10">
          {resultMode && (
            <h1>
              🎉 {questions.length}개 중에 {score}개 맞았습니다! 🎉
            </h1>
          )}
          {questions.map((question) => {
            const { id, title, type, img_url, correct_answer } = question;
            return (
              <section key={id} className="w-[570px] flex flex-col place-items-center gap-4">
                <h3 className="self-start text-lg">{`${questions.indexOf(question) + 1}. ${title}`}</h3>
                <Image
                  src={`https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/question-imgs/${img_url}`}
                  alt="문제 이미지"
                  width={570}
                  height={200}
                  className="h-[200px] object-cover rounded-md"
                />
                {type === QuestionType.objective ? (
                  <Options id={id} onChange={handleGradeSubjectiveAnswer} />
                ) : (
                  <div className="w-full relative">
                    <input
                      type="text"
                      className="w-full pl-4 py-[9px] border-solid border border-pointColor1 rounded-md"
                      onChange={(e) => {
                        handleMaxLength(e, 25);
                        handleGradeobjectiveAnswer(id, e.target.value, correct_answer);
                      }}
                    />
                    <p className="absolute top-0 right-2 pt-3 pr-1 text-sm">0/25</p>
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
        </article>
      </main>
    </>
  );
};

export default QuizTryPage;
