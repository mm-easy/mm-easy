import { getProfile } from '@/api/profiles';
import { User } from '@/types/users';
import { useQuery } from '@tanstack/react-query';

const Creator = ({ creator }: { creator: string }) => {
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
  console.log(profile);

  const { nickname } = profile[0];

  return (
    <div>
      <h4>작성자</h4>
      {/* <p>{nickname}</p> */}
      <p>nickname</p>
    </div>
  );
};

export default Creator;
