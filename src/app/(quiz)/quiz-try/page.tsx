import SubHeader from '@/components/common/SubHeader';
import Image from 'next/image';

const QuizTryPage = () => {
  return (
    <>
      <SubHeader text="퀴즈 풀기" />
      <main className="grid grid-cols-[20%_80%]">
        <article className="h-[76vh] border-solid border-r-2 border-pointColor1">
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
          <p className="">English to Korean</p>
        </article>
        <article className=""></article>
      </main>
    </>
  );
};

export default QuizTryPage;
