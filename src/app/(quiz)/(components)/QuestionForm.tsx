'use client';

import Image from 'next/image';
import { Dispatch, useRef } from 'react';
import { toast } from 'react-toastify';
import { SetStateAction } from 'jotai';
import checkboxImg from '@/assets/checkbox.png';

import { type Option, type Question, QuestionType } from '@/types/quizzes';
import SelectQuestionType from './SelectQuestionType';

const QuestionForm = ({
  questions,
  setQuestions
}: {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}) => {
  /** 문제 타입 바꾸기 버튼 핸들러 */
  const handleChangeType = (id: string | undefined, type: QuestionType) => {
    setQuestions((prev) =>
      prev.map((question) => {
        return question.id === id ? { ...question, type } : question;
      })
    );
  };

  /** 문제 타이틀 입력 핸들러 */
  const handleChangeTitle = (id: string | undefined, title: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        return question.id === id ? { ...question, title } : question;
      })
    );
  };

  /** 선택지 추가 핸들러 */
  const handleAddOption = (id: string | undefined, options: Option[]) => {
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

  /** 선택지 입력 핸들러 */
  const handleChangeOption = (id: string | undefined, content: string, options: Option[], optionId: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        return question.id === id
          ? {
              ...question,
              options: options.map((option) => {
                return option.id === optionId ? { ...option, content } : option;
              })
            }
          : question;
      })
    );
  };

  /** 선택지 삭제 핸들러 */
  const handleDeleteOption = (id: string | undefined, options: Option[], optionId: string) => {
    if (options.length > 2) {
      setQuestions((prev) =>
        prev.map((question) => {
          return question.id === id
            ? { ...question, options: options.filter((option) => option.id !== optionId) }
            : question;
        })
      );
    } else {
      toast.warn('최소 2개의 선택지가 있어야 합니다.');
    }
  };

  /** 객관식 정답 체크 핸들러 */
  const handleCheckObjectAnswer = (id: string | undefined, options: Option[], optionId: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        return question.id === id
          ? {
              ...question,
              options: options.map((option) => {
                return option.id === optionId ? { ...option, isAnswer: true } : { ...option, isAnswer: false };
              })
            }
          : question;
      })
    );
  };

  /** 주관식 정답 입력 핸들러 */
  const handleChangeCorrectAnswer = (id: string | undefined, correctAnswer: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        return question.id === id ? { ...question, correctAnswer } : question;
      })
    );
  };

  /** 이미지 첨부 핸들러 */
  const handleChangeImg = (id: string | undefined, files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      const img_url = URL.createObjectURL(file);
      setQuestions((prev) =>
        prev.map((question) => {
          return question.id === id ? { ...question, img_url } : question;
        })
      );
    }
  };

  /** 문제 삭제하기 버튼 핸들러 */
  const handleDeleteQuestion = (id: string | undefined) => {
    if (questions.length > 1) {
      if (!window.confirm(`해당 문제를 삭제하시겠습니까? ${id}`)) return;
      setQuestions((prev) => {
        const newQuestions = prev.filter((question) => question.id !== id);
        return newQuestions;
      });
    } else {
      toast.warn('최소 1개의 문제가 있어야 합니다.');
    }
  };

  return (
    <main className="py-8 text-pointColor1">
      {questions.map((question) => {
        const { id, type, options, img_url } = question;
        return (
          /** 유형, 휴지통 섹션 */
          <article key={id} className="w-[570px] mx-auto pb-12 flex flex-col gap-4">
            <section className="w-full flex justify-between text-md">
              <section>
                <SelectQuestionType
                  id={id}
                  defaultChecked={true}
                  onChange={handleChangeType}
                  type={QuestionType.objective}
                  title="선택형"
                />
                <SelectQuestionType
                  id={id}
                  defaultChecked={false}
                  onChange={handleChangeType}
                  type={QuestionType.subjective}
                  title="주관형"
                />
              </section>
              <button type="button" className="text-xl" onClick={() => handleDeleteQuestion(id)}>
                ✕
              </button>
            </section>
            {/* 이미지, input 섹션 */}
            <section>
              {type === QuestionType.objective ? (
                <div className="flex flex-col place-items-center gap-4">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border-solid border border-pointColor1 rounded-md"
                    placeholder="문제를 입력해 주세요. ex)Apple의 한국어 뜻으로 알맞은 것은?"
                    onChange={(e) => {
                      handleChangeTitle(id, e.target.value);
                    }}
                  />
                  <div className="w-full h-40 border-solid border border-pointColor1 rounded-md">
                    <input
                      type="file"
                      id={`file-input-${id}`}
                      onChange={(e) => {
                        e.preventDefault();
                        handleChangeImg(id, e.target.files);
                      }}
                      className="hidden"
                    />
                    <label htmlFor={`file-input-${id}`} className="">
                      <Image
                        src={img_url}
                        alt="문항 이미지"
                        className="w-full h-full object-cover rounded-md cursor-pointer"
                        width={570}
                        height={160}
                      />
                    </label>
                  </div>
                  {options.map((option) => {
                    return (
                      <div key={option.id} className="w-full flex place-items-center justify-between">
                        <input
                          type="checkbox"
                          checked={option.isAnswer}
                          className="w-11 h-11 appearance-none border-solid border border-pointColor1 rounded-md checked:bg-pointColor1 checked:bg-[url('https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/assets/checkbox.png')] bg-md bg-no-repeat bg-center"
                          onChange={() => {
                            handleCheckObjectAnswer(id, options, option.id);
                          }}
                        />
                        <input
                          type="text"
                          className="w-4/5 px-4 py-[9px] border-solid border border-pointColor1 rounded-md"
                          placeholder="선택지를 입력해 주세요."
                          onChange={(e) => {
                            e.preventDefault();
                            handleChangeOption(id, e.target.value, options, option.id);
                          }}
                        />
                        <button
                          type="button"
                          className="w-11 h-11 text-2xl text-pointColor1 bg-white border-solid border border-pointColor1 rounded-md"
                          onClick={() => handleDeleteOption(id, options, option.id)}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    className="w-full pb-[6px] text-3xl border-solid border border-pointColor1 rounded-md"
                    onClick={() => handleAddOption(id, options)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <div className="flex flex-col place-items-center gap-4">
                  <div className="w-40 h-40">
                    <input
                      type="file"
                      id={`fileInput${id}`}
                      onChange={(e) => {
                        e.preventDefault();
                        handleChangeImg(id, e.target.files);
                      }}
                      className="hidden"
                    />
                    <label htmlFor={`file-input-${id}`} className="cursor-pointer">
                      <Image
                        src={img_url}
                        alt="문항 이미지"
                        className="w-full h-full object-cover cursor-pointer"
                        width={200}
                        height={200}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    className="w-[500px] px-4 py-2 border-solid border border-pointColor1"
                    placeholder="문제를 입력해 주세요. ex)Apple의 한국어 뜻으로 알맞은 것은?"
                    onChange={(e) => {
                      e.preventDefault();
                      handleChangeTitle(id, e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    className="w-[500px] px-4 py-2 border-solid border border-pointColor1"
                    placeholder="정답을 입력해 주세요."
                    onChange={(e) => {
                      e.preventDefault();
                      handleChangeCorrectAnswer(id, e.target.value);
                    }}
                  />
                </div>
              )}
            </section>
          </article>
        );
      })}
    </main>
  );
};

export default QuestionForm;
