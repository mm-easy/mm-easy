'use client';

import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/api/posts';
import { formatToLocaleDateTimeString } from '@/utils/date';
const CommunityForm = () => {
  const {
    data: posts,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  const postList = posts || [];

  return (
    <>
      <article>
        <ul>
          {postList.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <time>{formatToLocaleDateTimeString(post.created_at)}</time>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
};
export default CommunityForm;
