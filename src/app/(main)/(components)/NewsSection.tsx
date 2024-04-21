import Link from 'next/link';
import { loader } from '@/api/naverAPI';
import { formatToLocaleDateTimeString } from '@/utils/date';

import type { NewsType } from '@/types/posts';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';
import useMultilingual from '@/utils/useMultilingual';

const NewsSection = async () => {
  // const [lang] = useAtom(langAtom);
  // const m = useMultilingual('news-section');
  const news = await loader();

  return (
    <div>
      <p className="w-[1440px] px-6 py-4 text-lg font-bold text-pointColor1 bg-bgColor1 border-y-2 border-solid border-pointColor1">
        한국은 지금
      </p>
      <section className="px-6 py-4 grid grid-cols-4 gap-5">
        {news &&
          news.map((newsData: NewsType, index: number) => (
            <div
              key={index}
              className="p-4 flex flex-col my-5 border border-solid border-grayColor1 rounded-t-3xl rounded-b-md transition duration-300 ease-in-out transform"
            >
              <p className="font-bold text-lg mt-4 mb-3 truncate">
                {newsData.title
                  .replace(/<[^>]*>/g, '')
                  .replace(/&quot;/g, '"')
                  .replace(/&apos;/g, "'")}
              </p>
              <div className="flex flex-col gap-3">
                <span>{formatToLocaleDateTimeString(newsData.pubDate)}</span>
                <span className="leading-5">
                  {newsData.description
                    .replace(/<[^>]+>/g, '')
                    .replace(/&quot;/g, '"')
                    .replace(/&apos;/g, "'")}
                </span>
              </div>
              <div className="flex justify-end pt-4">
                <Link href={newsData.link} target="_blank" className="font-semibold text-pointColor1">
                  더보기
                </Link>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default NewsSection;
