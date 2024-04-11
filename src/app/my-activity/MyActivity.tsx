'use client';

import { fetchUserQuizzes, getQuiz } from '@/api/quizzes';
import { useAuth } from '@/hooks/useAuth';
import { Quiz } from '@/types/quizzes';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { supabase } from '@/utils/supabase/supabase';
import { useEffect, useState } from 'react';

const MyActivity = () => {
  const { getCurrentUserProfile } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]); // 퀴즈 목록을 위한 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          return;
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (isLoggedIn) {
        try {
          const userProfile = await getCurrentUserProfile();
          if (userProfile && userProfile.email) {
            const fetchedQuizzes = await fetchUserQuizzes(userProfile.email);
            setQuizzes(fetchedQuizzes || []);
          }
        } catch (error) {
          console.error('퀴즈 불러오기 실패:', error);
        }
      }
    };

    fetchQuizzes();
  }, [isLoggedIn]);

  return (
    <main>
      <nav>
        <ul>
          <li>내가 만든 퀴즈</li>
        </ul>
      </nav>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>점수</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz, index) => (
            <tr key={index}>
              <td>{quiz.title}</td>
              <td>점수</td>
              <td>{formatToLocaleDateTimeString(quiz.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default MyActivity;
