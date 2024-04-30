import { useRouter } from 'next/navigation';
import { FormPostButtonProps } from '@/types/posts';

export const PostEditButton: React.FC<FormPostButtonProps> = ({ text, width, height, redirectUrl }) => {
  const router = useRouter();

  const handleEditClick = () => {
    if (redirectUrl) {
      router.replace(redirectUrl);
    }
  };

  return (
    <button
      type="submit"
      onClick={handleEditClick}
      className={`sm:w-full font-bold rounded-md text-pointColor1 border-solid p-2 border border-pointColor1 bg-white sm:font-bold sm:text-pointColor1 sm:border-0 sm:bg-transparent ${width} ${height}`}
    >
      {text}
    </button>
  );
};
