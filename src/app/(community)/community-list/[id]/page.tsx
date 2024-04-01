// import usePostDetailDate from '@/hooks/post/usePost';
import usePostDetailDate from '@/hooks/post/usePost';
import { createClient } from '@/utils/supabase/create-client';

const page = async () => {
  // {params} : { params: { id: string}}
  const supabase = createClient();
  const postId = 'ebe05c47-de04-4e23-a382-f8f43c298a73';

  const { data, isLoading } = usePostDetailDate(postId);
  // const id = params.id

  // const postDetailDate = () => {
  //   const supabase = createClient();
  //   const fetchPost = async () => {
  //     try {
  //       const { data: posts, error } = await supabase.from('posts').select('*').eq('id', postId);
  //       if (error) throw error;
  //       console.log('posts', posts);
  //       return posts![0];
  //     } catch (error) {
  //       throw error;
  //     }
  //   };
  //   fetchPost();
  // };

  // postDetailDate();

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      {data?.map((prev) => {
        return <div>prev.title</div>;
      })}
    </div>
  );
};

export default page;