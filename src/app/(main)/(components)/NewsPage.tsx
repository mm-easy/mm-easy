import React, { useEffect, useState } from 'react';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = '한국어';
      const response = await fetch(`/api/news?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      console.log('news', data);
      setNews(data);
    };

    fetchData();
  }, []);

  return <div>NewsPage</div>;
};

export default NewsPage;
