import Link from 'next/link';
import tailwindColors from '../../../tailwind.config';
import ArrowMore from '@/assets/arrow_back_ios_FILL1_wght400_GRAD0_opsz24.svg';
import { loader } from '@/api/naverAPI';
import { formatToLocaleDateTimeString } from '@/utils/date';

import type { NewsType } from '@/types/posts';
import type { TailwindColors } from '@/types/tailwind';

const NewsData = async () => {
  const news = await loader();
  const { colors } = tailwindColors.theme?.extend as { colors: TailwindColors };

  return (
    <section className="px-6 py-4 grid grid-cols-4 gap-5 sm:grid-cols-1 sm:gap-3 sm:py-2">
      {news &&
        news.map((newsData: NewsType, index: number) => (
          <div
            key={index}
            className="p-4 flex flex-col my-5 border border-solid border-grayColor1 rounded-t-3xl rounded-b-md transition duration-300 ease-in-out transform sm:px-[16px] sm:py-2 sm:my-1"
          >
            <p className="font-bold text-lg mt-4 mb-3 truncate sm:mb-2">
              {newsData.title
                .replace(/<[^>]*>/g, '')
                .replace(/&quot;/g, '"')
                .replace(/&apos;/g, "'")}
            </p>
            <div className="flex flex-col gap-3 sm:gap-1">
              <span>{formatToLocaleDateTimeString(newsData.pubDate)}</span>
              <span className="leading-[160%] sm:line-clamp-2">
                {newsData.description
                  .replace(/<[^>]+>/g, '')
                  .replace(/&quot;/g, '"')
                  .replace(/&apos;/g, "'")}
              </span>
            </div>
            <Link href={newsData.link} target="_blank" className="sm:py-2 origin-center rotate-180">
              <ArrowMore style={{ fill: colors?.pointColor1 }} />
            </Link>
          </div>
        ))}
    </section>
  );
};

export default NewsData;
