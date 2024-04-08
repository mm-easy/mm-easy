import { getOptions } from '@/api/question_options';
import { Option } from '@/types/quizzes';
import { useQuery } from '@tanstack/react-query';

const Options = ({ id: questionId }: { id: string | undefined }) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      try {
        const data = await getOptions(questionId);
        return data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ['question_options']
  });
  console.log(data);

  if (isLoading) return <div>옵션 로드 중..</div>;
  if (isError) return <div>옵션 로드 에러..</div>;

  const options = data as Option[];

  return (
    <section className="w-full flex flex-col gap-4">
      {options.map((option) => {
        const { id, content } = option;
        return (
          <div key={id} className="pl-4 py-[9px] flex gap-4 border-solid border border-pointColor1 rounded-md">
            <input type="radio" name={questionId} />
            <p>{content}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Options;
