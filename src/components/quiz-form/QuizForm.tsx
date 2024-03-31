'use client';

import { useRef, useState } from 'react';
import QuestionForm from './QuestionForm';
import Image from 'next/image';

const QuizForm = () => {
  const [level, setLevel] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImg, setSelectedImg] = useState('https://via.placeholder.com/288x208');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

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
    <main className="bg-rose-100 p-5">
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
        <QuestionForm />
        <div className="flex gap-2">
          <button type="button">취소하기</button>
          <button type="submit">등록하기</button>
        </div>
      </form>
    </main>
  );
};

export default QuizForm;
