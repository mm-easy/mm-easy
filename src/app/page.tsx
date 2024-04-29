import Home from './page.client';
import NewsData from '../components/(main)/NewsData';

const page = () => {
  return <Home newsData={<NewsData />} />;
};

export default page;
