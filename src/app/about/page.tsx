'use client';

import { getPosts } from '@/api/posts';
import { getQuizzes } from '@/api/quizzes';
import { getUsers } from '@/api/users';
import { WhiteButton } from '@/components/common/FormButtons';
import { Post } from '@/types/posts';
import { Quiz } from '@/types/quizzes';
import { User } from '@/types/users';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const AboutPage = () => {
  const router = useRouter();

  const { data: quizNum } = useQuery<Quiz[]>({
    queryFn: async () => {
      try {
        const data = await getQuizzes();
        return data;
      } catch (error) {
        return [];
      }
    },
    queryKey: ['quizzes'],
    refetchOnWindowFocus: false
  });

  const { data: postNum } = useQuery<Post[]>({
    queryFn: async () => {
      try {
        const data = await getPosts();
        return data;
      } catch (error) {
        return [];
      }
    },
    queryKey: ['posts'],
    refetchOnWindowFocus: false
  });

  const { data: userNum } = useQuery<User[]>({
    queryFn: async () => {
      try {
        const data = await getUsers();
        return data;
      } catch (error) {
        return [];
      }
    },
    queryKey: ['user'],
    refetchOnWindowFocus: false
  });

  const NowData = [
    { number: quizNum?.length, count: '개의', content: '퀴즈가 만들어졌어요!' },
    { number: postNum?.length, count: '개의', content: '게시글이 작성되었어요!' },
    { number: userNum?.length, count: '명의', content: '사람들이 이용 중이에요!' }
  ];

  const managerData = [
    {
      name: '김소현',
      content1: '좋은 분들과 함께 해서 행복했습니다!',
      content2: '즐겁게 이용해 주세요!',
      Github: 'https://github.com/aotoyae',
      Blog: 'https://aotoyae.tistory.com/'
    },
    {
      name: '김연재',
      content1: '원장님 사랑해요',
      content2: '혁우님도 사랑합니다',
      Github: 'https://github.com/porosadporosad',
      Blog: 'https://velog.io/@tmxk1594/posts'
    },
    {
      name: '김형민',
      content1: '눈에서 불이날것 같아요.',
      content2: '열심히 만들었으니 즐겨주시면 감사하겠습니다!',
      Github: 'https://github.com/C1oudys',
      Blog: 'https://velog.io/@kim9567/posts'
    },
    {
      name: '박재민',
      content1: '부족하지만 열심히 만들었습니다!',
      content2: '피드백은 언제나 환영입니다!',
      Github: 'https://github.com/ahddl622',
      Blog: 'https://velog.io/@ahddl622/posts'
    },
    {
      name: '박지영',
      content1: '개발하면서 뭔말이지? 23482번 외쳤습니다.',
      content2: '정말 너무 재밌고 즐거운 프로젝트였어요',
      Github: 'https://github.com/redberry0217',
      Blog: 'https://velog.io/@redberry0217/'
    },
    {
      name: '정예슬',
      content1: '좋은 분들과 함께 해서 행복했습니다!',
      content2: '즐겁게 이용해 주세요!',
      Behance: '',
      Instagram: ''
    }
  ];

  const handleGitBtn = (git: string) => {
    const pageNowReal = window.confirm('이동하시겠습니까?');
    if (pageNowReal) {
      router.push(git);
    } else {
      return;
    }
  };

  const handleBlogBtn = (blog: string) => {
    const pageNowReal = window.confirm('이동하시겠습니까?');
    if (pageNowReal) {
      router.push(blog);
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex flex-col bg-pointColor1 w-full">
        <h2 className="text-6xl font-bold mb-4">재밌게 배우는 한국어!</h2>
        <span>직접 퀴즈를 만들면서 한국어 실력을 키워보세요!</span>
        <span>타자 연습으로 한국어에 익숙해져 보세요!</span>
        <span>커뮤니티에서 소통하며 자신감을 길러보세요!</span>
      </div>
      <div className="  border-b border-solid border-pointColor1 w-full bg-sky-50">
        <h2 className="py-12 text-4xl font-bold text-pointColor1">뭔말이지?에서 지금까지</h2>
        <div className="flex justify-center py-10">
          {NowData.map((item, index) => {
            return (
              <div
                className={`w-[20%] py-8 px-20 ${
                  index === 1 ? 'border-l border-r border-solid border-pointColor1' : ''
                }`}
              >
                <div className="flex">
                  <div className="text-8xl font-semibold text-pointColor1">{item.number}</div>
                  <span className="mt-16 text-xl font-semibold">{item.count}</span>
                </div>
                <div className="text-xl font-semibold">{item.content}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col w-full text-xl ">
        <h2 className="text-4xl font-bold py-14 text-pointColor1">유저후기</h2>
        <div className="flex flex-col flex-wrap">
          <div className="flex justify-center items-center w-full pl-10">
            <div className="flex flex-col mr-auto mb-6 w-1/3">
              <div className="bg-white rounded p-4 border border-solid border-pointColor1">
                <span className="">“한국어 속도가 확 늘었어요~ 모두 타자 연습 게임 덕분!”</span>
              </div>
              <span className="text-base block mt-2">Elisa, 멕시코</span>
            </div>
          </div>
          <div className="flex justify-center items-center w-full pr-20">
            <div className="flex flex-col ml-auto mb-6 w-1/3">
              <div className="bg-white rounded p-4 border border-solid border-pointColor1">
                <span className="">"퀴즈를 직접 만드는 것, 너무 흥미진진했어요!"</span>
              </div>
              <span className="text-base block mt-2">Danielle, 호주</span>
            </div>
          </div>
          <div className="flex justify-center items-center w-full pl-32">
            <div className="flex flex-col mr-auto mb-6 w-1/3">
              <div className="bg-white rounded p-4 border border-solid border-pointColor1">
                <span className="">“이 사이트를 찾고 제 인생이 달라졌어요..! 쭈천 함미다!”</span>
              </div>
              <span className="text-base block mt-2">Bryan, 태국</span>
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col ml-auto mb-10 w-1/3">
              <div className="bg-white rounded p-4 border border-solid border-pointColor1">
                <span className="">“미루고 있던 한글 공부를 즐겁게 할 수 있었어요. 고맙습니다.”</span>
              </div>
              <span className="text-base block mt-2">Danaka, 일본</span>
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col mb-4">
              <div className="bg-white rounded p-4 border border-solid border-pointColor1">
                <span className="">"'뭔말이지?' 게임 퀴즈로, 한국어 이제 내 두 번째 언어 같은 느낌!"</span>
              </div>
              <span className="text-base block mt-2">Jonathan, 콩고</span>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-pointColor1">뭔말이지? 프로젝트에 참여한 사람들</h2>
      <div className="grid grid-cols-3 gap-4">
        {managerData.map((item) => {
          return (
            <div>
              <div className="flex flex-col gap-1">
                <h3 className="m-2 font-bold">{item.name}</h3>
                <span>{item.content1}</span>
                <span>{item.content2}</span>
              </div>
              <div className="m-3">
                {item.Github ? (
                  <>
                    <WhiteButton onClick={() => handleGitBtn(item.Github)} text="Github" width="w-24" />
                    <WhiteButton onClick={() => handleBlogBtn(item.Blog)} text="Blog" width="w-24" />
                  </>
                ) : (
                  <>
                    {/* <WhiteButton onClick={() => handleGitBtn(item.Behance)} text="Behance" width="w-24" />
                    <WhiteButton onClick={() => handleGitBtn(item.Instagram)} text="Instagram" width="w-24" /> */}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutPage;
