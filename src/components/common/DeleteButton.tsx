import { handleDeleteBtn } from '@/api/comments';
import { removeCommunityPost } from '@/api/posts';
import { FormCommentButtonProps, FormPostButtonProps } from '@/types/posts';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const PostDeleteButton: React.FC<FormPostButtonProps> = ({ text, width, height, postId, redirectUrl }) => {
  const router = useRouter();

  const handleDeleteClick = async () => {
    if (window.confirm('정말 해당 게시글을 삭제하시겠습니까?')) {
      try {
        await removeCommunityPost(postId);
        toast("게시글이 삭제되었습니다.")
        if (redirectUrl) {
          router.replace(redirectUrl);
        }
      } catch (error) {
        throw error;
      }
    } else return;
  };

  return (
    <button
      type="submit"
      onClick={handleDeleteClick}
      className={`font-bold rounded-md text-white border-solid p-2 border border-pointColor1 bg-pointColor1 ${width} ${height}`}
    >
      {text}
    </button>
  );
};


export const CommentDeleteBtn: React.FC<FormCommentButtonProps> = ({ text, width, height, userId, redirectUrl }) => {
  const router = useRouter();

  const handleDeleteClick = async () => {
    if (window.confirm('정말 해당 댓글을 삭제하시겠습니까?')) {
      try {
        await handleDeleteBtn(userId);
        toast("게시글이 삭제되었습니다.")
        if (redirectUrl) {
          router.replace(redirectUrl);
        }
      } catch (error) {
        throw error;
      }
    } else return;
  };

  return (
    <button
      type="submit"
      onClick={handleDeleteClick}
      className={`font-bold rounded-md text-white border-solid p-2 border border-pointColor1 bg-pointColor1 ${width} ${height}`}
    >
      {text}
    </button>
  );
};
