import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase/supabase';
import { Box, TextArea } from '@radix-ui/themes';

const CommentForm = ({ postId }: { postId: string | string[] | undefined }) => {
  const [content, setContent] = useState('');
  const { getCurrentUserProfile } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  const handleSubmitBtn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) {
      toast.warning('로그인후 작성해주세요');
      setContent('');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([{ author_id: profile.id, post_id: postId, content }])
      .select();

    if (error) {
      toast.error('게시물 추가 중 오류가 발생했습니다.');
    } else {
      toast.success('게시물이 등록되었습니다.');
      setContent('');
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmitBtn}>
        {profile?.avatar_img_url}
        {profile?.nickname}
        <Box maxWidth="w-full">
          <TextArea
            className="border-solid border-2 border-pointColor1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="classic"
            placeholder="Reply to comment…"
          />
        </Box>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default CommentForm;
