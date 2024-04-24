import { langAtom } from '@/store/store';
import { useAtom } from 'jotai';
import { ImExit } from 'react-icons/im';

const ExitButton = ({ size, exitText, onClick }: { size: string; exitText: string; onClick: () => void }) => {
  const [lang] = useAtom(langAtom);

  return (
    <button
      className={`${lang === 'ko' && 'w-[140px]'} ${size === 'sm' && 'my-2'} mr-2 px-4 flex sm:hidden justify-center items-center gap-2 font-bold font-lg text-white bg-pointColor1 rounded-md`}
      onClick={onClick}
    >
      <ImExit />
      <span>{exitText}</span>
    </button>
  );
};

export default ExitButton;
