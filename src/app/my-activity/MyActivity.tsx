'use client';

import { getMyActivityPosts } from '@/api/posts';
import { fetchUserQuizzes, getQuiz } from '@/api/quizzes';
import { useAuth } from '@/hooks/useAuth';
import { Post } from '@/types/posts';
import { Quiz } from '@/types/quizzes';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { supabase } from '@/utils/supabase/supabase';
import { useEffect, useState } from 'react';

const MyActivity = () => {
  const { getCurrentUserProfile } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState('quizzes'); // 활성 탭 상태

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

    if (activeTab === 'quizzes') {
      fetchQuizzes();
    }
  }, [isLoggedIn, activeTab]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (isLoggedIn) {
        try {
          const userProfile = await getCurrentUserProfile();
          if (userProfile && userProfile.id) {
            const myPosts = await getMyActivityPosts(userProfile.id);
            setMyPosts(myPosts || []);
          }
        } catch (error) {
          console.error('내 글 불러오기 실패:', error);
        }
      }
    };

    if (activeTab === 'posts') {
      fetchMyPosts();
    }
  }, [isLoggedIn, activeTab]);

  return (
    <main>
      <div>
        <p>나의 활동</p>
      </div>
      <nav>
        <ul>
          <li onClick={() => setActiveTab('quizzes')}>내가 만든 퀴즈</li>
          <li onClick={() => setActiveTab('posts')}>내가 쓴 글</li>
        </ul>
      </nav>
      {activeTab === 'quizzes' && (
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
      )}
      {activeTab === 'posts' && (
        <div>
         {myPosts.map((post, index) => (
              <tr key={index}>
                <td>{post.title}</td>
                <td>{formatToLocaleDateTimeString(post.created_at)}</td>
              </tr>
            ))}
        </div>
      )}
    </main>
  );
};

export default MyActivity;
