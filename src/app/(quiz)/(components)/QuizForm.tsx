'use client';

import QuestionForm from './QuestionForm';
import Image from 'next/image';
import PlusQuestionBtn from './PlusQuestionBtn';
import PageUpBtn from '@/components/common/PageUpBtn';
import useConfirmPageLeave from '@/hooks/useConfirmPageLeave';
import UnloadImgBtn from './UnloadImg';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { BlueInput, BlueLevelSelect } from '@/components/common/BlueInput';
import { CancelButton, SubmitButton } from '@/components/common/FormButtons';
import { generateFileName, generateImgFileName } from '@/utils/generateFileName';
import { uploadImageToStorage, uploadThumbnailToStorage } from '@/api/quizzes';
import { useSubmitOptions, useSubmitQuestions, useSubmitQuiz } from '../mutations';
import { toast } from 'react-toastify';
import { storageUrl } from '@/utils/supabase/storage';
import { handleMaxLength } from '@/utils/handleMaxLength';

import { QuestionType, type Question } from '@/types/quizzes';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase/supabase';

const QuizForm = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [selectedImg, setSelectedImg] = useState(`${storageUrl}/quiz-thumbnails/tempThumbnail.png`);
  const [file, setFile] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useState('');
  const { getCurrentUserProfile } = useAuth();

  useConfirmPageLeave();

  /** 로그인한 유저의 정보를 불러옴 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) return;
        const userProfile = await getCurrentUserProfile();
        if (!userProfile) return;
        setCurrentUser(userProfile.email);
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  /** 퀴즈 등록 mutation */
  const insertQuizMutation = useSubmitQuiz();
  const insertQuestionsMutation = useSubmitQuestions();
  const insertOptionsMutation = useSubmitOptions();

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: crypto.randomUUID(),
      type: QuestionType.objective,
      title: '',
      img_file: null,
      img_url: `${storageUrl}/quiz-thumbnails/tempThumbnail.png`,
      correct_answer: '',
      options: [
        {
          id: crypto.randomUUID(),
          content: '',
          is_answer: false
        },
        {
          id: crypto.randomUUID(),
          content: '',
          is_answer: false
        }
      ]
    },
    {
      id: crypto.randomUUID(),
      type: QuestionType.objective,
      title: '',
      img_file: null,
      img_url: `${storageUrl}/quiz-thumbnails/tempThumbnail.png`,
      correct_answer: '',
      options: [
        {
          id: crypto.randomUUID(),
          content: '',
          is_answer: false
        },
        {
          id: crypto.randomUUID(),
          content: '',
          is_answer: false
        }
      ]
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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
  const handleClickImg = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              is_answer: false
            },
            {
              id: crypto.randomUUID(),
              content: '',
              is_answer: false
            }
          ],
          img_file: null,
          img_url: `${storageUrl}/quiz-thumbnails/tempThumbnail.png`,
          correct_answer: ''
        }
      ]);
    } else {
      toast.warning('최대 5개까지만 문제를 추가할 수 있습니다.');
      return;
    }
  };

  /** 등록 버튼 클릭 핸들러 */
  const handleSubmitBtn = async () => {
    if (!level) {
      toast.warn('난이도를 선택해 주세요.');
      return;
    }
    if (!title || !info) {
      toast.warn('제목과 설명을 입력해 주세요.');
      return;
    }

    for (const question of questions) {
      const { title, type, correct_answer, options } = question;
      const allAnswersAarFalse = options.every((option) => option.is_answer === false);

      if (!title) {
        toast.warn('제목을 입력해 주세요.');
        return;
      }
      if (type === QuestionType.objective) {
        for (const option of options) {
          const { content } = option;
          if (!content) {
            toast.warn('선택지를 입력해 주세요.');
            return;
          }
        }
        if (allAnswersAarFalse) {
          toast.warn('정답을 선택해 주세요.');
          return;
        }
      } else {
        if (!correct_answer) {
          toast.warn('정답을 입력해 주세요.');
          return;
        }
      }
    }

    // 퀴즈 썸네일 이미지를 스토리지에 업로드
    try {
      let imgUrl = null;
      if (file) {
        const fileName = generateFileName(file);
        imgUrl = await uploadThumbnailToStorage(file, fileName);
        console.log('스토리지에 이미지 업로드 성공', imgUrl);
      }

      // newQuiz 구성하여 quizzes 테이블에 인서트
      const newQuiz = {
        creator_id: currentUser,
        level,
        title,
        info,
        thumbnail_img_url: imgUrl || 'tempThumbnail.png'
      };

      const insertQuizResult = await insertQuizMutation.mutateAsync(newQuiz);

      // questions 요소 하나씩 돌아가며 데이터 처리
      questions.forEach(async (question) => {
        // 첨부 이미지 있는 경우 스토리지에 업로드, 없는 경우 null
        const { id, title, type, img_file, correct_answer, options } = question;
        let img_url = null;
        if (img_file) {
          const formattedName = generateImgFileName(img_file, id);
          img_url = await uploadImageToStorage(img_file, formattedName);
        }

        // newQuestion 구성하여 questions 테이블에 인서트
        const newQuestion = {
          quiz_id: insertQuizResult as string,
          title: title,
          type: type,
          correct_answer: correct_answer,
          img_url: img_url || 'tempThumbnail.png'
        };

        // newOptions 구성하여 question_options 테이블에 인서트
        const insertQuestionResult = await insertQuestionsMutation.mutateAsync(newQuestion);
        const newOptions = options.map((option) => ({
          content: option.content,
          is_answer: option.is_answer,
          question_id: insertQuestionResult
        }));
        await insertOptionsMutation.mutateAsync(newOptions);
        router.replace('/quiz-list');
      });
    } catch (error) {
      console.log('퀴즈 생성 중 에러 발생');
    }
  };

  /** 첨부한 이미지 삭제하기 */
  const handleRemoveImg = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setFile(null);
    setSelectedImg(`${storageUrl}/quiz-thumbnails/tempThumbnail.png`);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <main className="bg-blue-50 flex gap-5 flex-col justify-center items-center">
      <form className="flex flex-col min-w-full" onSubmit={(e) => e.preventDefault()}>
        <div className="p-10 flex flex-col gap-4 bg-bgColor1 justify-center items-center border-solid border-b-2 border-pointColor1">
          <div className="flex gap-10">
            <div
              onClick={handleClickImg}
              className="relative bg-gray-200 w-36 h-36 border-solid border border-pointColor1 rounded-md overflow-hidden"
            >
              <Image
                src={selectedImg}
                alt="샘플이미지"
                width={144}
                height={144}
                className="w-full h-full object-cover cursor-pointer"
              />
              {file && <UnloadImgBtn onClick={handleRemoveImg} />}
              <input type="file" id="fileInput" ref={fileInputRef} className="hidden" onChange={handleChangeImg} />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-pointColor1">난이도</p>
                <BlueLevelSelect value={level} onChange={(value) => setLevel(value)} />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-pointColor1">퀴즈 제목</p>
                <BlueInput
                  value={title}
                  width="w-[385px]"
                  maxNum={15}
                  onInput={(e) => handleMaxLength(e, 15)}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-auto">
            <p className="text-xs text-pointColor1">퀴즈 설명</p>
            <BlueInput
              value={info}
              width="w-[570px]"
              maxNum={30}
              onInput={(e) => handleMaxLength(e, 30)}
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
        </div>
        <QuestionForm questions={questions} setQuestions={setQuestions} />
        <PlusQuestionBtn onClick={handleAddQuestion} />
        <div className="bg-bgColor1 flex items-center justify-center pt-10 pb-9 gap-5 border-solid border-t-2 border-pointColor1">
          <CancelButton text="취소하기" onClick={handleCancelBtn} width="w-[275px]" />
          <SubmitButton text="등록하기" onClick={handleSubmitBtn} width="w-[275px]" />
        </div>
      </form>
      <div style={{ position: 'fixed', bottom: '90px', right: '40px' }}>
        <PageUpBtn scrollPosition={scrollPosition} />
      </div>
    </main>
  );
};

export default QuizForm;
