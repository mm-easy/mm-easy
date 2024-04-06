import Link from 'next/link';

const Footer = () => {
  return (
    <section className="h-[8vh] px-4 flex justify-between items-center text-center text-sm text-white bg-pointColor1">
      <p>뭔말이지? Project. All rights reserved @ Coding zizon</p>
      <div className="flex gap-4">
        <Link href="https://github.com/mm-easy/mm-easy" target="\_blank">
          ➡️ github
        </Link>
        <Link href="https://www.instagram.com/" target="\_blank">
          ➡️ insta
        </Link>
      </div>
    </section>
  );
};

export default Footer;
