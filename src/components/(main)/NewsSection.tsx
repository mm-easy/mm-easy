import useMultilingual from '@/utils/useMultilingual';

const NewsSection = () => {
  const m = useMultilingual('news-section');

  return (
    <p className="w-full px-6 py-4 text-lg font-bold text-pointColor1 bg-bgColor1 border-y-2 border-solid border-pointColor1 sm:border-none sm:py-8 sm:bg-white sm:text-lg">
      {m('KOREA_IS_NOW')}
    </p>
  );
};

export default NewsSection;
