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
      className={`flex flex-col items-center ${isBorderExist && 'px-[4vw] border-x border-solid border-pointColor1'}`}
    >
      <div className="flex">
        <h1 className="text-8xl font-semibold text-pointColor1">{number}</h1>
        <span className="mt-14 w-16 text-xl font-semibold">{unit}</span>
      </div>
      <p className="text-xl font-semibold">{content}</p>
    </section>
  );
};

export default UsageStatus;
