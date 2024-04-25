'use client';

import Image from 'next/image';
import UsageStatus from './UsageStatus';
import useMultilingual from '@/utils/useMultilingual';
import Infopeople from '@/assets/team/info_people.png';
import InfoIcon1 from '@/assets/info_icon_b3.png';
import InfoIcon2 from '@/assets/info_icon_b2.png';
import InfoIcon3 from '@/assets/info_icon_b1.png';
import LogoHorizontal1 from '@/assets/logo_horizontal_1.png';
import PageUpBtn from '@/components/common/PageUpBtn';
import InfoDesign1 from '@/assets/info_design_1.png';
import InfoDesign2 from '@/assets/info_design_2.png';
import InfoDesign3 from '@/assets/info_design_3.png';
import InfoDesign4 from '@/assets/info_design_4.png';
import { useEffect, useState } from 'react';
import { getPosts } from '@/api/posts';
import { getQuizzes } from '@/api/quizzes';
import { getUsers } from '@/api/users';
import { WhiteButton } from '@/components/common/FormButtons';
import { useQuery } from '@tanstack/react-query';
import { createManagerData } from '@/utils/managerData';

import type { Post } from '@/types/posts';
import type { Quiz } from '@/types/quizzes';
import type { User } from '@/types/users';

const AboutPage = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const m = useMultilingual('about');
  const managerData = createManagerData(m);

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
      <article className="sm:w-full w-full sm:py-16 py-24 flex flex-col justify-center items-center bg-bgColor2">
        <h2 className="sm:text-3xl text-5xl sm:pb-12 pb-16 font-black text-pointColor1 tracking-wider">
          {m('ABOUT_TITLE1')}
        </h2>
        <Image src={Infopeople} alt="로고" quality={100} className="w-[800px] sm:w-[440px]" />
        <section className="sm:text-xl text-3xl w-full text-pointColor1 ">
          <section>
            <div className="py-16 flex justify-center items-center sm:gap-2 gap-6">
              <Image src={InfoIcon3} alt="로고" className="w-[50px] sm:w-[25px]" />
              <span className="text-pointColor1">{m('ABOUT_TITLE1_DETAIL1')}</span>
            </div>
          </section>
          <section>
            <div className="sm:w-full w-3/5 mx-auto py-16 flex justify-center items-center sm:gap-2 gap-6 border-t border-solid border-pointColor1">
              <Image src={InfoIcon2} alt="로고" className="w-[50px] sm:w-[25px]" />
              <span className="text-pointColor1">{m('ABOUT_TITLE1_DETAIL2')}</span>
            </div>
          </section>
          <section>
            <div className="sm:w-full w-3/5 mx-auto pt-16 flex justify-center items-center sm:gap-2 gap-6 border-t border-solid border-pointColor1">
              <Image src={InfoIcon1} alt="로고" className="w-[50px] sm:w-[25px]" />
              <span className="text-pointColor1">{m('ABOUT_TITLE1_DETAIL3')}</span>
            </div>
          </section>
        </section>
      </article>
      <article className="sm:w-full w-full sm:p-10 py-14 border-t-2 border-b-2 border-solid border-pointColor1">
        <section
          className="pb-14 sm:text-3xl text-4xl font-extrabold text-pointColor1"
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
      <article className="flex flex-col sm:w-full w-full bg-bgColor4 sm:text-sm text-xl font-bold sm:pb-10 pb-20 px-20">
        <h2 className="sm:text-2xl text-4xl font-extrabold sm:py-10 py-16 text-pointColor1">{m('ABOUT_TITLE3')}</h2>
        <div className="flex flex-col flex-wrap">
          <div className="flex justify-center items-center sm:w-full w-full sm:pl-0 pl-10 relative z-10 sm:pb-8">
            <div className="flex flex-col sm:ml-0 sm:mr-auto ml-auto mb-6 sm:w-full w-3/5">
              <div className="about-userreview1 relative bg-white rounded-lg p-4 border border-solid border-pointColor1">
                <span className="">&quot;{m('ABOUT_TITLE3_DETAIL1')}&quot;</span>
                <span className="text-pointColor1 text-base block mt-2">
                  Elisa, {m('ABOUT_TITLE3_DETAIL1_COUNTRY1')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center sm:w-full w-full sm:pr-0 pr-20 relative z-0 sm:pb-8 sm:mt-0 -mt-8">
            <div className="flex flex-col sm:ml-auto mr-auto mb-6 sm:w-full w-3/5">
              <div className="about-userreview2 bg-white rounded-lg p-4 border border-solid border-pointColor1">
                <span className="">&quot;{m('ABOUT_TITLE3_DETAIL2')}&quot;</span>
                <span className="text-pointColor1 text-base block mt-2">
                  Bryan, {m('ABOUT_TITLE3_DETAIL2_COUNTRY2')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center sm:w-full w-full sm:pl-0 pl-32 sm:pb-8 sm:py-0 py-10">
            <div className="flex flex-col ml-auto mb-6 sm:w-full w-3/5">
              <div className="about-userreview3 bg-white rounded-lg  p-4 border border-solid border-pointColor1">
                <span className="">&quot;{m('ABOUT_TITLE3_DETAIL3')}&quot;</span>
                <span className="text-pointColor1 text-base block mt-2">
                  Danaka, {m('ABOUT_TITLE3_DETAIL3_COUNTRY3')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center sm:w-full w-full relative z-0 sm:pb-8">
            <div className="flex flex-col mr-auto mb-10 sm:w-full  w-1/2">
              <div className="about-userreview4 bg-white rounded-lg p-4 border border-solid border-pointColor1">
                <span className="">&quot;{m('ABOUT_TITLE3_DETAIL4')}&quot;</span>
                <span className="text-pointColor1 text-base block mt-2">
                  Danielle, {m('ABOUT_TITLE3_DETAIL4_COUNTRY4')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center sm:w-full w-full relative z-10 sm:pb-8 sm:mt-0 -mt-12">
            <div className="flex flex-col ml-auto mb-4 sm:w-full w-3/5">
              <div className="about-userreview5 bg-white rounded-lg  p-4 border border-solid border-pointColor1">
                <span className="">
                  &quot;&apos;{m('ABOUT_TITLE3_DETAIL5_SUB')}&apos; {m('ABOUT_TITLE3_DETAIL5')}&quot;
                </span>
                <span className="text-pointColor1 text-base block mt-2">
                  Jonathan, {m('ABOUT_TITLE3_DETAIL5_COUNTRY5')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className="w-full flex flex-col gap-20 items-center justify-center bg-white text-xl font-bold pb-20 px-20 border-t-2 border-solid border-pointColor1 sm:w-full sm:pb-12 sm:text-sm sm:px-4 sm:gap-8">
        <h2 className="sm:text-2xl text-4xl font-extrabold pt-16 text-pointColor1">{m('ABOUT_TITLE4')}</h2>
        <div className="sm:text-xs text-xl">
          <p>{m('ABOUT_TITLE4_CONTENT1')}</p>
          <p>{m('ABOUT_TITLE4_CONTENT2')}</p>
          <p>{m('ABOUT_TITLE4_CONTENT3')}</p>
        </div>
        <div>
          <h3 className="text-pointColor1 mb-4">{m('ABOUT_TITLE4_LOGO1')}</h3>
          <Image src={InfoDesign1} alt="가로형 로고" className="w-[55vw] sm:w-[96vw] rounded-xl" />
        </div>
        <div>
          <h3 className="text-pointColor1 mb-4">{m('ABOUT_TITLE4_LOGO2')}</h3>
          <Image src={InfoDesign2} alt="세로형 로고" className="w-[55vw] sm:w-[96vw] rounded-xl" />
        </div>
        <div className="flex flex-row gap-12 px-20 sm:px-0 sm:gap-4">
          <div className="flex flex-col items-center gap-4 sm:">
            <h3 className="text-pointColor1">{m('ABOUT_TITLE4_SYMBOL')}</h3>
            <Image src={InfoDesign3} alt="심벌" className="w-[25vw] sm:w-[80vw] rounded-xl" />
            <span className="max-w-[25vw] sm:text-xs sm:max-w-[80vw]">{m('ABOUT_TITLE4_SYMBOL_CONTENT')}</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-pointColor1">{m('ABOUT_TITLE4_CHARACTER')}</h3>
            <Image src={InfoDesign4} alt="캐릭터" className="w-[25vw] sm:w-[80vw] rounded-xl" />
            <span className="max-w-[25vw] sm:text-xs sm:max-w-[80vw]">{m('ABOUT_TITLE4_CHARACTER_CONTENT')}</span>
          </div>
        </div>
      </article>
      <article className="sm:w-full w-full sm:mt-0 mt-20 border-t-2 border-solid border-pointColor1 bg-bgColor2">
        <h2 className="text-pointColor1 sm:text-xl text-4xl font-extrabold pt-16 pb-10">{m('ABOUT_TITLE5')}</h2>
        <h2 className="sm:hidden text-pointColor1 text-xl font-bold pb-14">Team Coding Zizon</h2>
        <div className="w-3/5 mx-auto grid grid-cols-3 sm:grid-cols-2 sm:gap-x-40 gap-x-64 mb-10">
          {managerData.map((member) => {
            return (
              <div key={member.name} className="">
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="sm:w-[120px] sm:h-[120px] w-[240px] h-[240px] bg-white rounded-full flex items-center justify-center overflow-hidden border border-solid border-pointColor1">
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
                  <span className="w-[25vw] sm:w-[45vw] sm:text-xs truncate">{member.content1}</span>
                  <span className="w-[25vw] sm:w-[45vw] sm:text-xs truncate">{member.content2}</span>
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
      <PageUpBtn scrollPosition={scrollPosition} bottom="bottom-[80px]"
        smallBottom="sm:bottom-28"/>
    </main>
  );
};

export default AboutPage;
