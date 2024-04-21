import useMultilingual from '@/utils/useMultilingual';
import { handleDeleteBtn } from '@/api/comments';
import { removeCommunityPost } from '@/api/posts';
import { FormCommentButtonProps, FormPostButtonProps } from '@/types/posts';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { langAtom } from '@/store/store';
import { useAtom } from 'jotai';

export const PostDeleteButton: React.FC<FormPostButtonProps> = ({ text, width, height, postId, redirectUrl }) => {
  const [lang] = useAtom(langAtom);
  const m = useMultilingual(lang, 'communityPost');
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleDeleteClick = async () => {
    if (window.confirm(m('COMMUNITY_POST_DELETE'))) {
      try {
        await removeCommunityPost(postId);
        toast(m('COMMUNITY_POST_DELETE_COMPLETE'))
        if (redirectUrl) {
          router.replace(redirectUrl);
        }
        queryClient.invalidateQueries({ queryKey: ['userPosts'] });
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
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleDeleteClick = async () => {
    if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
      try {
        await handleDeleteBtn(userId);
        toast("댓글이 삭제되었습니다.")
        if (redirectUrl) {
          router.replace(redirectUrl);
        }
        queryClient.invalidateQueries({ queryKey: ['userComments'] });
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
