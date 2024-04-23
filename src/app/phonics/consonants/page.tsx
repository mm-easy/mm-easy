import PhonicsLayout from '../PhonicsLayout';

const ConsonantsPage = () => {
  return (
    <div className="grid grid-cols-[16%_84%] bgColor1">
      <PhonicsLayout />
      <section className="flex flex-col items-center">
        <p className="text-xl font-bold mt-8">한글의 자음 글자는 모두 19자이다.</p>
        <p className="text-pointColor1 mt-2">*글자를 눌러 발음을 들어보세요.</p>
      </section>
    </div>
  );
};

export default ConsonantsPage;
