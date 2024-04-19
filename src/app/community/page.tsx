import { redirect } from 'next/navigation';

const CommunityPage = () => {
  redirect(`/community/list/${encodeURIComponent('전체')}`);
};

export default CommunityPage;
