import { supabase } from '@/utils/supabase/supabase';
import { Box, Button, TextArea } from '@radix-ui/themes';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const CommentForm = ({ postId }: { postId: string | undefined}) => {
  const [content, setContent] = useState('');

  const handleSubmitBtn = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('comments')
      .insert([{ author_id: , post_id: postId, content }])
      .select();

    if (data) {
      console.log('ddata', data);
      alert('성공');
    }
    console.log(error);
  };



  return (
    <div>
      <form onSubmit={handleSubmitBtn}>
        {/* {user?.nickname}
        {user?.avatar_img_url} */}
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
    </div>
  );
};

export default CommentForm;
