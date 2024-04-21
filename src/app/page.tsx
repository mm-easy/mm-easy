import React from 'react';
import Home from './page.client';
import NewsSection from './(main)/(components)/NewsSection';

const page = () => {
  return <Home newSection={<NewsSection />} />;
};

export default page;
