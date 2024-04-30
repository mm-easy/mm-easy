'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DaejangContent from '@/assets/logo/logo_circle_blue 2.png';
import RecommendLoginModal from '@/components/common/RecommendLoginModal';
import PageUpBtn from '@/components/common/PageUpBtn';
import useMultilingual from '@/utils/useMultilingual';
import { storageUrl } from '@/utils/supabase/storage';
import { ADMIN } from '@/constant/adminId';

import type { Quiz } from '@/types/quizzes';

const QuizList = ({ allQuizzes, currentUser }: { allQuizzes: Quiz[][]; currentUser: string }) => {
  const router = useRouter();
  const [quizId, setQuizId] = useState<string | undefined>('');
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const m = useMultilingual('quiz-list');

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

  /** 로그인 권장 모달 */
  const handleShowModal = (id: string | undefined) => {
    setQuizId(id);
    if (!currentUser) {
      setShowModal(true);
    } else {
      handleMoveQuizTry(id);
    }
  };

  /** 퀴즈 클릭하여 퀴즈 풀기로 이동하는 핸들러 */
  const handleMoveQuizTry = (id: string | undefined) => {
    router.push(`/quiz/${id}`);
  };

  return (
    <main className="sm:p-1 p-5 flex flex-col justify-center items-center">
      <div className="w-full flex sm:justify-center items-center gap-2 sm:pl-0 sm:pb-3 pl-7 pt-5">
        <Image src={DaejangContent} alt="아이콘" quality={100} width={20} height={20} />
        <p className="sm:w-[85%] text-sm font-bold">{m('OFFICIAL_CONTENTS')}</p>
      </div>
      <div className="sm:py-0 sm:px-3 px-6 py-4 grid grid-cols-4 sm:grid-cols-2 sm:gap-3 gap-10">
        {allQuizzes
          .flatMap((page) => page)
          .map((item) => (
            <div
              key={item.id}
              className="flex flex-col border my-3 border-solid border-grayColor1 rounded-t-3xl rounded-b-md sm:p-2 p-4 cursor-pointer transition duration-300 ease-in-out transform hover:border-blue-500"
              onClick={() => {
                handleShowModal(item.id);
              }}
            >
              <div className="flex items-center gap-2">
                {ADMIN.some((admin) => admin.id === item.creator_id) && (
                  <Image
                    src={DaejangContent}
                    alt="아이콘"
                    quality={100}
                    width={20}
                    height={20}
                    className="sm:w-4 sm:h-4 w-5 h-5"
                  />
                )}
                <p
                  className={`font-bold sm:text-base sm:mt-2 mt-4 sm:mb-1 mb-3 text-lg truncate ${
                    ADMIN.some((admin) => admin.id === item.creator_id) && 'text-pointColor1'
                  }`}
                >
                  {item.title}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Image
                  src={`${storageUrl}/quiz-thumbnails/${item.thumbnail_img_url}`}
                  alt="퀴즈 썸네일"
                  width={250}
                  height={250}
                  quality={100}
                  className="w-full sm:h-[180px] h-[250px] object-cover border-solid border border-grayColor1 rounded-md"
                />
                <p className="sm:mb-2 sm:text-sm mb-4 line-clamp-2">{item.info}</p>
              </div>
            </div>
          ))}
        {showModal && <RecommendLoginModal id={quizId} proceedWithoutLogin={handleMoveQuizTry} />}
      </div>
      <PageUpBtn scrollPosition={scrollPosition} bottom="bottom-[80px]" smallBottom="sm:bottom-48" />
    </main>
  );
};

export default QuizList;
