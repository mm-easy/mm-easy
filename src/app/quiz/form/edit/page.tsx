'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabase';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import SubHeader from '@/components/common/SubHeader';
import QuizForm from '../QuizForm';
import useConfirmPageLeave from '@/hooks/useConfirmPageLeave';
import { useAuth } from '@/hooks/useAuth';
import { deleteQuestions, getQuiz, uploadImageToStorage, uploadThumbnailToStorage } from '@/api/quizzes';
import { getQuestions } from '@/api/questions';
import { getOptions } from '@/api/question_options';
import { generateFileName, generateImgFileName } from '@/utils/generateFileName';
import { getRandomThumbnail } from '@/utils/getRandomThumbnail';
import { useSubmitOptions, useSubmitQuestions, useUpdateQuiz } from '../../mutations';
import { storageUrl } from '@/utils/supabase/storage';

import { Question, QuestionType } from '@/types/quizzes';

const QuizEditPage = () => {
  const [level, setLevel] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [selectedImg, setSelectedImg] = useState(`${storageUrl}/assets/quiz_144x144.png`);
  const [file, setFile] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useState('');
  const [selectedImgFilename, setSelectedImgFilename] = useState('');
  const [myQuizData, setMyquizData] = useState<Question[]>();
  const [quizId, setQuizId] = useState<string>('');
  const { getCurrentUserProfile } = useAuth();

  useConfirmPageLeave();
  const router = useRouter();
  const updateQuizMutation = useUpdateQuiz();
  const insertQuestionsMutation = useSubmitQuestions();
  const insertOptionsMutation = useSubmitOptions();

  /** 수정할 게시글의 기존 내용을 불러옴 */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id');
      if (!id) return;
      setQuizId(id);

      const fetchQuizData = async () => {
        try {
          //퀴즈 데이터 가져오기
          const quizData = await getQuiz(id as string);
          setLevel(quizData.level);
          setTitle(quizData.title);
          setInfo(quizData.info);
          setSelectedImgFilename(quizData.thumbnail_img_url);
          setSelectedImg(`${storageUrl}/quiz-thumbnails/${quizData.thumbnail_img_url}`);
          if (!quizData) return;

          //문제 데이터 가져오기
          const questionsData = await getQuestions(id as string);
          if (!questionsData) return;

          //선택지 데이터 가져오기 및 questions 상태 설정
          const questionsWithOptions = await Promise.all(
            questionsData.map(async (question) => {
              const options = await getOptions(question.id);
              let img_url = question.img_url;
              if (question.img_url === null) {
                img_url = `${storageUrl}/assets/quiz_570x160.png`;
              } else {
                img_url = `${storageUrl}/question-imgs/${question.img_url}`;
              }
              return {
                ...question,
                img_url,
                options: options || [] // options가 없을 경우 빈 배열로 설정
              };
            })
          );
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

  /** questions 초깃값 */
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

  /** 등록(수정) 버튼 클릭 핸들러 */
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

    if (!window.confirm('해당 내용으로 퀴즈를 수정하시겠습니까?')) {
      return;
    }

    // 퀴즈 썸네일 이미지를 스토리지에 업로드
    try {
      let imgUrl = selectedImgFilename;
      if (file) {
        const fileName = generateFileName(file);
        imgUrl = (await uploadThumbnailToStorage(file, fileName)) as string;
      }

      // updatedQuiz 구성하여 quizzes 테이블에서 id에 해당하는 quiz를 update
      const updatedQuiz = {
        creator_id: currentUser,
        level,
        title,
        info,
        thumbnail_img_url: imgUrl || getRandomThumbnail()
      };

      await updateQuizMutation.mutateAsync({ id: quizId, updatedQuiz });

      // 해당 퀴즈에 등록되어 있던 questions & options를 모두 삭제
      await deleteQuestions(quizId);

      // _app 성공 여부 체크
      let success = true;

      // questions 배열을 순회하면서 각 질문 처리
      for (const question of questions) {
        // 첨부 이미지 있는 경우 스토리지에 업로드, 없는 경우 null
        const { id, title, type, img_file, correct_answer, options } = question;
        let img_url = null;
        if (img_file) {
          const formattedName = generateImgFileName(img_file, id);
          img_url = await uploadImageToStorage(img_file, formattedName);
        }

        // newQuestion 구성하여 questions 테이블에 인서트
        const newQuestion = {
          quiz_id: quizId,
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

        // 만약 질문 처리 중 문제가 생기면 success를 false로 설정하고 루프 종료
        if (!insertQuestionResult) {
          success = false;
          break;
        }
      }

      // success가 true인 경우에만 한 번만 실행
      if (success) {
        toast.success('퀴즈가 수정되었습니다');
        router.replace('/quiz/list');
      }
    } catch (error) {
      console.error('퀴즈 생성 중 에러 발생');
    }
  };

  const debouncedSubmit = debounce(handleSubmitBtn, 1000);

  return (
    <>
      <SubHeader text="퀴즈 수정하기" />
      <QuizForm
        questions={questions}
        setQuestions={setQuestions}
        handleSubmitBtn={debouncedSubmit}
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
      />
    </>
  );
};

export default QuizEditPage;
