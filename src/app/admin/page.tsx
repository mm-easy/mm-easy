'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getQuizzesReports, getPostsReports } from '@/api/admin';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { supabase } from '@/utils/supabase/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const { getCurrentUserProfile } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter()

  const { data: userProfile, isLoading: isProfileLoading, isError: isProfileError} = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  const { data: quizReports, isLoading: quizLoading } = useQuery({
    queryKey: ['getquizreports'],
    queryFn: getQuizzesReports
  });

  const { data: postsReports, isLoading: postsLoading } = useQuery({
    queryKey: ['getpostsreports'],
    queryFn: getPostsReports
  });

  if (quizLoading || postsLoading) {
    return <div>로딩중..</div>;
  }

  if (isProfileLoading) {
    return <div>로딩중...</div>;
  }

  // 에러가 발생했거나 로그인한 사용자가 없거나 특정 이메일이 아닐 경우 로그인 페이지로 리다이렉트
  if (isProfileError || !userProfile || userProfile.email !== 'daejang@mmeasy.com') {
    router.push("/login");
    alert('접근할 수 없습니다.');
  }

  const handleDelete = async (id: string | undefined, target_id: string | undefined) => {
    try {
      const { error: adminError } = await supabase.from('admin').update({ status: true }).eq('id', id);

      if (adminError) throw adminError;

      const currentTimestamp = new Date().toISOString();

      const { error: postsError } = await supabase
        .from('posts')
        .update({ deleted_at: currentTimestamp })
        .eq('id', target_id);

      if (postsError) throw postsError;

      const { error: quizzesError } = await supabase
        .from('quizzes')
        .update({ deleted_at: currentTimestamp })
        .eq('id', target_id);

      if (quizzesError) throw quizzesError;

      await queryClient.invalidateQueries({ queryKey: ['getquizreports'] });
      await queryClient.invalidateQueries({ queryKey: ['getpostsreports'] });
    } catch (error) {
      console.error('삭제 중 오류:', error);
    }
  };

  const handleRestore = async (id: string | undefined, target_id: string | undefined) => {
    try {
      const { error: adminError } = await supabase.from('admin').update({ status: false }).eq('id', id);

      if (adminError) throw adminError;

      const { error: postsError } = await supabase.from('posts').update({ deleted_at: null }).eq('id', target_id);

      if (postsError) throw postsError;

      const { error: quizzesError } = await supabase.from('quizzes').update({ deleted_at: null }).eq('id', target_id);

      if (quizzesError) throw quizzesError;

      await queryClient.invalidateQueries({ queryKey: ['getquizreports'] });
      await queryClient.invalidateQueries({ queryKey: ['getpostsreports'] });
    } catch (error) {
      console.error('복구 중 오류:', error);
    }
  };

  return (
    <article className="w-full p-40 bg-bgColor2">
      <nav className="flex px-4 justify-center text-pointColor1 font-medium  border-solid border-pointColor1 pb-16 cursor-pointer">
        <ul className="flex justify-center text-2xl w-full text-center border-b-2 border-solid ">
          <li
            className={`w-[50%] pb-6 ${activeTab === 'posts' ? 'font-bold border-solid border-b-3' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            게시글
          </li>
          <li
            className={`w-[50%] pb-6 ${activeTab === 'quizzes' ? 'font-bold  border-solid border-b-3' : ''}`}
            onClick={() => setActiveTab('quizzes')}
          >
            퀴즈
          </li>
        </ul>
      </nav>
      <div className="p-4 w-full bg-bgColor2">
        <table className="w-full text-xl bg-bgColor2">
          <thead className="text-left">
            <tr className="text-pointColor1 font-bold border-b-2 border-solid border-pointColor1">
              <th className="p-4 w-[15%]">구분</th>
              <th className="w-[20%]">이메일</th>
              <th className="w-[35%]">제목</th>
              <th className="w-[15%]">날짜</th>
              <th className="w-[15%]">처리</th>
            </tr>
          </thead>
          {activeTab === 'posts' && (
            <tbody>
              {postsReports?.map((item, idx) => {
                return (
                  <tr className="bg-bg-bgColor2" key={idx}>
                    <td className="pl-6 p-4">{item.status === false ? '처리 중' : '처리 완료'}</td>
                    <td>{item.reported_user_id || '알 수 없음'}</td>
                    <td className="truncate max-w-xs pr-8 cursor-pointer">
                      <a href={`/community-list/전체/${item.target_id}`}>{item['title']}</a>
                    </td>
                    <td>{formatToLocaleDateTimeString(item['created_at'])}</td>
                    <td>
                      {item.status === false ? (
                        <button onClick={() => handleDelete(item.id, item.target_id as string)}>삭제</button>
                      ) : (
                        <button onClick={() => handleRestore(item.id, item.target_id as string)}>복구</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}

          {activeTab === 'quizzes' && (
            <tbody>
              {quizReports?.map((item, idx) => {
                return (
                  <tr className="bg-bg-bgColor2" key={idx}>
                    <td className="pl-6 p-4">{item.status === false ? '처리 중' : '처리 완료'}</td>
                    <td>{item.reported_user_id || '알 수 없음'}</td>
                    <td className="truncate max-w-xs pr-8 cursor-pointer">
                      <a href={`/quiz/${item.target_id}`}>{item['title']}</a>
                    </td>
                    <td>{formatToLocaleDateTimeString(item['created_at'])}</td>
                    <td>
                      {item.status === false ? (
                        <button onClick={() => handleDelete(item.id, item.target_id as string)}>삭제</button>
                      ) : (
                        <button onClick={() => handleRestore(item.id, item.target_id as string)}>복구</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </article>
  );
};

export default AdminPage;
