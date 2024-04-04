import LikeToggleButton from './LikeToggleButton';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase/supabase';
import { useAuth } from '@/hooks/useAuth';

const Like = ({ postId }: { postId: string | string[] }) => {
  const [likes, setLikes] = useState<boolean | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);

  /**현재 로그인된 유저 정보 가져오기*/
  const { getCurrentUserProfile } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

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
      await removeLikedUser(postId, userId);
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
  const removeLikedUser = async (postId: string | string[], userId: string) => {
    const { error } = await supabase.from('likes').delete().eq('user_id', userId);

    if (error) {
      throw error;
    }
  };

  return (
    <div className="flex w-full justify-between">
      <div className="flex">
        <LikeToggleButton
          toggled={likes ?? false}
          onToggle={handleLikeToggle}
          onIcon={<AiFillHeart />}
          offIcon={<AiOutlineHeart />}
        />
        <p className="ml-[5px]">{likeCount}</p>
      </div>
    </div>
  );
};

export default Like;
