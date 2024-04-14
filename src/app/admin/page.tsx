'use client'

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getQuizzesReports, getPostsReports } from "@/api/admin";
import { formatToLocaleDateTimeString } from "@/utils/date";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('posts')
  const router = useRouter();

    const { data: quizReports, isLoading: quizLoading } = useQuery({
      queryKey: ['getquizreports'],
      queryFn: getQuizzesReports,
    });

    const { data: postsReports, isLoading: postsLoading } = useQuery({
      queryKey: ['getpostsreports'],
      queryFn: getPostsReports,
    });
  
    if (quizLoading || postsLoading) {
      return <div>로딩중..</div>;
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
          <th className="w-[20%]">닉네임</th>
          <th className="w-[35%]">제목</th>
          <th className="w-[15%]">날짜</th>
          <th className="w-[15%]">처리</th>
        </tr>
      </thead>
      {activeTab === 'posts' && (
      <tbody>
        {postsReports?.map((item, idx) => {
          return (
            <tr
              className="bg-bg-bgColor2"
              key={idx}
            >
               <td className="pl-6 p-4">게시글</td>
                  <td>{item.reported_user_id || '알 수 없음'}</td>
                  <td className="truncate max-w-xs pr-8 cursor-pointer" >
                    <a href={`/community-list/전체/${item.target_id}`}>{item['title']}</a>
                    </td>
                  <td>{formatToLocaleDateTimeString(item['created_at'])}</td>
                  <td>{item["status"]}</td>
            </tr>
          );
        })} 
      </tbody>
      )}

      {activeTab === 'quizzes' && (
      <tbody>
        {quizReports?.map((item, idx) => {
          return (
            <tr
              className="bg-bg-bgColor2"
              key={idx}
            >
               <td className="pl-6 p-4">퀴즈</td>
                  <td>{item.reported_user_id || '알 수 없음'}</td>
                  <td className="truncate max-w-xs pr-8 cursor-pointer">
                  <a href={`/quiz/${item.target_id}`}>{item['title']}</a>
                  </td>
                  <td>{formatToLocaleDateTimeString(item['created_at'])}</td>
                  <td>{item["status"]}</td>
            </tr>
          );
        })} 
      </tbody>
      )}
    </table>
  </div>
  </article>
)
};

export default AdminPage;
