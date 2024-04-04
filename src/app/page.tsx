'use client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { getCurrentUserProfile } = useAuth();

  const {
    data: profile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>An error occurred: {error instanceof Error ? error.message : 'Unknown error'}</div>;

  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <h1>User Profile</h1>
      {profile ? (
        <div>
          <p>Id: {profile.id}</p>
          <p>Email: {profile.email}</p>
          <p>Nickname: {profile.nickname}</p>
          <p>Avatar: {profile.avatar_img_url}</p>
        </div>
      ) : (
        <p>No profile data</p>
      )}
    </div>
  );
};

export default Home;
