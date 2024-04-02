'use client';

import { usePostDetailDate, usePostDetailUserDate } from '@/hooks/post/usePost';
import { useParams } from 'next/navigation';

const page = () => {
  const params = useParams();

  const { data, isLoading } = usePostDetailDate(params.id);

  const { data: user } = usePostDetailUserDate(data?.author_id);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      {data && (
        <>
          <p>{user?.nickname}</p>
          <p>{user?.avatar_img_url}</p>
          <p>{data.title}</p>
          <p>{data.content}</p>
          <p>{data.attached_img_url}</p>
        </>
      )}
    </div>
  );
};

export default page;
