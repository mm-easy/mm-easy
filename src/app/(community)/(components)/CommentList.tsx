// import { supabase } from '@/utils/supabase/supabase';
// import { useEffect, useState } from 'react';
// import { PostDetailCommentType } from '@/types/posts';

// const CommentList = () => {
//   const [postCommentList, setPostCommentList] = useState<PostDetailCommentType[]>([]);

//   useEffect(() => {
//     const commentList = async () => {
//       try {
//         const { data: comments, error } = await supabase.from('comments').select('*').eq('post_id', params.id);
//         if (error) throw error;
//         setPostCommentList(comments);
//       } catch (error) {
//         throw error;
//       }
//     };
//     commentList();
//   }, []);
//   return (
//     <div>
//       {postCommentList?.map((prev) => {
//         return <div key={prev.id}>{prev.content}</div>;
//       })}
//     </div>
//   );
// };

// export default CommentList;
