import { removeCommunityPost } from '@/api/posts';
import { FormButtonProps } from '@/types/posts';
import { useRouter } from 'next/navigation';

export const PostDeleteButton: React.FC<FormButtonProps> = ({ text, width, postId, redirectUrl }) => {
  const router = useRouter();

  const handleDeleteClick = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await removeCommunityPost(postId);
        router.replace(redirectUrl);
      } catch (error) {
        throw error;
      }
    } else return;
  };

  return (
    <button
      type="submit"
      onClick={handleDeleteClick}
      className={`rounded-md text-pointColor1 border-solid p-2 border border-pointColor1 bg-white ${width}`}
    >
      {text}
    </button>
  );
};
