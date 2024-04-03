'use client';

import QuestionForm from './QuestionForm';
import Image from 'next/image';
import PlusQuestionBtn from './PlusQuestionBtn';
import PageUpBtn from '@/components/common/PageUpBtn';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertQuizToTable, uploadThumbnailToStorage } from '@/api/quizzes';
import { toast } from 'react-toastify';

import { QuestionType, type Question, type Quiz } from '@/types/quizzes';
import { BlueInput, BlueLevelSelect, BlueTextArea } from '@/components/common/BlueInput';
import { generateFileName } from '@/utils/generateFileName';

const QuizForm = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [selectedImg, setSelectedImg] = useState('https://via.placeholder.com/240x240');
  const [file, setFile] = useState<File | null>(null);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: crypto.randomUUID(),
      type: QuestionType.objective,
      title: '',
      options: [
        {
          id: crypto.randomUUID(),
          content: '',
          isAnswer: false
        },
        {
          id: crypto.randomUUID(),
          content: '',
          isAnswer: false
        }
      ],
      imgUrl: 'https://via.placeholder.com/200x200',
      correctAnswer: ''
    },
    {
      id: crypto.randomUUID(),
      type: QuestionType.objective,
      title: '',
      options: [
        {
          id: crypto.randomUUID(),
          content: '',
          isAnswer: false
        },
        {
          id: crypto.randomUUID(),
          content: '',
          isAnswer: false
        }
      ],
      imgUrl: 'https://via.placeholder.com/200x200',
      correctAnswer: ''
    },
    {
      id: crypto.randomUUID(),
      type: QuestionType.objective,
      title: '',
      options: [
        {
          id: crypto.randomUUID(),
          content: '',
          isAnswer: false
        },
        {
          id: crypto.randomUUID(),
          content: '',
          isAnswer: false
        }
      ],
      imgUrl: 'https://via.placeholder.com/200x200',
      correctAnswer: ''
    }
  ]);

  // console.log('1', questions[0].options);
  // console.log('2', questions[1].options);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  /** 스크롤 이동 추적 */
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  /** 썸네일 이미지 클릭하여 이미지 파일 첨부하기*/
  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /** 취소 버튼 클릭 핸들러 */
  const handleCancelBtn = () => {
    if (!window.confirm('작성하던 내용이 모두 사라집니다. 취소하시겠습니까?')) return;
    router.push('/quiz-list');
  };

  /** 문제 추가하기 버튼 클릭 핸들러 */
  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          id: crypto.randomUUID(),
          type: QuestionType.objective,
          title: '',
          options: [
            {
              id: crypto.randomUUID(),
              content: '',
              isAnswer: false
            },
            {
              id: crypto.randomUUID(),
              content: '',
              isAnswer: false
            }
          ],
          imgUrl: 'https://via.placeholder.com/200x200',
          correctAnswer: ''
        }
      ]);
    } else {
      alert('최대 5개까지만 문제를 추가할 수 있습니다.');
      return;
    }
  };

  /** 퀴즈 등록 mutation */
  const insertQuizMutation = useMutation({
    mutationFn: (newQuiz: Quiz) => insertQuizToTable(newQuiz)
  });

  /** 등록 버튼 클릭 핸들러(임시) */
  const handleSubmitBtn = () => {
    console.log('입력된 값들', questions);
  };

  /** 등록 버튼 클릭 핸들러 */
  // const handleSubmitBtn = async () => {
  //   if (!level) {
  //     alert('난이도를 선택해주세요.');
  //     return;
  //   }
  //   if (!title || !info) {
  //     alert('제목과 설명을 입력해주세요.');
  //     return;
  //   }

  //   try {
  //     let imgUrl = null;
  //     if (file) {
  //       const fileName = generateFileName(file);
  //       imgUrl = await uploadThumbnailToStorage(file, fileName);
  //       console.log('스토리지에 이미지 업로드 성공', imgUrl);
  //     }

  //     const newQuiz = {
  //       creator_id: 'cocoa@naver.com',
  //       level,
  //       title,
  //       info,
  //       thumbnail_img_url: imgUrl || 'https://via.placeholder.com/200x200'
  //     };

  //     insertQuizMutation.mutate(newQuiz, {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries({ queryKey: ['quizzes'] });
  //         toast.success('퀴즈가 등록되었습니다.');
  //         router.replace('/quiz-list');
  //       }
  //     });
  //   } catch (error) {
  //     console.log('스토리지에 이미지 업로드 중 에러 발생');
  //   }
  // };

  return (
    <main className="bg-blue-50 flex gap-5 flex-col justify-center items-center">
      <form
        className="flex flex-col min-w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitBtn();
        }}
      >
        <div className="p-10 flex gap-10 bg-white justify-center items-center">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-pointColor1">썸네일 이미지</p>
            <div
              onClick={handleImgClick}
              className="bg-gray-200 w-60 h-60 border-solid border border-pointColor1 flex items-center"
            >
              <Image
                src={selectedImg}
                alt="샘플이미지"
                className="object-cover"
                style={{ cursor: 'pointer' }}
                width={240}
                height={240}
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
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-pointColor1">난이도</p>
              <BlueLevelSelect value={level} onChange={(value) => setLevel(value)} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-pointColor1">퀴즈 제목</p>
              <BlueInput value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-pointColor1">퀴즈 설명</p>
              <BlueTextArea value={info} onChange={(e) => setInfo(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <QuestionForm questions={questions} setQuestions={setQuestions} />
        </div>
        <PlusQuestionBtn onClick={handleAddQuestion} />
        <div className="flex gap-2">
          <button type="button" onClick={handleCancelBtn}>
            취소하기
          </button>
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
