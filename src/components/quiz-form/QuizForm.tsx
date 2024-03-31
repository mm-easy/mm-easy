'use client';

import { useRef, useState } from 'react';
import QuestionForm from './QuestionForm';

const QuizForm = () => {
  const [selectedImg, setSelectedImg] = useState('https://via.placeholder.com/300x200');
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

  return (
    <main className="bg-rose-100 p-5">
      <form className="flex flex-col">
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <select>
              <option>난이도를 선택하세요.</option>
              <option>꼬마급</option>
              <option>똑똑이급</option>
              <option>대장급</option>
            </select>
            <input placeholder="title " />
            <textarea placeholder="description" />
          </div>
          <div onClick={handleImgClick}>
            <img src={selectedImg} alt="샘플이미지" style={{ cursor: 'pointer' }} width={300} height={200} />
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
          <button>취소하기</button>
          <button>등록하기</button>
        </div>
      </form>
    </main>
  );
};

export default QuizForm;
