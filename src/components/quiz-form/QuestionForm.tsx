'use client';

import { Option, Question } from '@/types/quizzes';
import Image from 'next/image';
import { Dispatch, useState } from 'react';

type QuestionFormType = {
  questions: Question[];
  setQuestions: Dispatch<Question[]>;
  options: Option[];
  setOptions: Dispatch<Option[]>;
};

const QuestionForm = ({ questions, setQuestions, options, setOptions }: QuestionFormType) => {
  // const [questionType, setQuestionType] = useState('objective');
  // console.log(questionType);
  console.log('questions', questions);
  const { id, quizId, type, title } = questions;

  return (
    <>
      <h1>QuestionForm</h1> {/*지울 예정*/}
      <article style={{ border: '1px solid red', margin: '10px', padding: '10px' }}>
        <div>
          <input
            type="radio"
            id="objective"
            name="question-type"
            value="objective"
            defaultChecked
            // onChange={() => setQuestions(() => 'objective')}
          />
          <label htmlFor="objective">객관식</label>
        </div>
        <div>
          <input
            type="radio"
            id="subjective"
            name="question-type"
            value="subjective"
            // onChange={() => setQuestions('subjective')}
          />
          <label htmlFor="subjective">주관식</label>
        </div>
        <section>
          {type === 'objective' ? (
            <div>
              <Image src="https://via.placeholder.com/200x150" alt="fake image" width={200} height={150} />
              <input
                type="text"
                style={{ width: '500px' }}
                placeholder="문제를 입력해 주세요. ex)Apple의 한국어 뜻으로 알맞은 것은?"
              />
              <section style={{ display: 'flex', flexDirection: 'column' }}>
                <input type="text" style={{ width: '500px' }} placeholder="선택지를 입력해 주세요. ex)사과" />
                <input type="text" style={{ width: '500px' }} placeholder="선택지를 입력해 주세요. ex)포도" />
              </section>
            </div>
          ) : (
            <div>
              <Image src="https://via.placeholder.com/200x150" alt="fake image" width={200} height={150} />
              <input
                type="text"
                style={{ width: '500px' }}
                placeholder="문제를 입력해 주세요. ex)Apple의 한국어 뜻을 작성해 주세요."
              />
            </div>
          )}
        </section>
      </article>
    </>
  );
};

export default QuestionForm;
