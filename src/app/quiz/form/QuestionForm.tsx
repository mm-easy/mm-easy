'use client';

import { Dispatch, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SetStateAction } from 'jotai';
import { handleMaxLength } from '@/utils/handleMaxLength';
import { storageUrl } from '@/utils/supabase/storage';
import InputQuestionTitle from './InputQuestionTitle';
import InputQuestionImg from './InputQuestionImg';
import UnloadImgBtn from './UnloadImg';
import useMultilingual from '@/utils/useMultilingual';

import { type Option, type Question, QuestionType } from '@/types/quizzes';
import SelectQuestionType from './SelectQuestionType';

const QuestionForm = ({
  questions,
  setQuestions
}: {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}) => {
  const [loaded, setLoaded] = useState(false);
  const m = useMultilingual('quizEditor');

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
      toast.warn(m('ALERT_AT_MOST_5OPTION'));
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
      toast.warn(m('ALERT_AT_LEAST_2OPTION'));
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
      if (!window.confirm(m('ALERT_DELETE_QUESTION'))) return;
      setQuestions((prev) => {
        const newQuestions = prev.filter((question) => question.id !== id);
        return newQuestions;
      });
    } else {
      toast.warn(m('ALERT_AT_LEAST_lQUESTION'));
    }
  };

  /** 첨부한 이미지 삭제하기 */
  const handleRemoveImg = (e: React.MouseEvent<HTMLSpanElement>, id: string | undefined) => {
    e.stopPropagation();
    setQuestions((prev) =>
      prev.map((question) => {
        return question.id === id
          ? { ...question, img_url: `${storageUrl}/assets/quiz_570x160.png`, img_file: null }
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
          <article key={id} className="sm:w-full sm:px-4 w-[570px] mx-auto pb-12 flex flex-col gap-4">
            <section className="w-full flex justify-between text-md">
              <section>
                <SelectQuestionType
                  id={id}
                  currentType={type}
                  defaultChecked={true}
                  onChange={handleChangeType}
                  type={QuestionType.objective}
                  title={m('QUIZ_TYPE_O')}
                />
                <SelectQuestionType
                  id={id}
                  currentType={type}
                  defaultChecked={false}
                  onChange={handleChangeType}
                  type={QuestionType.subjective}
                  title={m('QUIZ_TYPE_S')}
                />
              </section>
              <button type="button" className="text-xl" onClick={() => handleDeleteQuestion(id)}>
                ✕
              </button>
            </section>
            {/* 이미지, input 섹션 */}
            <section className="flex flex-col items-center gap-4">
              {type === QuestionType.objective ? (
                <>
                  <InputQuestionTitle id={id} value={title} onInput={handleMaxLength} onChange={handleChangeTitle} />
                  {loaded && (
                    <div className="relative w-full">
                      {img_url && <InputQuestionImg id={id} img_url={img_url} onChange={handleChangeImg} />}
                      {img_url === null && <InputQuestionImg id={id} img_url="" onChange={handleChangeImg} />}
                      {img_file && <UnloadImgBtn onClick={(e) => handleRemoveImg(e, id)} />}
                    </div>
                  )}
                  {options.map((option) => {
                    return (
                      <div key={option.id} className="w-full flex items-center justify-between sm:gap-2">
                        <input
                          type="checkbox"
                          checked={option.is_answer}
                          className="sm:w-12 sm:h-12 w-11 h-11 appearance-none border-solid border border-pointColor1 rounded-md checked:bg-pointColor1 checked:bg-[url('https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/assets/checkbox.png')] bg-md bg-no-repeat bg-center"
                          onChange={() => {
                            handleCheckObjectAnswer(id, options, option.id);
                          }}
                        />
                        <div className="sm:w-9/12 w-4/5 relative">
                          <input
                            type="text"
                            className="w-full h-11 sm:h-12 pl-4 sm:pr-16 py-[9px] text-blackColor border-solid border border-pointColor1 rounded-md"
                            placeholder={m('QUESTION_OPTION_EXAMPLE1')}
                            value={option.content}
                            onInput={(e) => {
                              handleMaxLength(e, 25);
                            }}
                            onChange={(e) => {
                              e.preventDefault();
                              handleChangeOption(id, e.target.value, options, option.id);
                            }}
                          />
                          <p className="absolute sm:top-1 top-0 right-2 pt-3 pr-1 text-sm">
                            {option.content.length} / 25
                          </p>
                        </div>
                        <button
                          type="button"
                          className="sm:w-12 sm:h-12 w-11 h-11 text-2xl text-pointColor1 bg-white border-solid border border-pointColor1 rounded-md"
                          onClick={() => handleDeleteOption(id, options, option.id)}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    className={`w-full sm:h-12 py-[3px] text-3xl border-solid border ${
                      options.length === 5 ? 'text-grayColor2 border-grayColor2 cursor-default' : 'border-pointColor1'
                    } rounded-md`}
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
                      className="sm:h-12 w-full sm:pr-16 px-4 py-2 text-blackColor border-solid border border-pointColor1 rounded-md"
                      placeholder={m('QUESTION_OPTION_EXAMPLE2')}
                      value={correct_answer}
                      onInput={(e) => {
                        handleMaxLength(e, 30);
                      }}
                      onChange={(e) => {
                        e.preventDefault();
                        handleChangeCorrectAnswer(id, e.target.value);
                      }}
                    />
                    <p className="absolute sm:top-1 top-0 right-2 pt-3 pr-1 text-sm">{correct_answer.length} / 30</p>
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
