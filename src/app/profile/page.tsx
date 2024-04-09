import MyLevelAndScore from './MyLevelAndScore';
import MyProfile from './MyProfile';

const ProfilePage = () => {
  return (
    <main>
      <div className="h-[47vh]">
        <MyProfile />
      </div>
      <div className="h-[37vh]">
        <MyLevelAndScore />
      </div>
    </main>
  );
};

export default ProfilePage;
