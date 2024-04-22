'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase/supabase';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { getPostsReports, getQuizzesReports } from '@/api/reports';
import LoadingImg from '@/components/common/LoadingImg';
import useMultilingual from '@/utils/useMultilingual';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const m = useMultilingual('admin');
  const [activeTab, setActiveTab] = useState('posts');
  const { getCurrentUserProfile } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: userProfile,
    isLoading: isProfileLoading,
    isError: isProfileError
  } = useQuery({
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

  if (quizLoading || postsLoading || isProfileLoading) {
    return <LoadingImg height="84vh" />;
  }

  // 에러가 발생했거나 로그인한 사용자가 없거나 특정 이메일이 아닐 경우 로그인 페이지로 리다이렉트
  if (isProfileError || !userProfile || userProfile.email !== 'daejang@mmeasy.com') {
    router.push('/');
    alert('접근할 수 없습니다.');
  }

  const deduplicatedQuizReports = quizReports?.filter((report, index, self) => {
    // self : quizReports
    return index === self.findIndex((t) => t.target_id === report.target_id);
  });

  const deduplicatedPostsReports = postsReports?.filter((report, index, self) => {
    // self : quizReports
    return index === self.findIndex((t) => t.target_id === report.target_id);
  });

  const handleDelete = async (id: string | undefined, target_id: string | undefined) => {
    try {
      const { error: adminError } = await supabase.from('reports').update({ status: true }).eq('id', id);

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

      toast.success(m('NOTIFY_TO_DELETE'));
    } catch (error) {
      console.error('삭제 중 오류:', error);
    }
  };

  const handleRestore = async (id: string | undefined, target_id: string | undefined) => {
    try {
      const { error: adminError } = await supabase.from('reports').update({ status: false }).eq('id', id);

      if (adminError) throw adminError;

      const { error: postsError } = await supabase.from('posts').update({ deleted_at: null }).eq('id', target_id);

      if (postsError) throw postsError;

      const { error: quizzesError } = await supabase.from('quizzes').update({ deleted_at: null }).eq('id', target_id);

      if (quizzesError) throw quizzesError;

      await queryClient.invalidateQueries({ queryKey: ['getquizreports'] });
      await queryClient.invalidateQueries({ queryKey: ['getpostsreports'] });

      toast.success(m('NOTIFY_TO_RESTORE'));
    } catch (error) {
      console.error('복구 중 오류:', error);
    }
  };

  return (
    <main className="h-[84vh] px-[10%] flex flex-col justify-center items-center  bg-bgColor2">
      {userProfile?.email === 'daejang@mmeasy.com' && (
        <>
          <nav className="w-full flex pb-[4vh] justify-center text-pointColor1 font-medium  border-solid border-pointColor1 cursor-pointer">
            <ul className="w-full flex justify-center text-xl text-center border-b-2 border-solid">
              <li
                className={`w-[50%] pb-3 ${activeTab === 'posts' && 'font-bold border-solid border-b-3'}`}
                onClick={() => setActiveTab('posts')}
              >
                {m('HEADER_POST')}
              </li>
              <li
                className={`w-[50%] pb-3 ${activeTab === 'quizzes' && 'font-bold  border-solid border-b-3'}`}
                onClick={() => setActiveTab('quizzes')}
              >
                {m('HEADER_QUIZ')}
              </li>
            </ul>
          </nav>
          <article className="w-full h-[calc(302px+16vh)]">
            <table className="w-full">
              <thead className="text-left">
                <tr className="text-pointColor1 text-lg font-bold border-b-2 border-solid border-pointColor1">
                  <th className="pb-2 w-[15%]">{m('STATUS')}</th>
                  <th className="w-[25%]">{m('WRITER_EMAIL')}</th>
                  <th className="w-[35%]">{m('TITLE')}</th>
                  <th className="w-[15%]">{m('DATE_REPORTED')}</th>
                </tr>
              </thead>
              {activeTab === 'posts' && (
                <tbody className="font-medium">
                  {deduplicatedPostsReports?.map((item, idx) => {
                    return (
                      <tr key={idx} className="border-b border-solid border-grayColor2">
                        <td>{item.status === false ? m('STATUS_PROCESS') : m('STATUS_COMPLETED')}</td>
                        <td>{item.reported_user_id || '알 수 없음'}</td>
                        <td className="truncate max-w-xs cursor-pointer">
                          <a href={`/community/list/전체/${item.target_id}`}>{item['title']}</a>
                        </td>
                        <td>{formatToLocaleDateTimeString(item['created_at'])}</td>
                        <td className="text-right py-[1vh]">
                          {item.status === false ? (
                            <button
                              onClick={() => handleDelete(item.id, item.target_id as string)}
                              className="w-28 h-8 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                              {m('DELETE_BTN')}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRestore(item.id, item.target_id as string)}
                              className="w-28 h-8 bg-pointColor1 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pointColor1 focus:ring-opacity-50"
                            >
                              {m('RESTORE_BTN')}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}

              {activeTab === 'quizzes' && (
                <tbody className="font-medium">
                  {deduplicatedQuizReports?.map((item, idx) => {
                    return (
                      <tr key={idx} className="border-b border-solid border-grayColor2">
                        <td>{item.status === false ? m('STATUS_PROCESS') : m('STATUS_COMPLETED')}</td>
                        <td>{item.reported_user_id || '알 수 없음'}</td>
                        <td className="truncate max-w-xs cursor-pointer">
                          <a href={`/quiz/${item.target_id}`}>{item['title']}</a>
                        </td>
                        <td>{formatToLocaleDateTimeString(item['created_at'])}</td>
                        <td className="text-right py-[1vh]">
                          {item.status === false ? (
                            <button
                              onClick={() => handleDelete(item.id, item.target_id as string)}
                              className="w-28 h-8 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                              {m('DELETE_BTN')}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRestore(item.id, item.target_id as string)}
                              className="w-28 h-8 bg-pointColor1 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pointColor1 focus:ring-opacity-50"
                            >
                              {m('RESTORE_BTN')}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </article>
        </>
      )}
    </main>
  );
};

export default AdminPage;
