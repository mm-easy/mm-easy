'use client';

import Image from 'next/image';
import { WhiteButton } from '@/components/common/FormButtons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getQuizzesPaged } from '@/api/quizzes';
import { supabase } from '@/utils/supabase/supabase';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';

import QuizList from './QuizList';
import CreateNewQuizBtn from './CreateNewQuizBtn';
import Level1 from '@/assets/quiz/level1.png';
import Level2 from '@/assets/quiz/level2.png';
import Level3 from '@/assets/quiz/level3.png';
import MobileL0 from '@/assets/quiz/face_2.png';
import MobileL1 from '@/assets/quiz/face_3.png';
import MobileL2 from '@/assets/quiz/face_4.png';
import MobileL3 from '@/assets/quiz/face_5.png';
import Level1ENG from '@/assets/quiz/card_en_easy.png';
import Level2ENG from '@/assets/quiz/card_en_medium.png';
import Level3ENG from '@/assets/quiz/card_en_hard.png';
import LoadingImg from '@/components/common/LoadingImg';
import useMultilingual from '@/utils/useMultilingual';

import type { Quiz } from '@/types/quizzes';

const SelectQuizLevel = () => {
  const router = useRouter();
  const [quizLevelSelected, setQuizLevelSelected] = useState<Quiz[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState('');
  const { getCurrentUserProfile } = useAuth();
  const [lang] = useAtom(langAtom);
  const m = useMultilingual('quiz-list');

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

  /** 스크롤에 따라 다음 데이터 페이지 불러오도록 fetchNextPage 호출 */
  const handleScroll = () => {
    const isAtBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    if (isAtBottom && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  };

  /** 스크롤 추적 이벤트 */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  /** 퀴즈 만들기 버튼 클릭 시 */
  const handleMakeQuizBtn = () => {
    if (!currentUser) {
      toast.warn(m('ALERT_MSG_LOGIN'));
      return;
    }
    router.push('/quiz/form');
  };

  /** quizzes 테이블에서 페이지네이션 된 데이터 가져오기 */
  const {
    data: allQuizzes,
    isLoading,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['quizzes', selectedLevel],
    queryFn: ({ pageParam }) => getQuizzesPaged(pageParam, selectedLevel),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPageParam + 1;
    },
    retry: 0
  });

  if (isLoading) return <LoadingImg height="84vh" />;
  if (!allQuizzes) return <LoadingImg height="84vh" />;

  /** 클릭하여 퀴즈 레벨 필터링 */
  const handleSelectLevel = (level: number | null) => {
    setSelectedLevel(level);
  };

  return (
    <>
      <section className="sm:w-full sm:flex sm:items-center sm:h-[7vh] sm:pl-5 sm:font-bold sm:text-pointColor1 hidden">
        {m('CHOOSE_DIFFICULTY')}
      </section>
      <main
        className={`sm:w-full sm:flex sm:justify-center sm:items-center sm:gap-4 sm:h-[23vh] ${
          selectedLevel === null
            ? 'sm:bg-bgColor2'
            : selectedLevel === 1
              ? 'sm:bg-[#fff2b2]'
              : selectedLevel === 2
                ? 'sm:bg-[#ffcc66]'
                : selectedLevel === 3
                  ? 'sm:bg-[#ffb266]'
                  : ''
        } sm:border-solid sm:border-y-1 border-pointColor1 hidden`}
      >
        <div
          className={`sm:flex sm:flex-col sm:justify-center sm:items-center sm:w-[95px] sm:h-36 sm:rounded-lg ${
            selectedLevel === null ? '' : 'sm:border-solid'
          } sm:border-pointColor1 sm:border sm:bg-bgColor2 hidden`}
          onClick={() => handleSelectLevel(null)}
        >
          <Image src={MobileL0} alt="전체 레벨" width={75} />
          <p className="sm:block sm:font-bold sm:text-pointColor1 sm:mt-5 hidden">{m('QUIZ_LEVEL_0')}</p>
        </div>
        <div
          className={`sm:flex sm:flex-col sm:justify-center sm:items-center sm:w-[95px] sm:h-36 sm:rounded-lg ${
            selectedLevel === 1 ? '' : 'sm:border-solid'
          } sm:border-pointColor1 sm:border sm:bg-[#fff2b2] sm:bg-hidden`}
          onClick={() => handleSelectLevel(1)}
        >
          <Image src={MobileL1} alt="순한맛" width={75} />
          <p className="sm:block sm:font-bold sm:text-pointColor1 sm:mt-5 hidden">{m('QUIZ_LEVEL_1')}</p>
        </div>
        <div
          className={`sm:flex sm:flex-col sm:justify-center sm:items-center sm:w-[95px] sm:h-36 sm:rounded-lg ${
            selectedLevel === 2 ? '' : 'sm:border-solid'
          } sm:border-pointColor1 sm:border sm:bg-[#ffcc66] hidden`}
          onClick={() => handleSelectLevel(2)}
        >
          <Image src={MobileL2} alt="중간맛" width={75} />
          <p className="sm:block sm:font-bold sm:text-pointColor1 sm:mt-5 hidden">{m('QUIZ_LEVEL_2')}</p>
        </div>
        <div
          className={`sm:flex sm:flex-col sm:justify-center sm:items-center sm:w-[95px] sm:h-36 sm:rounded-lg ${
            selectedLevel === 3 ? '' : 'sm:border-solid'
          } sm:border-pointColor1 sm:border sm:bg-[#ffb266] hidden`}
          onClick={() => handleSelectLevel(3)}
        >
          <Image src={MobileL3} alt="매운맛" width={75} />
          <p className="sm:block sm:font-bold sm:text-pointColor1 sm:mt-5 hidden">{m('QUIZ_LEVEL_3')}</p>
        </div>
      </main>
      <main className="sm:hidden w-full h-[452px] bg-bgColor2 border-b-2 border-pointColor1 flex flex-col justify-center items-center">
        <div className="mt-5 absolute top-20 z-10 flex flex-col items-center">
          <p className="text-pointColor1 text-3xl font-bold">{m('SELECT_LEVEL_TITLE')}</p>
          <p
            className="text-pointColor1 underline underline-offset-4 font-bold mt-5 cursor-pointer"
            onClick={() => handleSelectLevel(null)}
          >
            {m('SEE_ALL_QUIZZES')}
          </p>
        </div>
        <div className="mt-5 mr-1/4 absolute top-20 z-10 left-3/4">
          <WhiteButton text={m('CREATE_QUIZ_BTN')} onClick={() => handleMakeQuizBtn()} width="w-36" py="py-3" />
        </div>
        <div className="flex items-end overflow-hidden mt-30">
          <div className="rotate-[-5deg] ml-5">
            <Image
              src={lang === 'ko' ? Level1 : Level1ENG}
              alt="초급"
              width={350}
              height={240}
              quality={100}
              className={`w-full h-full transform transition-transform duration-500 ease-in-out border-solid border-2 border-pointColor1 rounded-[30px] rotate-[-5deg] cursor-pointer ${
                selectedLevel === 1
                  ? 'translate-y-[60%] z-10'
                  : selectedLevel === null
                    ? 'z-0 translate-y-[70%] hover:translate-y-[65%]'
                    : 'z-0 translate-y-[80%] hover:translate-y-[70%]'
              }`}
              onClick={() => handleSelectLevel(1)}
            />
          </div>
          <div className="rotate-[-2deg]">
            <Image
              src={lang === 'ko' ? Level2 : Level2ENG}
              alt="중급"
              width={350}
              height={240}
              quality={100}
              className={`w-full h-full transform transition-transform duration-500 ease-in-out border-solid border-2 border-pointColor1 rounded-[30px] rotate-[-2deg] cursor-pointer ${
                selectedLevel === 2
                  ? 'translate-y-[60%] z-10'
                  : selectedLevel === null
                    ? 'z-0 translate-y-[70%] hover:translate-y-[65%]'
                    : 'z-0 translate-y-[80%] hover:translate-y-[70%]'
              }`}
              onClick={() => handleSelectLevel(2)}
            />
          </div>
          <div className="rotate-3 mr-5">
            <Image
              src={lang === 'ko' ? Level3 : Level3ENG}
              alt="고급"
              width={350}
              height={240}
              quality={100}
              className={`w-full h-full transform transition-transform duration-500 ease-in-out border-solid border-2 border-pointColor1 rounded-[30px] rotate-3 cursor-pointer ${
                selectedLevel === 3
                  ? 'translate-y-[60%] z-10'
                  : selectedLevel === null
                    ? 'z-0 translate-y-[70%] hover:translate-y-[65%]'
                    : 'z-0 translate-y-[80%] hover:translate-y-[70%]'
              }`}
              onClick={() => handleSelectLevel(3)}
            />
          </div>
        </div>
      </main>
      <QuizList allQuizzes={allQuizzes.pages} quizLevelSelected={quizLevelSelected} currentUser={currentUser} />
      <CreateNewQuizBtn handleMakeQuizBtn={handleMakeQuizBtn} />
    </>
  );
};

export default SelectQuizLevel;
