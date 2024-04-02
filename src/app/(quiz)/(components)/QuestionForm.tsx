'use client';

import { Question, QuestionType } from '@/types/quizzes';
import { SetStateAction } from 'jotai';
import Image from 'next/image';
import { Dispatch } from 'react';

const QuestionForm = ({
  questions,
  setQuestions
}: {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}) => {
  const handleQuestionType = (id: string, type: QuestionType) => {
    const newQuestions = questions.map((question) => {
      return question.id === id ? { ...question, type: type } : question;
    });

    setQuestions(newQuestions);
  };

  return (
    <>
      <article style={{ border: '1px solid red', margin: '10px', padding: '10px' }}>
        {questions.map((question) => {
          const { id, type, title, options } = question;
          return (
            <section key={id}>
              <div>
                <input
                  type="radio"
                  id="objective"
                  name="question-type"
                  value="objective"
                  defaultChecked
                  onChange={() => handleQuestionType(id, QuestionType.objective)}
                />
                <label htmlFor="objective">객관식</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="subjective"
                  name="question-type"
                  value="subjective"
                  onChange={() => handleQuestionType(id, QuestionType.subjective)}
                />
                <label htmlFor="subjective">주관식</label>
              </div>
              <section>
                {type === QuestionType.objective ? (
                  <div>
                    <Image src="https://via.placeholder.com/200x150" alt="fake image" width={200} height={150} />
                    <input
                      type="text"
                      style={{ width: '500px' }}
                      placeholder="문제를 입력해 주세요. ex)Apple의 한국어 뜻으로 알맞은 것은?"
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
                    />
                    <input type="text" style={{ width: '500px' }} placeholder="정답을 입력해 주세요." />
                  </div>
                )}
              </section>
            </section>
          );
        })}
      </article>
    </>
  );
};

export default QuestionForm;
