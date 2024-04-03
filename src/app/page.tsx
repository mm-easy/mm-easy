"use client"
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { getCurrentUserProfile } = useAuth();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>An error occurred: {error instanceof Error ? error.message : 'Unknown error'}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {profile ? (
        <div>
          <p>Email: {profile.email}</p>
          <p>Nickname: {profile.nickname}</p>
          {/* 필요한 다른 프로필 정보를 여기에 추가하세요. */}
        </div>
      ) : (
        <p>No profile data</p>
      )}
    </div>
  );
};

export default Home;