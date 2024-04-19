'use client';

import Image from 'next/image';

import Infopeople from '@/assets/team/info_people.png';
import InfoIcon1 from '@/assets/info_icon_1.png';
import InfoIcon2 from '@/assets/info_icon_2.png';
import InfoIcon3 from '@/assets/info_icon_3.png';
import LogoHorizontal1 from '@/assets/logo_horizontal_1.png';
import { getPosts } from '@/api/posts';
import { getQuizzes } from '@/api/quizzes';
import { getUsers } from '@/api/users';
import { WhiteButton } from '@/components/common/FormButtons';
import { useQuery } from '@tanstack/react-query';

import type { Post } from '@/types/posts';
import type { Quiz } from '@/types/quizzes';
import type { User } from '@/types/users';
import { managerData } from '@/utils/managerData';
import UsageStatus from './UsageStatus';

const AboutPage = () => {
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

  const handleGitBtn = (git: string) => {
    window.open(git, '_blank');
  };

  const handleBlogBtn = (blog: string) => {
    window.open(blog, '_blank');
  };

  return (
    <main className="flex flex-col items-center text-center">
      <article className="w-full py-24 flex flex-col justify-center items-center bg-pointColor1">
        <h2 className="text-5xl pb-16 font-black text-white tracking-wider">재밌게 배우는 한국어!</h2>
        <Image src={Infopeople} alt="로고" width={800} quality={100} />
        <section className="text-3xl w-full text-white ">
          <section>
            <div className="py-16 flex justify-center items-center gap-6">
              <Image src={InfoIcon3} alt="로고" width={50} />
              <span className="text-white">직접 퀴즈를 만들면서 한국어 실력을 키워보세요!</span>
            </div>
          </section>
          <section>
            <div className="w-3/5 mx-auto py-16 flex justify-center items-center gap-6 border-t border-solid border-white">
              <Image src={InfoIcon2} alt="로고" width={50} />
              <span className="text-white">타자 연습으로 한국어에 익숙해져 보세요!</span>
            </div>
          </section>
          <section>
            <div className="w-3/5 mx-auto pt-16 flex justify-center items-center gap-6 border-t border-solid border-white">
              <Image src={InfoIcon1} alt="로고" width={50} />
              <span className="text-white">커뮤니티에서 소통하며 자신감을 길러보세요!</span>
            </div>
          </section>
        </section>
      </article>
      <article className="w-full py-14 bg-sky-50 border-b-2 border-solid border-pointColor1">
        <section
          className="pb-14 text-4xl font-extrabold text-pointColor1"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <Image src={LogoHorizontal1} alt="로고" width={200} quality={100} />
          <span className="ml-2 pt-2">에서 지금까지</span>
        </section>
        <section className="flex justify-center gap-[4vw]">
          <UsageStatus number={quizNum?.length} unit="개의" content="퀴즈가 만들어졌어요!" isBorderExist={false} />
          <UsageStatus number={postNum?.length} unit="개의" content="게시글이 작성되었어요!" isBorderExist={true} />
          <UsageStatus number={userNum?.length} unit="명의" content="사람들이 이용 중이에요!" isBorderExist={false} />
        </section>
      </article>
      <article className="flex flex-col text-xl font-bold w-5/6 pb-20">
        <h2 className="text-4xl font-extrabold py-16 text-pointColor1">유저후기</h2>
        <div className="flex flex-col flex-wrap">
          <div className="flex justify-center items-center w-full pl-10 relative z-10">
            <div className="flex flex-col ml-auto mb-6 w-3/5">
              <div className="about-userreview1 relative bg-white rounded-lg p-4 border border-solid border-pointColor1">
                <span className="">&quot;한국어 속도가 확 늘었어요~ 모두 타자 연습 게임 덕분!&quot;</span>
                <span className="text-pointColor1 text-base block mt-2">Elisa, 멕시코</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full pr-20 relative z-0 -mt-8">
            <div className="flex flex-col mr-auto mb-6 w-3/5">
              <div className="about-userreview2 bg-white rounded-lg p-4 border border-solid border-pointColor1">
                <span className="">&quot;이 사이트를 찾고 제 인생이 달라졌어요..! 쭈천 함미다!&quot;</span>
                <span className="text-pointColor1 text-base block mt-2">Bryan, 태국</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full pl-32 py-10">
            <div className="flex flex-col ml-auto mb-6 w-3/5">
              <div className="about-userreview3 bg-white rounded-lg  p-4 border border-solid border-pointColor1">
                <span className="">&quot;미루고 있던 한글 공부를 즐겁게 할 수 있었어요. 고맙습니다.&quot;</span>
                <span className="text-pointColor1 text-base block mt-2">Danaka, 일본</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full relative z-0">
            <div className="flex flex-col mr-auto mb-10 w-1/2">
              <div className="about-userreview4 bg-white rounded-lg p-4 border border-solid border-pointColor1">
                <span className="">&quot;퀴즈를 직접 만드는 것, 너무 흥미진진했어요!&quot;</span>
                <span className="text-pointColor1 text-base block mt-2">Danielle, 호주</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full relative z-10 -mt-12">
            <div className="flex flex-col ml-auto mb-4 w-3/5">
              <div className="about-userreview5 bg-white rounded-lg  p-4 border border-solid border-pointColor1">
                <span className="">
                  &quot;&apos;뭔말이지?&apos; 게임 퀴즈로, 한국어 이제 내 두 번째 언어 같은 느낌!&quot;
                </span>
                <span className="text-pointColor1 text-base block mt-2">Jonathan, 콩고</span>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="w-full mt-20 border-t-2 border-solid border-pointColor1 bg-bgColor1">
        <h2 className="text-pointColor1 text-4xl font-extrabold pt-16 pb-10">뭔말이지? 프로젝트에 참여한 사람들</h2>
        <h2 className="text-pointColor1 text-xl font-bold pb-14">Team Coding Zizon</h2>
        <div className="w-3/5 mx-auto grid grid-cols-3 sm:grid-cols-2 gap-x-64 mb-10">
          {managerData.map((member) => {
            return (
              <div key={member.name} className="">
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="w-[240px] h-[240px] bg-bgColor2 rounded-full flex items-center justify-center overflow-hidden border border-solid border-pointColor1">
                    <Image
                      src={member.img}
                      alt="프로필 이미지"
                      width={240}
                      height={240}
                      quality={100}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="w-40 my-4 font-bold text-2xl">{member.name}</h3>
                  <span className="w-[25vw] truncate">{member.content1}</span>
                  <span className="w-[25vw] truncate">{member.content2}</span>
                </div>
                <div className="my-8">
                  {member.Github ? (
                    <div className="flex gap-2 items-center justify-center">
                      <WhiteButton onClick={() => handleGitBtn(member.Github)} text="Github" />
                      <WhiteButton onClick={() => handleBlogBtn(member.Blog)} text="Blog" />
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center justify-center">
                      <WhiteButton onClick={() => member.Behance && handleGitBtn(member.Behance)} text="Behance" />
                      <WhiteButton
                        onClick={() => member.Instagram && handleGitBtn(member.Instagram)}
                        text="Instagram"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </main>
  );
};

export default AboutPage;
