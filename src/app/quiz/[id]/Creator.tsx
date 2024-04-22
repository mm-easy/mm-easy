import { getProfile } from '@/api/profiles';
import { User } from '@/types/users';
import { useQuery } from '@tanstack/react-query';

const Creator = ({ creator, creatorText }: { creator: string; creatorText: string }) => {
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

  const { nickname } = profile[0];

  return (
    <div>
      <h4 className="pb-1 font-semibold">{creatorText}</h4>
      <p>{nickname}</p>
    </div>
  );
};

export default Creator;
