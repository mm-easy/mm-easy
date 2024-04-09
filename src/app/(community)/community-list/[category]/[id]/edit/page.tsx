'use client'

import EditForm from "@/app/(community)/(components)/EditForm";
import { Post } from "@/types/posts";
import { supabase } from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";

const EditPage = ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: posts, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId);

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
      <EditForm  postId={postId}
        prevTitle={post.title}
        prevContent={post.content}
        prevImageUrls={post.imageUrl}
        prevCategory={post.category}/>
    </div>
  )
}

export default EditPage