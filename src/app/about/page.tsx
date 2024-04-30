'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UsageStatus from './UsageStatus';
import { getPosts } from '@/api/posts';
import { getQuizzes } from '@/api/quizzes';
import { getUsers } from '@/api/users';
import { WhiteButton } from '@/components/common/FormButtons';
import PageUpBtn from '@/components/common/PageUpBtn';
import useMultilingual from '@/utils/useMultilingual';
import { createManagerData } from '@/utils/managerData';
import Infopeople from '@/assets/team/info_people.png';
import InfoIcon1 from '@/assets/about/info_icon_b3.png';
import InfoIcon2 from '@/assets/about/info_icon_b2.png';
import InfoIcon3 from '@/assets/about/info_icon_b1.png';
import LogoHorizontal1 from '@/assets/logo/logo_horizontal_1.png';
import InfoDesign1 from '@/assets/about/info_design_1.png';
import InfoDesign2 from '@/assets/about/info_design_2.png';
import InfoDesign3 from '@/assets/about/info_design_3.png';
import InfoDesign4 from '@/assets/about/info_design_4.png';

import type { Post } from '@/types/posts';
import type { Quiz } from '@/types/quizzes';
import type { User } from '@/types/users';

const AboutPage = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const m = useMultilingual('about');
  const managerData = createManagerData(m);

  /** 퀴즈 만들어진 수 */
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

  /** 게시글 만들어진 수 */
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

  /** 회원가입 한 수 */
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

  /** git 이동 버튼 */
  const handleGitBtn = (git: string) => {
    window.open(git, '_blank');
  };

  /** blog 이동 버튼 */
  const handleBlogBtn = (blog: string) => {
    window.open(blog, '_blank');
  };

  /** 페이지업스크롤 */
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <main className="flex flex-col items-center text-center">
      {/** 재밌게 배우는 한국어 */}
      <article className="w-full py-24 flex flex-col justify-center items-center bg-bgColor2 sm:w-full sm:py-16">
        <h2 className="pb-16 text-5xl font-black text-pointColor1 tracking-wider sm:pb-12 sm:text-3xl">
          {m('ABOUT_TITLE1')}
        </h2>
        <Image src={Infopeople} alt="로고" quality={100} className="w-[800px] sm:w-[440px]" />
        <section className="w-full text-3xl text-pointColor1 font-bold sm:text-xl ">
          <section>
            <div className="py-16 flex justify-center items-center gap-6 sm:gap-2">
              <Image src={InfoIcon3} alt="로고" className="w-[50px] sm:w-[25px]" />
              <span className="text-pointColor1">{m('ABOUT_TITLE1_DETAIL1')}</span>
            </div>
          </section>
          <section>
            <div className="w-3/5 mx-auto py-16 flex justify-center items-center gap-6 border-t border-solid border-pointColor1 sm:w-full sm:gap-2">
              <Image src={InfoIcon2} alt="로고" className="w-[50px] sm:w-[25px]" />
              <span className="text-pointColor1">{m('ABOUT_TITLE1_DETAIL2')}</span>
            </div>
          </section>
          <section>
            <div className="w-3/5 mx-auto pt-16 flex justify-center items-center gap-6 border-t border-solid border-pointColor1 sm:w-full sm:gap-2">
              <Image src={InfoIcon1} alt="로고" className="w-[50px] sm:w-[25px]" />
              <span className="text-pointColor1">{m('ABOUT_TITLE1_DETAIL3')}</span>
            </div>
          </section>
        </section>
      </article>
      {/** 뭔말이지에서 지금까지 */}
      <article className="w-full py-14 border-t-2 border-b-2 border-solid border-pointColor1 sm:w-full sm:p-10">
        <section
          className="pb-14 text-4xl font-extrabold text-pointColor1 sm:text-3xl"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <Image src={LogoHorizontal1} alt="로고" quality={100} className="w-[200px] sm:w-[160px]" />
          <span className="ml-2 pt-2">{m('ABOUT_TITLE2')}</span>
        </section>
        <section className="flex justify-center gap-[4vw]">
          <UsageStatus
            number={quizNum?.length}
            unit={m('ABOUT_TITLE2_UNIT1')}
            content={m('ABOUT_TITLE2_CONTENT1')}
            isBorderExist={false}
          />
          <UsageStatus
            number={postNum?.length}
            unit={m('ABOUT_TITLE2_UNIT2')}
            content={m('ABOUT_TITLE2_CONTENT2')}
            isBorderExist={true}
          />
          <UsageStatus
            number={userNum?.length}
            unit={m('ABOUT_TITLE2_UNIT3')}
            content={m('ABOUT_TITLE2_CONTENT3')}
            isBorderExist={false}
          />
        </section>
      </article>
      {/** 유저후기 */}
      <article className="w-full pb-20 px-20 flex flex-col text-xl font-bold bg-bgColor4 sm:w-full sm:pb-10 sm:text-sm">
        <h2 className="py-16 text-4xl font-extrabold text-pointColor1 sm:py-10 sm:text-2xl">{m('ABOUT_TITLE3')}</h2>
        <div className="flex flex-col flex-wrap">
          <div className="w-full pl-10 flex justify-center items-center relative z-10 sm:w-full sm:pb-8 sm:pl-0">
            <div className="w-3/5 mb-6 ml-auto flex flex-col sm:w-full sm:ml-0 sm:mr-auto ">
              <div className="p-4 about-userreview1 relative bg-white rounded-lg border border-solid border-pointColor1">
                <span className="">&quot;{m('ABOUT_TITLE3_DETAIL1')}&quot;</span>
                <span className="mt-2 text-pointColor1 text-base block">
                  Elisa, {m('ABOUT_TITLE3_DETAIL1_COUNTRY1')}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full pr-20 -mt-8 flex justify-center items-center relative z-0 sm:w-full sm:pr-0 sm:pb-8 sm:mt-0">
            <div className="w-3/5 mr-auto mb-6 flex flex-col sm:w-full sm:ml-auto">
              <div className="p-4 about-userreview2 bg-white rounded-lg border border-solid border-pointColor1">
                <span className="">&quot;{m('ABOUT_TITLE3_DETAIL2')}&quot;</span>
                <span className="mt-2 text-pointColor1 text-base block">
                  Bryan, {m('ABOUT_TITLE3_DETAIL2_COUNTRY2')}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full pl-32 py-10 flex justify-center items-center sm:w-full sm:pl-0 sm:pb-8 sm:py-0">
            <div className="w-3/5 ml-auto mb-6 flex flex-col sm:w-full">
              <div className="p-4 about-userreview3 bg-white rounded-lg border border-solid border-pointColor1">
                <span className="">&quot;{m('ABOUT_TITLE3_DETAIL3')}&quot;</span>
                <span className="mt-2 text-pointColor1 text-base block">
                  Danaka, {m('ABOUT_TITLE3_DETAIL3_COUNTRY3')}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center relative z-0 sm:w-full sm:pb-8">
            <div className="w-1/2 mr-auto mb-10 flex flex-col sm:w-full">
              <div className="p-4 about-userreview4 bg-white rounded-lg border border-solid border-pointColor1">
                <span className="">&quot;{m('ABOUT_TITLE3_DETAIL4')}&quot;</span>
                <span className="mt-2 text-pointColor1 text-base block">
                  Danielle, {m('ABOUT_TITLE3_DETAIL4_COUNTRY4')}
                </span>
              </div>
            </div>
          </div>
          <div className="sm:w-full sm:pb-8 sm:mt-0 w-full -mt-12 flex justify-center items-center relative z-10">
            <div className="sm:w-full w-3/5 ml-auto mb-4 flex flex-col">
              <div className="p-4 about-userreview5 bg-white rounded-lg border border-solid border-pointColor1">
                <span className="">
                  &quot;&apos;{m('ABOUT_TITLE3_DETAIL5_SUB')}&apos; {m('ABOUT_TITLE3_DETAIL5')}&quot;
                </span>
                <span className="mt-2 text-pointColor1 text-base block">
                  Jonathan, {m('ABOUT_TITLE3_DETAIL5_COUNTRY5')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
      {/** 서비스소개 */}
      <article className="w-full pb-20 px-20 flex flex-col gap-20 items-center justify-center bg-white text-xl border-t-2 border-solid border-pointColor1 sm:w-full sm:pb-12 sm:text-sm sm:px-4 sm:gap-8">
        <h2 className="pt-16 text-4xl font-extrabold text-pointColor1 sm:text-2xl">{m('ABOUT_TITLE4')}</h2>
        <div className="text-xl sm:text-xs">
          <p>{m('ABOUT_TITLE4_CONTENT1')}</p>
          <p>{m('ABOUT_TITLE4_CONTENT1_2')}</p>
          <p>{m('ABOUT_TITLE4_CONTENT2')}</p>
          <p>{m('ABOUT_TITLE4_CONTENT2_2')}</p>
          <p>{m('ABOUT_TITLE4_CONTENT3')}</p>
        </div>
        <div>
          <h3 className="mb-4 text-pointColor1">{m('ABOUT_TITLE4_LOGO1')}</h3>
          <Image src={InfoDesign1} alt="가로형 로고" className="w-[45vw] rounded-xl sm:w-[96vw]" />
        </div>
        <div>
          <h3 className="mb-4 text-pointColor1">{m('ABOUT_TITLE4_LOGO2')}</h3>
          <Image src={InfoDesign2} alt="세로형 로고" className="w-[45vw] rounded-xl sm:w-[96vw]" />
        </div>
        <div className="px-20 flex flex-row gap-12 sm:px-0 sm:gap-4">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-pointColor1">{m('ABOUT_TITLE4_SYMBOL')}</h3>
            <Image src={InfoDesign3} alt="심벌" className="w-[21vw] rounded-xl sm:w-[80vw]" />
            <span className="max-w-[21vw] sm:text-xs sm:max-w-[80vw]">{m('ABOUT_TITLE4_SYMBOL_CONTENT')}</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-pointColor1">{m('ABOUT_TITLE4_CHARACTER')}</h3>
            <Image src={InfoDesign4} alt="캐릭터" className="w-[21vw] rounded-xl sm:w-[80vw]" />
            <span className="max-w-[21vw] sm:text-xs sm:max-w-[80vw]">{m('ABOUT_TITLE4_CHARACTER_CONTENT')}</span>
          </div>
        </div>
      </article>
      {/** 팀 소개 */}
      <article className="w-full mt-20 bg-bgColor2 border-t-2 border-solid border-pointColor1 sm:w-full sm:mt-0">
        <h2 className="pt-16 pb-10 text-pointColor1 text-4xl font-extrabold sm:text-xl">{m('ABOUT_TITLE5')}</h2>
        <h2 className="pb-14 text-pointColor1 text-xl font-bold sm:hidden">Team Coding Zizon</h2>
        <div className="w-3/5 mx-auto mb-10 grid grid-cols-3 gap-x-64 sm:grid-cols-2 sm:gap-x-40">
          {managerData.map((member) => {
            return (
              <div key={member.name} className="">
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="w-[240px] h-[240px] bg-white rounded-full flex items-center justify-center overflow-hidden border border-solid border-pointColor1 sm:w-[120px] sm:h-[120px]">
                    <Image
                      src={member.img}
                      alt="프로필 이미지"
                      width={240}
                      height={240}
                      quality={100}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="w-40 my-4 font-bold text-2xl sm:text-base">{member.name}</h3>
                  <span className="w-[25vw] truncate sm:w-[45vw] sm:text-xs">{member.content1}</span>
                  <span className="w-[25vw] truncate sm:w-[45vw] sm:text-xs">{member.content2}</span>
                </div>
                <div className="my-8">
                  {member.Github ? (
                    <div className="flex gap-2 items-center justify-center">
                      <WhiteButton onClick={() => handleGitBtn(member.Github)} text="Github" py="py-2" />
                      <WhiteButton onClick={() => handleBlogBtn(member.Blog)} text="Blog" py="py-2" />
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center justify-center">
                      <WhiteButton
                        onClick={() => member.Behance && handleGitBtn(member.Behance)}
                        text="Behance"
                        py="py-2"
                      />
                      <WhiteButton
                        onClick={() => member.Instagram && handleGitBtn(member.Instagram)}
                        text="Instagram"
                        py="py-2"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </article>
      <PageUpBtn scrollPosition={scrollPosition} bottom="bottom-[80px]" smallBottom="sm:bottom-28" />
    </main>
  );
};

export default AboutPage;
