import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase/supabase';
import { Box, Button, TextArea } from '@radix-ui/themes';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const CommentForm = ({ postId }: { postId: string | undefined }) => {
  const [content, setContent] = useState('');
  const { getCurrentUserProfile } = useAuth();

  const {
    data: profile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  const handleSubmitBtn = async (e: React.FormEvent, id: string) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('comments')
      .insert([{ author_id: id, post_id: postId, content }])
      .select();

    if (data) {
      alert('성공');
    }
    console.log(error);
  };

  return (
    <div>
      {profile && (
        <form onSubmit={(e) => handleSubmitBtn(e, profile.id)}>
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
