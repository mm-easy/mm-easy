'use client';

import QuestionForm from './QuestionForm';
import Image from 'next/image';
import UnloadImgBtn from './UnloadImg';
import PlusQuestionBtn from './PlusQuestionBtn';
import PageUpBtn from '@/components/common/PageUpBtn';
import useConfirmPageLeave from '@/hooks/useConfirmPageLeave';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { BlueInput, BlueLevelSelect } from '@/components/common/BlueInput';
import { CancelButton, SubmitButton } from '@/components/common/FormButtons';
import { storageUrl } from '@/utils/supabase/storage';
import { handleMaxLength } from '@/utils/handleMaxLength';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase/supabase';

import { QuestionType, type Question } from '@/types/quizzes';
import { SetStateAction } from 'jotai';
import useMultilingual from '@/utils/useMultilingual';
import { DebouncedFunc } from 'lodash';

const QuizForm = ({
  questions,
  setQuestions,
  handleSubmitBtn,
  level,
  setLevel,
  title,
  setTitle,
  info,
  setInfo,
  selectedImg,
  setSelectedImg,
  file,
  setFile,
  currentUser,
  setCurrentUser,
  deletedQuestions
}: {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  handleSubmitBtn: DebouncedFunc<() => Promise<void>>;
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  info: string;
  setInfo: Dispatch<SetStateAction<string>>;
  selectedImg: string;
  setSelectedImg: Dispatch<SetStateAction<string>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  currentUser: string;
  setCurrentUser: Dispatch<SetStateAction<string>>;
  deletedQuestions: string[];
}) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const { getCurrentUserProfile } = useAuth();
  const m = useMultilingual('quizEditor');

  useConfirmPageLeave();
  const router = useRouter();

  /** 로그인한 유저의 정보를 불러옴 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          router.push('/login');
          toast(m('ALERT_LOGIN'));
          return;
        }
        const userProfile = await getCurrentUserProfile();
        if (!userProfile) return;
        setCurrentUser(userProfile.email);
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const confirmation = m('ALERT_CANCEL_MAKING');
    const result = window.confirm(confirmation);
    if (!result) return;
    router.push('/quiz/list');
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
          img_url: `${storageUrl}/assets/quiz_570x160.png`,
          correct_answer: ''
        }
      ]);
    } else {
      toast.warning(m('ALERT_AT_MOST_5QUESTION'));
      return;
    }
  };

  /** 첨부한 이미지 삭제하기 */
  const handleRemoveImg = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setFile(null);
    setSelectedImg(`${storageUrl}/assets/quiz_144x144.png`);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <main className="sm:w-full bg-blue-50 flex flex-col justify-center items-center">
      <form className="sm:w-full flex flex-col min-w-full" onSubmit={(e) => e.preventDefault()}>
        <div className="sm:w-full sm:py-5 sm:px-4 p-10 flex flex-col gap-4 bg-bgColor1 justify-center items-center border-solid border-b-2 border-pointColor1">
          <div className="sm:w-full sm:justify-between flex sm:gap-3 gap-10">
            <div
              onClick={handleClickImg}
              className="relative bg-grayColor1 sm:w-32 sm:h-32 w-36 h-36 border-solid border border-pointColor1 rounded-md overflow-hidden"
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
            <div className="flex flex-col sm:justify-end justify-between">
              <div className="sm:w-full flex flex-col gap-1">
                <p className="sm:w-full sm:text-base sm:font-bold text-xs text-pointColor1">{m('QUIZ_LEVEL')}</p>
                <BlueLevelSelect value={level} onChange={(value) => setLevel(value)} />
              </div>
              <div className="sm:hidden flex flex-col gap-1">
                <p className="text-xs text-pointColor1">{m('QUIZ_TITLE')}</p>
                <BlueInput
                  value={title}
                  width="w-[385px] pr-16"
                  maxNum={25}
                  onInput={(e) => handleMaxLength(e, 25)}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="sm:w-full sm:flex sm:flex-col sm:gap-1 hidden">
            <p className="sm:text-base sm:font-bold text-xs text-pointColor1">{m('QUIZ_TITLE')}</p>
            <BlueInput
              value={title}
              width="sm:w-full w-[570px]"
              maxNum={25}
              onInput={(e) => handleMaxLength(e, 25)}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="sm:w-full flex flex-col gap-1 w-auto">
            <p className="sm:text-base sm:font-bold text-xs text-pointColor1">{m('QUIZ_INFO')}</p>
            <BlueInput
              value={info}
              width="sm:w-full w-[570px]"
              maxNum={30}
              onInput={(e) => handleMaxLength(e, 30)}
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
        </div>
        <QuestionForm questions={questions} setQuestions={setQuestions} deletedQuestions={deletedQuestions} />
        <PlusQuestionBtn disabled={questions.length === 5} onClick={handleAddQuestion} />
        <div className="sm:w-full sm:px-4 bg-bgColor1 flex items-center justify-center sm:py-5 py-10 gap-5 border-solid border-t-2 border-pointColor1">
          <CancelButton text={m('CANCLE_BTN')} onClick={handleCancelBtn} width="w-[275px]" height="sm:h-12 h-11" />
          <SubmitButton text={m('SUBMIT_BTN')} onClick={handleSubmitBtn} width="w-[275px]" height="sm:h-12 h-11" />
        </div>
      </form>
      <PageUpBtn scrollPosition={scrollPosition} bottom="bottom-[80px]" smallBottom="sm:bottom-28" />
    </main>
  );
};

export default QuizForm;
