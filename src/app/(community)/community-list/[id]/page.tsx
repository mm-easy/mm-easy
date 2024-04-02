'use client';

import { usePostDetailDate } from '@/hooks/post/usePost';
import { supabase } from '@/utils/supabase/supabase';
import { useParams } from 'next/navigation';

const page = () => {
  const params = useParams();

  const { data, isLoading } = usePostDetailDate(params.id);

  const postDetailUserDate = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', '31c887a9-874b-4142-bc8e-8440f5bb9025');
      if (error) throw error;
      return profiles![0];
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  postDetailUserDate();

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      {data && (
        <>
          <p>{data.title}</p>
          <p>{data.content}</p>
          <p>{data.attached_img_url}</p>
        </>
      )}
    </div>
  );
};

export default page;
