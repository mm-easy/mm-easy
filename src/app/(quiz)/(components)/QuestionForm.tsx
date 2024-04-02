'use client';

import { Option, Question, QuestionType } from '@/types/quizzes';
import { SetStateAction } from 'jotai';
import Image from 'next/image';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';

const QuestionForm = ({
  questions,
  setQuestions
}: {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}) => {
  /** 문제 타입 바꾸기 버튼 핸들러 */
  const handleChangeType = (id: string, type: QuestionType) => {
    setQuestions((prev) =>
      prev.map((question) => {
        return question.id === id ? { ...question, type } : question;
      })
    );
  };

  /** 문제 타이틀 입력 핸들러 */
  const handleChangeTitle = (id: string, title: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        return question.id === id ? { ...question, title } : question;
      })
    );
  };

  /** 문제 선택지 추가 핸들러 */
  const handleAddOption = (id: string, options: Option[]) => {
    if (options.length < 5) {
      const newOption = {
        id: crypto.randomUUID(),
        content: '',
        isAnswer: false
      };
      setQuestions((prev) =>
        prev.map((question) => {
          return question.id === id
            ? {
                ...question,
                options: [...options, newOption]
              }
            : question;
        })
      );
    } else {
      toast.warn('선택지는 5개까지 추가할 수 있습니다.');
    }
  };

  /** 문제 주관식 정답 입력 핸들러 */
  const handleChangeCorrectAnswer = (id: string, correctAnswer: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        return question.id === id ? { ...question, correctAnswer } : question;
      })
    );
  };

  /** 문제 삭제하기 버튼 핸들러 */
  const handleDeleteQuestion = (id: string) => {
    if (questions.length > 1) {
      if (!window.confirm(`해당 문제를 삭제하시겠습니까? ${id}`)) return;
      setQuestions((prev) => {
        const newQuestions = prev.filter((question) => question.id !== id);
        return newQuestions;
      });
    } else {
      alert('최소 1개의 문제는 있어야 합니다.');
      return;
    }
  };

  return (
    <>
      <article style={{ border: '1px solid red', margin: '10px', padding: '10px' }}>
        {questions.map((question) => {
          const { id, type, options } = question;
          return (
            /** 유형, 휴지통 섹션 */
            <section key={id}>
              <section style={{ display: 'flex', justifyContent: 'space-between' }}>
                <section>
                  <label>
                    <input
                      type="radio"
                      name={id}
                      defaultChecked
                      onChange={() => handleChangeType(id, QuestionType.objective)}
                    />
                    객관식
                  </label>
                  <label>
                    <input type="radio" name={id} onChange={() => handleChangeType(id, QuestionType.subjective)} />
                    주관식
                  </label>
                </section>
                <button type="button" onClick={() => handleDeleteQuestion(id)}>
                  🗑️
                </button>
              </section>
              {/* 이미지, input 섹션 */}
              <section>
                {type === QuestionType.objective ? (
                  <div>
                    <Image src="https://via.placeholder.com/200x150" alt="fake image" width={200} height={150} />
                    <input
                      type="text"
                      style={{ width: '500px' }}
                      placeholder="문제를 입력해 주세요. ex)Apple의 한국어 뜻으로 알맞은 것은?"
                      onChange={(e) => {
                        e.preventDefault();
                        handleChangeTitle(id, e.target.value);
                      }}
                    />
                    {options.map((option) => {
                      return (
                        <div key={option.id}>
                          <input type="text" style={{ width: '500px' }} placeholder="선택지를 입력해 주세요." />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Image src="https://via.placeholder.com/200x150" alt="fake image" width={200} height={150} />
                    <input
                      type="text"
                      style={{ width: '500px' }}
                      placeholder="문제를 입력해 주세요. ex)Apple의 한국어 뜻으로 알맞은 것은?"
                      onChange={(e) => {
                        e.preventDefault();
                        handleChangeTitle(id, e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      style={{ width: '500px' }}
                      placeholder="정답을 입력해 주세요."
                      onChange={(e) => {
                        e.preventDefault();
                        handleChangeCorrectAnswer(id, e.target.value);
                      }}
                    />
                  </div>
                )}
                <button type="button" onClick={() => handleAddOption(id, options)}>
                  ➕
                </button>
              </section>
            </section>
          );
        })}
      </article>
    </>
  );
};

export default QuestionForm;
