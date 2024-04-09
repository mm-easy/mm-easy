import MyLevelAndScore from './MyLevelAndScore';
import MyProfile from './MyProfile';

const ProfilePage = () => {
  return (
    <main>
      <div className="h-[44vh]">
        <MyProfile />
      </div>
      <div className="h-[40vh]">
        <MyLevelAndScore />
      </div>
    </main>
  );
};

export default ProfilePage;
