'use client';

import usePostDetailDate from '@/hooks/post/usePost';
import { useParams } from 'next/navigation';

const page = () => {
  const params = useParams();

  const { data, isLoading } = usePostDetailDate(params.id);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return <div>{data && data.title}</div>;
};

export default page;
