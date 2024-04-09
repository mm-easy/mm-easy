'use client';

import EditForm from '@/app/(community)/(components)/EditForm';
import { supabase } from '@/utils/supabase/supabase';
import { useEffect, useState } from 'react';

import type { Post } from '@/types/posts';

const EditPage = ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: posts, error } = await supabase.from('posts').select('*').eq('id', postId);

        if (error) throw error;
        setPost(posts[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <EditForm
        postId={postId}
        prevTitle={post.title}
        prevContent={post.content}
        prevImageUrls={post.imageUrl}
        prevCategory={post.category}
        prevAuthorId={post.author_id}
      />
    </div>
  );
};

export default EditPage;
