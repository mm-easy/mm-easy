import useMultilingual from '@/utils/useMultilingual';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useDeleteLike, useInsertLike } from '../../../mutations';
import { getLike } from '@/api/likes';
import LikeToggleButton from './LikeToggleButton';

import type { LikeParams, LikeProps, LikeType } from '@/types/posts';

const Like: React.FC<LikeProps> = ({ postId, profile }) => {
  const m = useMultilingual('communityDetail');

  const userId = profile?.id;
  const insertLike = useInsertLike();
  const deleteLike = useDeleteLike();

  /** 게시글 좋아요 */
  const { data: nowLike = [] } = useQuery<LikeType[]>({
    queryKey: ['like', postId],
    queryFn: async () => {
      try {
        const data = await getLike(postId);
        return data;
      } catch (error) {
        return [];
      }
    }
  });

  let likes = nowLike?.some((prev) => prev.user_id === userId);
  let likeCount = nowLike?.length;

  /**좋아요 토글*/
  const handleLikeToggle = async () => {
    if (!userId) {
      toast.warning(m('COMMUNITY_LIKE_CHECK_LOGIN'));
      return;
    }

    if (likes) {
      await removeLikedUser({ postId, userId });
      likes = false;
      likeCount = likeCount - 1;
    } else {
      await addLikedUser({ postId, userId });
      likes = true;
      likeCount = likeCount + 1;
    }
    likes = !likes;
  };

  /**좋아요 하기*/
  const addLikedUser = async ({ userId, postId }: LikeParams) => {
    insertLike.mutate({ userId, postId });
  };

  /**좋아요 삭제*/
  const removeLikedUser = async ({ userId, postId }: LikeParams) => {
    deleteLike.mutate({ userId, postId });
  };

  return (
    <div className="flex gap-1">
      <div>
        <LikeToggleButton
          toggled={likes ?? false}
          onToggle={handleLikeToggle}
          onIcon={<AiFillHeart />}
          offIcon={<AiOutlineHeart />}
        />
      </div>
      <p>
        {m('COMMUNITY_LIKES')} {likeCount}
      </p>
    </div>
  );
};

export default Like;
