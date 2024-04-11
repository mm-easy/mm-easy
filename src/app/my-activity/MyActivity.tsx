// 'use client'

// import { fetchUserQuizzes, getQuiz } from "@/api/quizzes";
// import { useAuth } from "@/hooks/useAuth";
// import { Quiz } from "@/types/quizzes";
// import { supabase } from "@/utils/supabase/supabase";
// import { useEffect, useState } from "react";

// const MyActivity = () => {
//   const { getCurrentUserProfile } = useAuth()
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userQuizzes, setUserQuizzes] = useState<Quiz[]>([]);
//   const [activeTab, setActiveTab] = useState(''); 

//   // 로그인 상태 확인
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const getSession = await supabase.auth.getSession();
//   //       if (!getSession.data.session) {
//   //         return;
//   //       } else {
//   //         setIsLoggedIn(true);
//   //       }
//   //     } catch (error) {
//   //       console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   // // 로그인 되어 있다면 사용자 프로필 가져오기 및 퀴즈 불러오기
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     if (isLoggedIn) {
//   //       try {
//   //         const userProfile = await getCurrentUserProfile();
//   //         if (!userProfile) {
//   //           // userProfile이 null인 경우 처리
//   //           console.log('사용자 프로필을 찾을 수 없습니다.');
//   //           return;
//   //         }
//   //         console.log('로그인한 자의 프로필..', userProfile);
          
//   //         const quizzes = await getQuiz(userProfile.id) || [];
//   //         console.log("123",quizzes)
//   //         setUserQuizzes(quizzes);
//   //       } catch (error) {
//   //         console.error('사용자 퀴즈 불러오기 실패:', error);
//   //       }
//   //     }
//   //   };

//   //   fetchData();
//   // }, [isLoggedIn]);

// const getQuiz = async (id: string | string[]) => {
//   try {
//     const { data, error } = await supabase.from('quizzes').select('*').eq('id', id);
//     if (error) throw error;
//     return data;
//   } catch (error) {
//     console.error('퀴즈 데이터 받아오기 실패', error);
//     alert('일시적으로 퀴즈 데이터를 받아오지 못했습니다. 다시 시도하세요.');
//     throw error;
//   }
// };


//   // const loadAllQuizzes = async () => {
//   //   const quizzes = await getQuiz();
//   //   setUserQuizzes(quizzes);
//   // };

//   // 내가 만든 퀴즈 탭 클릭 핸들러
//   const handleMyQuizzesClick = () => {
//     setActiveTab('my-quizzes');
//     // loadAllQuizzes();
//   };

  
//   return (
//     <main>
//       {/* ... 기타 컴포넌트 ... */}
//       <nav>
//         <ul>
//           {/* ... 기타 탭 ... */}
//           <li onClick={handleMyQuizzesClick}>내가 만든 퀴즈</li>
//           {/* ... 기타 탭 ... */}
//         </ul>
//       </nav>
//       {activeTab === 'my-quizzes' && (
//         <table>
//           <thead>
//             <tr>
//               <th>제목</th>
//               <th>점수</th>
//               <th>날짜</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userQuizzes.map((quiz, index) => (
//               <tr key={index}>
//                 <td>{quiz.title}</td>
//                 <td>점수</td>
//                 {/* <td>{quiz.score}</td> */}
//                 <td>{quiz.creator_id}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </main>
//   );
// };

// export default MyActivity;
