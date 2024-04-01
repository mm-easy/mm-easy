'use client';

import { Option, Question, QuestionType } from '@/types/quizzes';
import Image from 'next/image';

const QuestionForm = ({ question }: { question: Question }) => {
  const { id, type, title, options } = question;
  // const handleQuestionType = (id: string, type: QuestionType) => {
  //   const newQuestions = questions.map((prev) => {
  //     return prev.id === id ? { ...prev, type: type } : prev;
  //   });

  //   setQuestions(newQuestions);
  // };

  return (
    <>
      <article style={{ border: '1px solid red', margin: '10px', padding: '10px' }}>
        <section>
          <div>
            <input
              type="radio"
              id="objective"
              name="question-type"
              value="objective"
              defaultChecked
              // onChange={() => handleQuestionType(id, QuestionType.objective)}
            />
            <label htmlFor="objective">객관식</label>
          </div>
          <div>
            <input
              type="radio"
              id="subjective"
              name="question-type"
              value="subjective"
              // onChange={() => handleQuestionType(id, QuestionType.subjective)}
            />
            <label htmlFor="subjective">주관식</label>
          </div>
          {/* <section>
                {options.map((option) => {
                  console.log(option);
                  return <div key={option}>hi</div>;
                })}
              </section> */}
        </section>
        {/* <div>
          <input
            type="radio"
            id="objective"
            name="question-type"
            value="objective"
            defaultChecked
            onChange={(id) => {
              const newQuestion = questions.map((question) => {
                return question.id === id ? { ...question, type: QuestionForm.objective } : question;
              });
            }}
          />
          <label htmlFor="objective">객관식</label>
        </div>
        <div>
          <input
            type="radio"
            id="subjective"
            name="question-type"
            value="subjective"
            onChange={() => setQuestions({ ...questions, type: QuestionType.subjective })}
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
        </section> */}
      </article>
    </>
  );
};

export default QuestionForm;
