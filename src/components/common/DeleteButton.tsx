import useMultilingual from '@/utils/useMultilingual';
import { handleDeleteBtn } from '@/api/comments';
import { removeCommunityPost } from '@/api/posts';
import { FormCommentButtonProps, FormPostButtonProps } from '@/types/posts';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';

import type { PostParams } from '@/types/posts';

export const PostDeleteButton: React.FC<FormPostButtonProps> = ({ text, width, height, postId, redirectUrl }) => {
  const m = useMultilingual('communityPost');
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams<PostParams>();

  const handleDeleteClick = async () => {
    if (window.confirm(m('COMMUNITY_POST_DELETE'))) {
      try {
        await removeCommunityPost(postId);
        toast(m('COMMUNITY_POST_DELETE_COMPLETE'));
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
      className={`${
        params.id
          ? 'font-bold rounded-md text-white border-solid p-2 border border-pointColor1 bg-pointColor1 sm:font-normal sm:text-pointColor1 sm:border-0 sm:bg-transparent'
          : 'sm:rounded-sm font-bold rounded-md text-white border-solid p-2 border border-pointColor1 bg-pointColor1'
      } ${width} ${height}`}
    >
      {text}
    </button>
  );
};

export const CommentDeleteBtn: React.FC<FormCommentButtonProps> = ({ text, width, height, userId, redirectUrl }) => {
  const m = useMultilingual('communityPost');
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleDeleteClick = async () => {
    if (window.confirm(m('COMMUNITY_COMMENT_DELETE'))) {
      try {
        await handleDeleteBtn(userId);
        toast(m('COMMUNITY_COMMENT_DELETE_COMPLETE'));
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
      className={`sm:rounded-sm font-bold rounded-md text-white border-solid p-2 border border-pointColor1 bg-pointColor1 ${width} ${height}`}
    >
      {text}
    </button>
  );
};
