import Image from 'next/image';

const QuizList = () => {
  return (
    <main className="p-5 flex flex-col gap-4 items-center">
      <div className="flex gap-5 flex-wrap mt-5">
        <div className="flex flex-col gap-3">
          <div className="border-solid border border-pointColor1 rounded-md overflow-hidden">
            <Image src="https://via.placeholder.com/250x250" alt="퀴즈 썸네일" width={250} height={250} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-lg">퀴즈 제목입니다</p>
            <p>퀴즈 설명입니다</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="border-solid border border-pointColor1 rounded-md overflow-hidden">
            <Image src="https://via.placeholder.com/250x250" alt="퀴즈 썸네일" width={250} height={250} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-lg">퀴즈 제목입니다</p>
            <p>퀴즈 설명입니다</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="border-solid border border-pointColor1 rounded-md overflow-hidden">
            <Image src="https://via.placeholder.com/250x250" alt="퀴즈 썸네일" width={250} height={250} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-lg">퀴즈 제목입니다</p>
            <p>퀴즈 설명입니다</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="border-solid border border-pointColor1 rounded-md overflow-hidden">
            <Image src="https://via.placeholder.com/250x250" alt="퀴즈 썸네일" width={250} height={250} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-lg">퀴즈 제목입니다</p>
            <p>퀴즈 설명입니다</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizList;
