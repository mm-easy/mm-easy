'use client'

import { useState } from "react";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('posts')

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
      <tbody>
        {/* {currentItems?.map((item, idx) => { */}
          {/* return ( */}
            <tr
              className="bg-bg-bgColor2 cursor-pointer"
              // key={idx}
              // onClick={() => navigateToDetailPost(item)}
            >
              <td className="p-4 w-24"></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          {/* ); */}
        {/* })} */}
      </tbody>
    </table>
  </div>
  </article>
)
};

export default AdminPage;
