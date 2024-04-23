const UsageStatus = ({
  number,
  unit,
  content,
  isBorderExist
}: {
  number: number | undefined;
  unit: string;
  content: string;
  isBorderExist: boolean;
}) => {
  return (
    <section
      className={`flex flex-col items-center sm:border-0 ${
        isBorderExist && 'px-[4vw] border-x border-solid border-pointColor1'
      }`}
    >
      <div className="flex">
        <h1 className="sm:text-6xl text-8xl font-semibold text-pointColor1">{number}</h1>
        <span className="sm:mt-8 mt-14 sm:w-10 w-16 sm:text-base text-xl font-semibold">{unit}</span>
      </div>
      <p className="sm:text-base sm:pr-4 text-xl font-semibold">{content}</p>
    </section>
  );
};

export default UsageStatus;
