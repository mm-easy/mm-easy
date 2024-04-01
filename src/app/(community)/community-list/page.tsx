import { getPosts } from '@/api/posts';
const page = async () => {
  const posts = await getPosts();
  console.log('posts', posts);
  return (
    <article>
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
export default page;
