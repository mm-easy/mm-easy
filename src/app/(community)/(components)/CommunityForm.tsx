'use client';

import { getPosts } from '@/api/posts';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { CommunityFormProps, Post } from '@/types/posts';

const CommunityForm = ({ selectedCategory }: CommunityFormProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const loadedPosts = await getPosts();
      setPosts(loadedPosts);
    };

    fetchPosts();
  }, []);

  const navigateToDetailPost = (post: any) => {
    router.push(`/community-detail/${post.id}`);
  };

  const filteredPosts =
    selectedCategory === '전체' ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <article className="flex justify-center items-center">
      <div className="bg-white p-4">
        <table className="border-solid border">
          <thead className="text-left">
            <tr className="">
              <th>구분</th>
              <th>닉네임</th>
              <th>제목</th>
              <th>내용</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody className="">
            {filteredPosts.map((post) => (
              <tr className="bg-white p-4 border-solid border cursor-pointer" key={post.id} onClick={navigateToDetailPost}>
                <td>{post.category}</td>
                <td>{post.profiles.nickname || '알 수 없음'}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{formatToLocaleDateTimeString(post.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};
export default CommunityForm;
