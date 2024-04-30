import useMultilingual from '@/utils/useMultilingual';

/** 문제 이전, 다음, 제출 버튼 */
const PageAndSubmitBtn = ({
  resultMode,
  questionsLength,
  page,
  isAllAnswersSubmitted,
  handlePrevPage,
  handleNextPage,
  handleResultMode
}: {
  resultMode: boolean;
  questionsLength: number;
  page: number;
  isAllAnswersSubmitted: boolean;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleResultMode: () => void;
}) => {
  const m = useMultilingual('quiz-try');

  return (
    <section className="w-[570px] sm:w-full flex flex-col justify-between gap-3">
      {!resultMode && questionsLength > 1 && (
        <div className="flex justify-between gap-3 font-semibold">
          <button
            disabled={page === 0}
            className={`w-full sm:h-10 py-[7px] ${
              page === 0 ? 'text-white bg-grayColor2' : 'text-pointColor1 border border-solid border-pointColor1'
            } rounded-md`}
            onClick={handlePrevPage}
          >
            {m('PREV_QUESTION_BTN')}
          </button>
          <button
            disabled={page === questionsLength - 1}
            className={`w-full sm:h-10 py-[7px] ${
              page === questionsLength - 1
                ? 'text-white bg-grayColor2'
                : 'text-pointColor1 border border-solid border-pointColor1'
            } rounded-md`}
            onClick={handleNextPage}
          >
            {m('NEXT_QUESTION_BTN')}
          </button>
        </div>
      )}
      <button
        className={`w-full sm:h-10 py-[8px] ${
          isAllAnswersSubmitted ? 'bg-pointColor1' : 'bg-grayColor2 cursor-default'
        } text-white font-semibold tracking-wider rounded-md`}
        onClick={handleResultMode}
      >
        {resultMode ? m('RETRY_BTN') : m('SUBMIT_BTN')}
      </button>
    </section>
  );
};

export default PageAndSubmitBtn;
