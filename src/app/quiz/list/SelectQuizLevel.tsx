'use client';

import Image from 'next/image';
import QuizList from './QuizList';
import Level1 from '@/assets/level1.png';
import Level2 from '@/assets/level2.png';
import Level3 from '@/assets/level3.png';
import LoadingImg from '@/components/common/LoadingImg';
import { WhiteButton } from '@/components/common/FormButtons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getQuizzes, getQuizzesPaged } from '@/api/quizzes';
import { supabase } from '@/utils/supabase/supabase';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';

import type { Quiz } from '@/types/quizzes';
import useMultilingual from '@/utils/useMultilingual';

const SelectQuizLevel = () => {
  const router = useRouter();
  const [quizLevelSelected, setQuizLevelSelected] = useState<Quiz[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState('');
  const { getCurrentUserProfile } = useAuth();
  const [lang, setLang] = useAtom(langAtom);
  const m = useMultilingual(lang, 'quiz-list');

  /** 로그인한 유저의 정보를 불러옴 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) return;
        const userProfile = await getCurrentUserProfile();
        if (!userProfile) return;
        setCurrentUser(userProfile.email);
        console.log('읭');
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };
    fetchData();
  }, []);

  /** 스크롤에 따라 다음 데이터 페이지 불러오도록 fetchNextPage 호출 */
  const handleScroll = () => {
    const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
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
      toast.warn('로그인이 필요합니다.');
      return;
    }
    router.push('/quiz/form');
  };

  /** quizzes 테이블에서 페이지네이션 된 데이터 가져오기 */
  const {
    data: allQuizzes,
    isLoading,
    hasNextPage,
    fetchNextPage,
    ...rest
  } = useInfiniteQuery({
    queryKey: ['quizzes'],
    queryFn: ({ pageParam }) => getQuizzesPaged(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPageParam + 1;
    },
    retry: 0
  });

  if (!allQuizzes) return <LoadingImg height="84vh" />;

  /** 클릭하여 퀴즈 레벨 필터링 */
  const handleSelectLevel = (level: number | null) => {
    if (level === null) {
      setQuizLevelSelected(allQuizzes.pages.flatMap((page) => page));
    } else {
      const filteredQuizzes = allQuizzes.pages.flatMap((page) => page).filter((item) => item.level === level);
      setQuizLevelSelected(filteredQuizzes);
    }
    setSelectedLevel(level);
  };

  return (
    <>
      <main className="w-full h-[400px] bg-bgColor2 border-b-2 border-pointColor1 flex flex-col justify-center items-center">
        <div className="mt-5 absolute top-20 z-10 flex flex-col items-center">
          <p className="text-pointColor1 text-3xl font-bold">{m('SELECT_LEVEL_TITLE')}</p>
          <p
            className="text-pointColor1 underline underline-offset-4 text-lg font-bold mt-5 cursor-pointer"
            onClick={() => handleSelectLevel(null)}
          >
            {m('SEE_ALL_QUIZZES')}
          </p>
        </div>
        <div className="mt-5 mr-1/4 absolute top-20 z-10 left-3/4">
          <button
            onClick={() => {
              fetchNextPage();
            }}
          >
            테스트
          </button>
          <WhiteButton text={m('CREATE_QUIZ_BTN')} onClick={() => handleMakeQuizBtn()} width="w-36" />
        </div>
        <div className="flex items-end overflow-hidden mt-30">
          <div className="rotate-[-5deg] ml-5">
            <Image
              src={Level1}
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
              src={Level2}
              alt="중급"
              width={350}
              height={240}
              quality={100}
              className={`w-full h-full transform transition-transform duration-500 ease-in-out border-solid border-2 border-pointColor1 rounded-[30px] rotate-[-2deg] cursor-pointer ${
                selectedLevel === 2
                  ? 'translate-y-[65%] z-10'
                  : selectedLevel === null
                  ? 'z-0 translate-y-[70%] hover:translate-y-[65%]'
                  : 'z-0 translate-y-[80%] hover:translate-y-[70%]'
              }`}
              onClick={() => handleSelectLevel(2)}
            />
          </div>
          <div className="rotate-3 mr-5">
            <Image
              src={Level3}
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
    </>
  );
};

export default SelectQuizLevel;
