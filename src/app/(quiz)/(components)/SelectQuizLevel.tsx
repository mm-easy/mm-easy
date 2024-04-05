'use client';

import { BlueButton, CancelButton } from '@/components/common/FormButtons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SelectQuizLevel = () => {
  const router = useRouter();
  const handleMakeQuizBtn = () => {
    router.push('/quiz-form');
  };
  return (
    <main className="w-full bg-pointColor1 border-b border-pointColor1 flex flex-col justify-center items-center">
      <div className="mt-5 mr-1/4 ml-auto">
        <BlueButton text="퀴즈 만들기" onClick={handleMakeQuizBtn} width="w-36" />
      </div>
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
