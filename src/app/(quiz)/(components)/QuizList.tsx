'use client';

import Image from 'next/image';

import { Quiz } from '@/types/quizzes';
import { useRouter } from 'next/navigation';
import RecommendLoginModal from '@/components/common/RecommendLoginModal';
import { useState } from 'react';

const QuizList = ({ quizLevelSelected, currentUser }: { quizLevelSelected: Quiz[]; currentUser: string }) => {
  const router = useRouter();
  const [quizId, setQuizId] = useState<string | undefined>('');
  const [showModal, setShowModal] = useState(false);

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
    <main className="p-5 flex flex-col items-center">
      {quizLevelSelected.length === 0 && <div className="p-36">해당 난이도에 아직 등록된 퀴즈가 없습니다.</div>}
      <div className="w-full grid grid-cols-4 place-items-center gap-4">
        {quizLevelSelected.map((item) => (
          <div
            key={item.id}
            className="flex flex-col border my-5 border-solid border-gray-200 rounded-t-3xl rounded-b-md p-4 min-w-[250px] cursor-pointer"
            onClick={() => {
              handleShowModal(item.id);
            }}
          >
            <p className="font-bold text-lg mt-4 mb-3">{item.title}</p>
            <div className="flex flex-col gap-3">
              <div className="border-solid border border-pointColor1 rounded-md overflow-hidden w-[250px] h-[250px]">
                <Image
                  src={`https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/quiz-thumbnails/${item.thumbnail_img_url}`}
                  alt="퀴즈 썸네일"
                  width={250}
                  height={250}
                  className="w-full h-[250px] object-cover border-solid border border-pointColor1 rounded-md"
                />
              </div>
              <p className="mb-4">{item.info}</p>
            </div>
          </div>
        ))}
        {showModal && <RecommendLoginModal id={quizId} proceedWithoutLogin={handleMoveQuizTry} />}
      </div>
    </main>
  );
};

export default QuizList;
