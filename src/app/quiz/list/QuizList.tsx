'use client';

import Image from 'next/image';

import { Quiz } from '@/types/quizzes';
import { useRouter } from 'next/navigation';
import RecommendLoginModal from '@/components/common/RecommendLoginModal';
import { useEffect, useState } from 'react';
import PageUpBtn from '@/components/common/PageUpBtn';
import { storageUrl } from '@/utils/supabase/storage';

const QuizList = ({
  allQuizzes,
  quizLevelSelected,
  currentUser
}: {
  allQuizzes: Quiz[][];
  quizLevelSelected: Quiz[];
  currentUser: string;
}) => {
  const router = useRouter();
  const [quizId, setQuizId] = useState<string | undefined>('');
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

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

  const handleShowModal = (id: string | undefined) => {
    setQuizId(id);
    if (!currentUser) {
      setShowModal(true);
    } else {
      handleMoveQuizTry(id);
    }
  };

  const handleMoveQuizTry = (id: string | undefined) => {
    router.push(`/quiz/${id}`);
  };

  return (
    <main className="p-5 flex flex-col justify-center items-center">
      <div className="px-6 py-4 grid grid-cols-4 sm:grid-cols-2 gap-10">
        {allQuizzes
          .flatMap((page) => page)
          .map((item) => (
            <div
              key={item.id}
              className="flex flex-col border my-3 border-solid border-grayColor1 rounded-t-3xl rounded-b-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:border-blue-500"
              onClick={() => {
                handleShowModal(item.id);
              }}
            >
              <p className="font-bold text-lg mt-4 mb-3 truncate">{item.title}</p>
              <div className="flex flex-col gap-3">
                <Image
                  src={`${storageUrl}/quiz-thumbnails/${item.thumbnail_img_url}`}
                  alt="퀴즈 썸네일"
                  width={250}
                  height={250}
                  quality={100}
                  className="w-full h-[250px] object-cover border-solid border border-grayColor1 rounded-md"
                />
                <p className="mb-4 line-clamp-2">{item.info}</p>
              </div>
            </div>
          ))}
        {showModal && <RecommendLoginModal id={quizId} proceedWithoutLogin={handleMoveQuizTry} />}
      </div>
      <PageUpBtn scrollPosition={scrollPosition} />
    </main>
  );
};

export default QuizList;
