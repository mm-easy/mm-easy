import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/api/posts';

const page = () => {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <div>Loading...</div>; 
  if (isError) return <div>Error fetching data</div>;

  const postList = posts || [];

  return (
    <div>
      {postList.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default page;
