'use client';

import { getPosts } from '@/api/posts';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { CommunityFormProps, Post } from '@/types/posts';

const CommunityForm = ({ selectedCategory }: CommunityFormProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const offset = (currentPage - 1) * postsPerPage;
      const loadedPosts = await getPosts(offset, postsPerPage);
      setPosts(loadedPosts);
    };

    fetchPosts();
  }, [currentPage, selectedCategory]);


  const navigateToDetailPost = (post: any) => {
    router.push(`/community-list/${post.id}`);
  };

  const truncateTitle = (title: any) => {
    return title.length > 20 ? title.substring(0, 25) + '...' : title;
  };

  const filteredPosts =
    selectedCategory === '전체' ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <article className="flex w-full">
      <div className="bg-white p-4 w-full ">
        <table className="w-full">
          <thead className="text-left">
            <tr className=" text-pointColor1 font-bold border-b-2 border-solid border-pointColor1">
              <th className='p-4'>구분</th>
              <th>닉네임</th>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody className="">
            {filteredPosts.map((post) => (
              <tr
                className=" bg-white cursor-pointer border-y border-solid border-pointColor1"
                key={post.id}
                onClick={() => navigateToDetailPost(post)}
              >
                <td className='p-3 pr-12 w-24'>{post.category}</td>
                <td className='pr-10'>{post.profiles.nickname || '알 수 없음'}</td>
                <td>{truncateTitle(post.title)}</td>
                <td>{formatToLocaleDateTimeString(post.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            이전
          </button>
          <button onClick={() => setCurrentPage(currentPage + 1)}>
            다음
          </button>
        </div>
    </article>
  );
};
export default CommunityForm;
