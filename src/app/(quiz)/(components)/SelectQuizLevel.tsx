import Image from 'next/image';

const SelectQuizLevel = () => {
  return (
    <main className="h-30vh bg-bgColor1 border-b border-pointColor1 flex justify-center">
      <div className="flex items-end gap-1 overflow-hidden">
        <Image
          src="https://via.placeholder.com/350x240"
          alt="초급"
          width={350}
          height={240}
          className="object-none transform translate-y-[40%] hover:translate-y-[10%] transition-transform duration-500 ease-in-out"
        />
        <Image
          src="https://via.placeholder.com/350x240"
          alt="중급"
          width={350}
          height={240}
          className="object-none transform translate-y-[40%] hover:translate-y-[10%] transition-transform duration-500 ease-in-out"
        />
        <Image
          src="https://via.placeholder.com/350x240"
          alt="고급"
          width={350}
          height={240}
          className="object-none transform translate-y-[40%] hover:translate-y-[10%] transition-transform duration-500 ease-in-out"
        />
      </div>
    </main>
  );
};

export default SelectQuizLevel;
