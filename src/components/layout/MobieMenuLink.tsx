import Link from 'next/link';

const MobieMenuLink = ({
  children,
  href,
  isActive,
  text
}: {
  children: React.ReactNode;
  href: string;
  isActive: (path: string) => boolean;
  text: string;
}) => {
  return (
    <Link href={href} className="flex flex-col items-center gap-2 text-center">
      {children}
      <span className={`${isActive('/') ? 'text-pointColor1' : 'text-pointColor3'}`}>{text}</span>
    </Link>
  );
};

export default MobieMenuLink;
