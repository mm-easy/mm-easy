'use client';

import QuestionForm from './QuestionForm';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import type { Option, Question, Quiz } from '@/types/quizzes';
import PageUpBtn from '../../../components/common/PageUpBtn';

const QuizForm = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const [level, setLevel] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImg, setSelectedImg] = useState('https://via.placeholder.com/288x208');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  /** 썸네일 이미지 클릭 이벤트 */
  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

  /** 썸네일 이미지 클릭하여 이미지 파일 첨부하기 */
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /** 등록 버튼 클릭 핸들러 */
  const handleSubmitBtn = () => {
    if (!level) {
      alert('난이도를 선택해주세요.');
      return;
    }
    if (!title || !description) {
      alert('제목과 설명을 입력해주세요.');
      return;
    }

    const newQuiz = {
      level,
      title,
      description,
      selectedImg
    };
    console.log('등록될 게시글', newQuiz);
  };

  return (
    <main className="bg-rose-100 p-5 flex gap-5 h-[2000px]">
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitBtn();
        }}
      >
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <select value={level} onChange={(e) => setLevel(+e.target.value)}>
              <option value={0}>난이도를 선택하세요.</option>
              <option value={1}>꼬마급</option>
              <option value={2}>똑똑이급</option>
              <option value={3}>대장급</option>
            </select>
            <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div
            onClick={handleImgClick}
            className="bg-gray-200 w-72 min-h-52 border-solid border-2 border-indigo-600 flex items-center"
          >
            <Image
              src={selectedImg}
              alt="샘플이미지"
              className="object-cover"
              style={{ cursor: 'pointer' }}
              width={288}
              height={208}
            />
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              onChange={handleImgChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="">
          <QuestionForm questions={questions} setQuestions={setQuestions} options={options} setOptions={setOptions} />
        </div>
        <div className="flex gap-2">
          <button type="button">취소하기</button>
          <button type="submit">등록하기</button>
        </div>
      </form>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px;' }}>
        <PageUpBtn scrollPosition={scrollPosition} />
      </div>
    </main>
  );
};

export default QuizForm;
