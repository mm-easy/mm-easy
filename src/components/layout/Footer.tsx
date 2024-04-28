import Link from 'next/link';
import GithubIcon from '@/assets/github_icon.png';
import InstagramIcon from '@/assets/instagram_icon.png';
import { PiNotePencilFill } from 'react-icons/pi';
import Image from 'next/image';

const Footer = () => {
  return (
    <section className="mt-auto h-[8vh] px-8 flex sm:hidden justify-between items-center text-center text-sm text-white bg-pointColor1">
      <p>뭔말easy? Project. All rights reserved @ Coding zizon</p>
      <div className="flex gap-6">
        <Link href="https://github.com/mm-easy/mm-easy" target="\_blank">
          <Image src={GithubIcon} alt="깃허브 아이콘" width={20} height={20} />
        </Link>
        <Link href="https://www.instagram.com/mm_easy_official" target="\_blank">
          <Image src={InstagramIcon} alt="인스타그램 아이콘" width={20} height={20} />
        </Link>
        <Link href="https://forms.gle/v7HmDm1xSNc1WTeg7" target="\_blank">
          <PiNotePencilFill size={20} />
        </Link>
      </div>
    </section>
  );
};

export default Footer;
