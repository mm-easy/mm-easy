import SubHeader from '@/components/common/SubHeader';
import Image from 'next/image';

const QuizTryPage = () => {
  return (
    <>
      <SubHeader text="퀴즈 풀기" />
      <main className="grid grid-cols-[10%_90%]">
        <article className="h-[76vh] bg-bgColor1 text-pointColor1 border-solid border-r-2 border-pointColor1">
          <section>
            <Image
              src="https://via.placeholder.com/144x144"
              alt="샘플 이미지"
              width={144}
              height={144}
              className="w-full"
            />
            <section className="p-4 flex flex-col gap-3 border-solid border-y-2 border-pointColor1">
              <div>
                <h4>작성자</h4>
                <p>HaleyLove&lt;3</p>
              </div>
              <div>
                <h4>등록일</h4>
                <p>2024-04-05</p>
              </div>
            </section>
          </section>
          <p className="p-4">English to Korean</p>
        </article>
        <article className="">
          <header className="h-[8vh] leading-[7.5vh] flex border-solid border-b-2 border-pointColor1">
            <h2 className="w-[10%] text-center text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
              난이도
            </h2>
            <h3 className="w-[10%] text-center border-solid border-r-2 border-pointColor1">순한맛</h3>
            <h2 className="w-[10%] text-center text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
              제목
            </h2>
            <h3 className="pl-[3%]">Find correct words</h3>
          </header>
        </article>
      </main>
    </>
  );
};

export default QuizTryPage;
