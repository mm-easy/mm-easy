'use client';

import QuizForm from '@/app/quiz/form/QuizForm';
import SubHeader from '../../../components/common/SubHeader';
import useConfirmPageLeave from '@/hooks/useConfirmPageLeave';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSubmitOptions, useSubmitQuestions, useSubmitQuiz } from '../mutations';
import { generateFileName, generateImgFileName } from '@/utils/generateFileName';
import { uploadImageToStorage, uploadThumbnailToStorage } from '@/api/quizzes';
import { storageUrl } from '@/utils/supabase/storage';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase/supabase';
import { getRandomThumbnail } from '@/utils/getRandomThumbnail';

import { QuestionType, type Question } from '@/types/quizzes';

const QuizFormPage = () => {
  const [level, setLevel] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [selectedImg, setSelectedImg] = useState(`${storageUrl}/assets/quiz_144x144.png`);
  const [file, setFile] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useState('');
  const [deletedQuestions, setDeletedQuestions] = useState(['']);
  const { getCurrentUserProfile } = useAuth();

  useConfirmPageLeave();
  const router = useRouter();

  /** 로그인한 유저의 정보를 불러옴 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          router.push('/login');
          toast('로그인 후 이용해 주세요');
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

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: crypto.randomUUID(),
      type: QuestionType.objective,
      title: '',
      img_file: null,
      img_url: `${storageUrl}/assets/quiz_570x160.png`,
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
      img_url: `${storageUrl}/assets/quiz_570x160.png`,
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

  /** 퀴즈 등록 mutation */
  const insertQuizMutation = useSubmitQuiz();
  const insertQuestionsMutation = useSubmitQuestions();
  const insertOptionsMutation = useSubmitOptions();

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
        thumbnail_img_url: imgUrl || getRandomThumbnail()
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
          img_url: img_url as string
        };

        // newOptions 구성하여 question_options 테이블에 인서트
        const insertQuestionResult = await insertQuestionsMutation.mutateAsync(newQuestion);
        if (type === QuestionType.objective) {
          const newOptions = options.map((option) => ({
            content: option.content,
            is_answer: option.is_answer,
            question_id: insertQuestionResult
          }));
          await insertOptionsMutation.mutateAsync(newOptions);
        }
        toast.success('퀴즈 등록 성공!');
        router.replace('/quiz/list');
      });
    } catch (error) {
      console.log('퀴즈 생성 중 에러 발생');
    }
  };

  return (
    <>
      <SubHeader text="퀴즈 만들기" />
      <QuizForm
        questions={questions}
        setQuestions={setQuestions}
        handleSubmitBtn={handleSubmitBtn}
        level={level}
        setLevel={setLevel}
        title={title}
        setTitle={setTitle}
        info={info}
        setInfo={setInfo}
        selectedImg={selectedImg}
        setSelectedImg={setSelectedImg}
        file={file}
        setFile={setFile}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        deletedQuestions={deletedQuestions}
      />
    </>
  );
};

export default QuizFormPage;
