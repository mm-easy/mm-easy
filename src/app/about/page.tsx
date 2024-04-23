'use client';

import Image from 'next/image';
import UsageStatus from './UsageStatus';
import useMultilingual from '@/utils/useMultilingual';
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
import { createManagerData } from '@/utils/managerData';

import type { Post } from '@/types/posts';
import type { Quiz } from '@/types/quizzes';
import type { User } from '@/types/users';

const AboutPage = () => {
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

  return (
    <main className="flex flex-col items-center text-center">
      <article className="w-full py-24 flex flex-col justify-center items-center bg-pointColor1">
        <h2 className="text-5xl pb-16 font-black text-white tracking-wider">{m('ABOUT_TITLE1')}</h2>
        <Image src={Infopeople} alt="로고" width={800} quality={100} />
        <section className="text-3xl w-full text-white ">
          <section>
            <div className="py-16 flex justify-center items-center gap-6">
              <Image src={InfoIcon3} alt="로고" width={50} />
              <span className="text-white">{m('ABOUT_TITLE1_DETAIL1')}</span>
            </div>
          </section>
          <section>
            <div className="w-3/5 mx-auto py-16 flex justify-center items-center gap-6 border-t border-solid border-white">
              <Image src={InfoIcon2} alt="로고" width={50} />
              <span className="text-white">{m('ABOUT_TITLE1_DETAIL2')}</span>
            </div>
          </section>
          <section>
            <div className="w-3/5 mx-auto pt-16 flex justify-center items-center gap-6 border-t border-solid border-white">
              <Image src={InfoIcon1} alt="로고" width={50} />
              <span className="text-white">{m('ABOUT_TITLE1_DETAIL3')}</span>
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
      <article className="flex flex-col text-xl font-bold w-5/6 pb-20">
        <h2 className="text-4xl font-extrabold py-16 text-pointColor1">{m('ABOUT_TITLE3')}</h2>
        <div className="flex flex-col flex-wrap">
          <div className="flex justify-center items-center w-full pl-10 relative z-10">
            <div className="flex flex-col ml-auto mb-6 w-3/5">
              <div className="about-userreview1 relative bg-white rounded-lg p-4 border border-solid border-pointColor1">
                <span className="">&quot;{m('ABOUT_TITLE3_DETAIL1')}&quot;</span>
                <span className="text-pointColor1 text-base block mt-2">
                  Elisa, {m('ABOUT_TITLE3_DETAIL1_COUNTRY1')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full pr-20 relative z-0 -mt-8">
            <div className="flex flex-col mr-auto mb-6 w-3/5">
              <div className="about-userreview2 bg-white rounded-lg p-4 border border-solid border-pointColor1">
                <span className="">&quot;{m('ABOUT_TITLE3_DETAIL2')}&quot;</span>
                <span className="text-pointColor1 text-base block mt-2">
                  Bryan, {m('ABOUT_TITLE3_DETAIL2_COUNTRY2')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full pl-32 py-10">
            <div className="flex flex-col ml-auto mb-6 w-3/5">
              <div className="about-userreview3 bg-white rounded-lg  p-4 border border-solid border-pointColor1">
                <span className="">&quot;{m('ABOUT_TITLE3_DETAIL3')}&quot;</span>
                <span className="text-pointColor1 text-base block mt-2">
                  Danaka, {m('ABOUT_TITLE3_DETAIL3_COUNTRY3')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full relative z-0">
            <div className="flex flex-col mr-auto mb-10 w-1/2">
              <div className="about-userreview4 bg-white rounded-lg p-4 border border-solid border-pointColor1">
                <span className="">&quot;{m('ABOUT_TITLE3_DETAIL4')}&quot;</span>
                <span className="text-pointColor1 text-base block mt-2">
                  Danielle, {m('ABOUT_TITLE3_DETAIL4_COUNTRY4')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full relative z-10 -mt-12">
            <div className="flex flex-col ml-auto mb-4 w-3/5">
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
      <article className="w-full mt-20 border-t-2 border-solid border-pointColor1 bg-bgColor1">
        <h2 className="text-pointColor1 text-4xl font-extrabold pt-16 pb-10">{m('ABOUT_TITLE4')}</h2>
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
                  <span className="w-[25vw] sm:w-[50vw] sm:text-sm truncate">{member.content1}</span>
                  <span className="w-[25vw] sm:w-[50vw] sm:text-sm truncate">{member.content2}</span>
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
