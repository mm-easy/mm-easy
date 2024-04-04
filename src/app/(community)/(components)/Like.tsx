import { supabase } from '@/utils/supabase/supabase';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const Like = ({ postId }: { postId: string | string[] }) => {
  const [likes, setLikes] = useState<boolean | null>(null);
  const [liketest, setLiketest] = useState<string[]>([]);

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

      if (likedUser?.user_id && likedUser.user_id.includes(userId)) {
        setLikes(true);
      } else {
        setLikes(false);
      }
      setLiketest(likedUser?.user_id || []);
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
      setLiketest((prevLiketest) => prevLiketest.filter((id) => id !== userId));
    } else {
      await addLikedUser(postId, userId);
      setLikes(true);
      setLiketest((prevLiketest) => [...prevLiketest, userId]);
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
    const { data, error } = await supabase.from('likes').delete().eq('id', id);
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
        <p className="ml-[5px]">{`${liketest?.length ?? 0}`}</p>
        {/* <div className="flex">
          <AiOutlineComment className="ml-[10px]" />
          <p className="ml-[5px]">{`${commentCount ?? 0}`}</p>
        </div> */}
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
