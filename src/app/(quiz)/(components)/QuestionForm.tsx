'use client';

import Image from 'next/image';
import { Dispatch, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { SetStateAction } from 'jotai';

import { type Option, type Question, QuestionType } from '@/types/quizzes';
import { generateImgFileName } from '@/utils/generateFileName';

const QuestionForm = ({
  questions,
  setQuestions
}: {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}) => {
  const fileInputRef = useRef([]);
  // const fileInputRef = useRef<HTMLInputElement>(null);
  // const fileInput = document.getElementById(id)

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
        is_answer: false
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
                return option.id === optionId ? { ...option, is_answer: true } : { ...option, is_answer: false };
              })
            }
          : question;
      })
    );
  };

  /** 주관식 정답 입력 핸들러 */
  const handleChangeCorrectAnswer = (id: string | undefined, correct_answer: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        return question.id === id ? { ...question, correct_answer } : question;
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
          return question.id === id ? { ...question, img_url, img_file: file } : question;
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
    <article className="pb-12 flex flex-col place-items-center gap-12">
      {questions.map((question) => {
        const { id, type, options, img_url } = question;
        return (
          /** 유형, 휴지통 섹션 */
          <section key={id}>
            <section className="flex justify-between">
              <section className="w-[45vw]">
                <label className="pr-4">
                  <input
                    type="radio"
                    name={id}
                    defaultChecked
                    className="mr-2"
                    onChange={() => handleChangeType(id, QuestionType.objective)}
                  />
                  객관식
                </label>
                <label>
                  <input
                    type="radio"
                    name={id}
                    className="mr-2"
                    onChange={() => handleChangeType(id, QuestionType.subjective)}
                  />
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
                <div className="flex flex-col place-items-center gap-4">
                  <div className="w-40 h-40">
                    <input
                      type="file"
                      id={`file-input-${id}`}
                      onChange={(e) => {
                        e.preventDefault();
                        handleChangeImg(id, e.target.files);
                      }}
                      className="hidden"
                    />
                    <label htmlFor={`file-input-${id}`}>
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
                    className="w-[500px] px-4 py-2 font-bold border-solid border border-pointColor1"
                    placeholder="문제를 입력해 주세요. ex)Apple의 한국어 뜻으로 알맞은 것은?"
                    onChange={(e) => {
                      handleChangeTitle(id, e.target.value);
                    }}
                  />
                  {options.map((option) => {
                    return (
                      <div key={option.id} className="flex place-items-center gap-3">
                        <input
                          type="checkbox"
                          className="w-[42px] h-[42px]"
                          checked={option.is_answer}
                          onChange={() => {
                            handleCheckObjectAnswer(id, options, option.id);
                          }}
                        />
                        <input
                          type="text"
                          className="w-[500px] px-4 py-2 border-solid border border-pointColor1"
                          placeholder="선택지를 입력해 주세요."
                          onChange={(e) => {
                            e.preventDefault();
                            handleChangeOption(id, e.target.value, options, option.id);
                          }}
                        />
                        <button
                          type="button"
                          className="w-[42px] h-[42px] text-2xl text-white bg-pointColor1"
                          onClick={() => handleDeleteOption(id, options, option.id)}
                        >
                          -
                        </button>
                      </div>
                    );
                  })}
                  <button type="button" onClick={() => handleAddOption(id, options)}>
                    ➕
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
                    className="w-[500px] px-4 py-2 font-bold border-solid border border-pointColor1"
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
          </section>
        );
      })}
    </article>
  );
};

export default QuestionForm;
