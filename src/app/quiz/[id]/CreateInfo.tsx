import { getProfile } from '@/api/profiles';
import { User } from '@/types/users';
import { useQuery } from '@tanstack/react-query';
import { profileStorageUrl } from '@/utils/supabase/storage';
import Image from 'next/image';

const CreateInfo = ({
  creatorText,
  creator,
  dateText,
  date
}: {
  creatorText: string;
  creator: string;
  dateText: string;
  date: string | undefined;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      try {
        const data = await getProfile(creator);
        return data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ['profiles', creator]
  });

  if (isLoading) return <div>nickname</div>;
  if (isError) return <div>error..</div>;

  const profile = data as User[];

  if (profile.length === 0) {
    return null;
  }

  const { nickname, avatar_img_url } = profile[0];

  return (
    <section className="p-4 flex gap-4 sm:gap-3 border-solid border-b-2 border-pointColor1">
      <Image
        src={`${profileStorageUrl}/${avatar_img_url}`}
        width={52}
        height={52}
        alt="프로필 이미지"
        className="hidden sm:block bg-bgColor2 rounded-full"
      />
      <section className="flex flex-col gap-4 sm:gap-1">
        <div>
          <h4 className="sm:hidden pb-1 font-semibold">{creatorText}</h4>
          <p className="sm:text-lg">{nickname}</p>
        </div>
        <div>
          <h4 className="sm:hidden pb-1 font-semibold">{dateText}</h4>
          <p className="sm:text-sm">{date}</p>
        </div>
      </section>
    </section>
  );
};

export default CreateInfo;
