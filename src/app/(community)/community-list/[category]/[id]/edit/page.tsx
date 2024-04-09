import EditForm from "@/app/(community)/(components)/EditForm";
import { supabase } from "@/utils/supabase/supabase";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;

  const fetchPost = async () => {
    try {
      const { data: posts, error } = await supabase.from('posts').select('*').eq('id', postId);
      if (error) throw error;
      console.log(posts);
      return posts![0];
    } catch (error) {
      console.error();
      throw error;
    }
  };
  const posts = await fetchPost();
  const { title, content, imageUrl, category } = posts;

  return (
    <div>
      <EditForm postId={postId} prevTitle={title} prevContent={content} prevImageUrls={imageUrl} prevCategory={category}/>
    </div>
  )
}

export default EditPage