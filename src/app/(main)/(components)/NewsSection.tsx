import React from 'react';
import { loader } from '@/api/naverAPI';
import { formatToLocaleDateTimeString } from '@/utils/date';

import type { NewsType } from '@/types/posts';

const NewsSection = async () => {
  const news = await loader();
  return (
    <div>
      <h1>뉴스 목록</h1>
      <ul>
        {news &&
          news.map((newsData: NewsType, index: number) => (
            <li key={index}>
              <div className="flex flex-col gap-2">
                <span>{newsData.title.replace(/<[^>]*>/g, '')}</span>
                <span>{formatToLocaleDateTimeString(newsData.pubDate)}</span>
                <span>{newsData.link}</span>
                <span>{newsData.description.replace(/<[^>]+>/g, '')}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NewsSection;
