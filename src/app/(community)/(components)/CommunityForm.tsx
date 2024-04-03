'use client';

import { getPosts } from '@/api/posts';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { Box, Container, Section } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

import type { CommunityFormProps, Post } from '@/types/posts';

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
    selectedCategory === '전체' ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <>
      <div className='bg-gray-200 p-4'>
        <ul>
          {filteredPosts.map((post) => (
            <li className='bg-white p-4 border-solid border' key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <time>{formatToLocaleDateTimeString(post.created_at)}</time>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default CommunityForm;
