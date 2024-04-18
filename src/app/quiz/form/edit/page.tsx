'use client';

import SubHeader from '@/components/common/SubHeader';
import QuizForm from '../QuizForm';
import useConfirmPageLeave from '@/hooks/useConfirmPageLeave';

import { useEffect, useState } from 'react';
import { storageUrl } from '@/utils/supabase/storage';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { getQuiz, uploadImageToStorage, uploadThumbnailToStorage } from '@/api/quizzes';
import { getQuestions } from '@/api/questions';
import { getOptions } from '@/api/question_options';
import { supabase } from '@/utils/supabase/supabase';
import { toast } from 'react-toastify';

import { Question, QuestionType } from '@/types/quizzes';
import { generateFileName, generateImgFileName } from '@/utils/generateFileName';
import { getRandomThumbnail } from '@/utils/getRandomThumbnail';
import { useUpdateOptions, useUpdateQuestions, useUpdateQuiz } from '../../mutations';

const QuizEditPage = () => {
  const [level, setLevel] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [selectedImg, setSelectedImg] = useState(`${storageUrl}/assets/quiz_144x144.png`);
  const [file, setFile] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useState('');
  const [selectedImgFilename, setSelectedImgFilename] = useState('');
  const [myQuizData, setMyquizData] = useState<Question[]>();
  const [deletedQuestions, setDeletedQuestions] = useState(['']);
  const { getCurrentUserProfile } = useAuth();

  useConfirmPageLeave();
  const router = useRouter();
  const updateQuizMutation = useUpdateQuiz();
  const updateQuestionsMutation = useUpdateQuestions();
  const updateOptionsMutation = useUpdateOptions();

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');

  /** '수정' 버튼을 통해 쿼리를 달고 왔다면 */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id');
      if (!id) return;

      const fetchQuizData = async () => {
        try {
          //퀴즈 데이터 가져오기
          const quizData = await getQuiz(id as string);
          setLevel(quizData[0].level);
          setTitle(quizData[0].title);
          setInfo(quizData[0].info);
          setSelectedImgFilename(quizData[0].thumbnail_img_url);
          setSelectedImg(`${storageUrl}/quiz-thumbnails/${quizData[0].thumbnail_img_url}`);
          if (!quizData) return;

          //문제 데이터 가져오기
          const questionsData = await getQuestions(id as string);
          if (!questionsData) return;

          //선택지 데이터 가져오기 및 questions 상태 설정
          const questionsWithOptions = await Promise.all(
            questionsData.map(async (question) => {
              console.log('뀽', question.img_url);
              const options = await getOptions(question.id);
              const img_url = `${storageUrl}/question-imgs/${question.img_url}`;
              return {
                ...question,
                img_url,
                options: options || [] // options가 없을 경우 빈 배열로 설정
              };
            })
          );

          console.log('options 포함한 questions:', questionsWithOptions);
          setMyquizData(questionsWithOptions);
          setQuestions(questionsWithOptions);
        } catch (error) {
          throw error;
        }
      };
      fetchQuizData();
    }
  }, []);

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
      let imgUrl = selectedImgFilename;
      if (file) {
        const fileName = generateFileName(file);
        imgUrl = (await uploadThumbnailToStorage(file, fileName)) as string;
        console.log('스토리지에 이미지 업로드 성공', imgUrl);
      }

      // updatedQuiz 구성하여 quizzes 테이블에서 id에 해당하는 quiz를 update
      const updatedQuiz = {
        creator_id: currentUser,
        level,
        title,
        info,
        thumbnail_img_url: imgUrl || getRandomThumbnail()
      };

      const updateQuizResult = await updateQuizMutation.mutateAsync({ id, updatedQuiz });

      // questions 요소 하나씩 돌아가며 데이터 처리
      questions.forEach(async (question) => {
        // 첨부 이미지 있는 경우 스토리지에 업로드, 없는 경우 null
        const { id, title, type, img_file, correct_answer, options } = question;
        if (!id) {
          alert('해당 퀴즈가 존재하지 않습니다!');
          return;
        }

        if (deletedQuestions.includes(question.id as string)) {
          console.log('삭제된 문제 발견:', question.id);
          // 삭제된 문제의 내용을 모두 null로 바꿈

          question.title = '';
          question.img_file = null;
          question.img_url = '';
          question.correct_answer = '';
          question.options = question.options.map((option) => ({
            ...option,
            content: '',
            is_answer: false
          }));
        }

        let img_url = question.img_filename;
        if (img_file) {
          const formattedName = generateFileName(img_file);
          img_url = (await uploadImageToStorage(img_file, formattedName)) as string;
        }

        // updatedQuestion 구성하여 questions 테이블에 update
        const updatedQuestion = {
          quiz_id: updateQuizResult as string,
          title: title,
          type: type,
          correct_answer: correct_answer,
          img_url: question.img_url.substring(question.img_url.lastIndexOf('/') + 1)
        };
        console.log('등록 전 확인', updatedQuestion);
        console.log('삭제된 문제들', deletedQuestions);
        // updatedOptions 구성하여 question_options 테이블에 update
        const updateQuestionResult = await updateQuestionsMutation.mutateAsync({
          id,
          updatedQuestion
        });
        if (type === QuestionType.objective) {
          const updatedOptions = options.map((option) => ({
            id: option.id,
            content: option.content,
            is_answer: option.is_answer,
            question_id: updateQuestionResult
          }));
          await updateOptionsMutation.mutateAsync(updatedOptions);
        }
        toast.success('퀴즈 수정 성공!');
        router.replace('/quiz/list');
      });
    } catch (error) {
      console.log('퀴즈 수정 중 에러 발생');
    }
  };

  return (
    <>
      <SubHeader text="퀴즈 수정하기" />
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

export default QuizEditPage;
