'use client';

import Image from 'next/image';
import { Dispatch, FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { SetStateAction } from 'jotai';
import checkboxImg from '@/assets/checkbox.png';

import { type Option, type Question, QuestionType } from '@/types/quizzes';
import SelectQuestionType from './SelectQuestionType';
import InputQuestionTitle from './InputQuestionTitle';
import InputQuestionImg from './InputQuestionImg';
import { handleMaxLength } from '@/utils/handleMaxLength';
import UnloadImgBtn from './UnloadImg';
import { storageUrl } from '@/utils/supabase/storage';
import { BlueInput } from '@/components/common/BlueInput';

const QuestionForm = ({
  questions,
  setQuestions
}: {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

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

  /** 첨부한 이미지 삭제하기 */
  const handleRemoveImg = (e: React.MouseEvent<HTMLSpanElement>, id: string | undefined) => {
    e.stopPropagation();
    setQuestions((prev) =>
      prev.map((question) => {
        return question.id === id
          ? { ...question, img_url: `${storageUrl}/quiz-thumbnails/tempThumbnail.png`, img_file: null }
          : question;
      })
    );
  };

  return (
    <main className="pt-8 text-pointColor1">
      {questions.map((question) => {
        const { id, type, options, title, img_url, img_file, correct_answer } = question;
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
            <section className="flex flex-col place-items-center gap-4">
              {type === QuestionType.objective ? (
                <>
                  <InputQuestionTitle id={id} value={title} onInput={handleMaxLength} onChange={handleChangeTitle} />
                  {loaded && (
                    <div className="relative w-full">
                      <InputQuestionImg id={id} img_url={img_url} onChange={handleChangeImg} />
                      {img_file && <UnloadImgBtn onClick={(e) => handleRemoveImg(e, id)} />}
                    </div>
                  )}
                  {options.map((option) => {
                    return (
                      <div key={option.id} className="w-full flex place-items-center justify-between">
                        <input
                          type="checkbox"
                          checked={option.is_answer}
                          className="w-11 h-11 appearance-none border-solid border border-pointColor1 rounded-md checked:bg-pointColor1 checked:bg-[url('https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/assets/checkbox.png')] bg-md bg-no-repeat bg-center"
                          onChange={() => {
                            handleCheckObjectAnswer(id, options, option.id);
                          }}
                        />
                        <div className="w-4/5 relative">
                          <input
                            type="text"
                            className="w-full pl-4 py-[9px] text-blackColor border-solid border border-pointColor1 rounded-md"
                            placeholder="선택지를 입력해 주세요."
                            onInput={(e) => {
                              handleMaxLength(e, 25);
                            }}
                            onChange={(e) => {
                              e.preventDefault();
                              handleChangeOption(id, e.target.value, options, option.id);
                            }}
                          />
                          <p className="absolute top-0 right-2 pt-3 pr-1 text-sm">{option.content.length}/25</p>
                        </div>
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
                </>
              ) : (
                <>
                  <InputQuestionTitle id={id} value={title} onInput={handleMaxLength} onChange={handleChangeTitle} />
                  {loaded && <InputQuestionImg id={id} img_url={img_url} onChange={handleChangeImg} />}
                  <div className="w-full relative">
                    <input
                      type="text"
                      className="w-full px-4 py-2 text-blackColor border-solid border border-pointColor1 rounded-md"
                      placeholder="정답을 입력해 주세요."
                      onInput={(e) => {
                        handleMaxLength(e, 25);
                      }}
                      onChange={(e) => {
                        e.preventDefault();
                        handleChangeCorrectAnswer(id, e.target.value);
                      }}
                    />
                    <p className="absolute top-0 right-2 pt-3 pr-1 text-sm">{correct_answer.length}/25</p>
                  </div>
                </>
              )}
            </section>
          </article>
        );
      })}
    </main>
  );
};

export default QuestionForm;
