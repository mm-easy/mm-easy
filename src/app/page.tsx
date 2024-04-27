import Home from './page.client';
import NewsData from './(main)/(components)/NewsData';

const page = () => {
  return <Home newsData={<NewsData />} />;
};

export default page;
