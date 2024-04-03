import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase/supabase';
import { Box, Button, TextArea } from '@radix-ui/themes';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const CommentForm = ({ postId }: { postId: string | undefined }) => {
  const [content, setContent] = useState('');
  const { getCurrentUserProfile } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  const handleSubmitBtn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) {
      alert('사용자 정보가 없습니다.');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([{ author_id: profile.id, post_id: postId, content }])
      .select();

    if (error) {
      console.error('게시물 추가 중 오류가 발생했습니다:', error.message);
      alert('게시물 추가 중 오류가 발생했습니다.');
    } else {
      alert('게시물이 등록되었습니다.');
    }
  };

  return (
    <div>
      {profile && (
        <form onSubmit={handleSubmitBtn}>
          {profile.avatar_img_url}
          {profile.nickname}
          <Box maxWidth="200px">
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              variant="classic"
              placeholder="Reply to comment…"
            />
          </Box>
          <Button type="submit" color="gray" variant="surface">
            등록
          </Button>
        </form>
      )}
    </div>
  );
};

export default CommentForm;
