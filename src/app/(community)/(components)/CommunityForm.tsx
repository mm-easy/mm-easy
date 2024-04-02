'use client';

import { getPosts } from '@/api/posts';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { Box, Container, Section } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
const CommunityForm = ({ selectedCategory }: CommunityFormProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const loadedPosts = await getPosts();
      setPosts(loadedPosts);
    };

    fetchPosts();
  }, []);

  const filteredPosts =
    selectedCategory === '전체' ? posts : posts.filter((post) => post.post_category === selectedCategory);

  return (
    <Box style={{ backgroundColor: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
      <Container>
        <ul>
          {filteredPosts.map((post) => (
            <Section size="2" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <time>{formatToLocaleDateTimeString(post.created_at)}</time>
            </Section>
          ))}
        </ul>
      </Container>
    </Box>
  );
};
export default CommunityForm;
