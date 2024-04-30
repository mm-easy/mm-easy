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
        <h1 className="text-8xl font-semibold text-pointColor1 sm:text-6xl">{number}</h1>
        <span className="mt-14 w-16 text-xl font-semibold sm:mt-8 sm:w-10 sm:text-base">{unit}</span>
      </div>
      <p className="text-xl font-semibold sm:text-base sm:pr-4">{content}</p>
    </section>
  );
};

export default UsageStatus;
