import LikeToggleButton from './LikeToggleButton';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { supabase } from '@/utils/supabase/supabase';

import type { LikeProps } from '@/types/posts';

const Like: React.FC<LikeProps> = ({ postId, profile }) => {
  const [likes, setLikes] = useState<boolean | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);

  const userId = profile?.id;

  /**현재 게시글에 좋아요 상태 불러오기*/
  useEffect(() => {
    const likedStatus = async () => {
      const { data: likedUser, error } = await supabase.from('likes').select('*').eq('post_id', postId);

      if (error) {
        console.error('정보를 가져오지 못 하고 있습니다.', error);
        return;
      }

      const likedUserNow = likedUser.some((prev) => prev.user_id === userId);

      if (likedUserNow) {
        setLikes(true);
      } else {
        setLikes(false);
      }
      setLikeCount(likedUser?.length);
    };

    likedStatus();
  }, [userId, postId]);

  /**좋아요 토글*/
  const handleLikeToggle = async () => {
    if (!userId) {
      toast.warning('로그인 후 이용해 주세요.');
      return;
    }

    if (likes) {
      await removeLikedUser(userId);
      setLikes(false);
      setLikeCount(likeCount - 1);
    } else {
      await addLikedUser(postId, userId);
      setLikes(true);
      setLikeCount(likeCount + 1);
    }
    setLikes(!likes);
  };

  /**좋아요 하기*/
  const addLikedUser = async (postId: string | string[], userId: string) => {
    const { error } = await supabase.from('likes').insert({ user_id: userId, post_id: postId }).select();
    if (error) {
      throw error;
    }
  };

  /**좋아요 삭제*/
  const removeLikedUser = async (userId: string) => {
    const { error } = await supabase.from('likes').delete().eq('user_id', userId);

    if (error) {
      throw error;
    }
  };

  return (
    <div className="flex w-full justify-between">
      <div className="flex pt-[2px]">
        <LikeToggleButton
          toggled={likes ?? false}
          onToggle={handleLikeToggle}
          onIcon={<AiFillHeart />}
          offIcon={<AiOutlineHeart />}
        />
      </div>
      <p className="ml-[5px] h-8">좋아요 {likeCount}</p>
    </div>
  );
};

export default Like;
