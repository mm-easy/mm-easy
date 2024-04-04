import { supabase } from '@/utils/supabase/supabase';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const Like = ({ postId }: { postId: string | string[] }) => {
  const [likes, setLikes] = useState<boolean | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);

  const { getCurrentUserProfile } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  const userId = profile?.id;

  useEffect(() => {
    const likedStatus = async () => {
      const { data: likedUser, error } = await supabase.from('likes').select('*').eq('post_id', postId);

      if (error) {
        console.error('정보를 가져오지 못 하고 있습니다.', error);
        return;
      }

      const likedUserNow = likedUser.some((prev) => prev.user_id === userId);
      // console.log('user', userId);
      // console.log('now', likedUser?.length);

      if (likedUserNow) {
        setLikes(true);
      } else {
        setLikes(false);
      }
      setLikeCount(likedUser?.length);
    };

    likedStatus();
  }, [userId, postId]);

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

  const addLikedUser = async (postId: string | string[], userId: string) => {
    const { data, error } = await supabase.from('likes').insert({ user_id: userId, post_id: postId }).select();
    // .update({ user_id: [...liketest, userId] })
    // .eq('post_id', postId)

    if (error) {
      throw error;
    }
  };

  const removeLikedUser = async (postId: string | string[], userId: string) => {
    const { data, error } = await supabase.from('likes').delete().eq('user_id', userId);
    // .from('likes')
    // .update({ user_id: liketest.filter((id) => id !== userId) })
    // .eq('post_id', postId)
    // .select();

    if (error) {
      throw error;
    }
  };

  return (
    <div className="flex w-full justify-between">
      {/* <p className="text-gray-400">
        {new Date(todo.created_at).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })}
      </p> */}
      <div className="flex">
        <ToggleButton
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

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};

const ToggleButton = ({ toggled, onToggle, onIcon, offIcon }: Props) => {
  return (
    <div>
      <button onClick={() => onToggle(!toggled)}>{toggled ? onIcon : offIcon}</button>
    </div>
  );
};
