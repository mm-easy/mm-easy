'use client';

import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';
import useMultilingual from '@/utils/useMultilingual';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { CancelButton, SubmitButton } from '@/components/common/FormButtons';
import { ADMIN } from '@/constant/adminId';
import { useState } from 'react';
import { throttle } from 'lodash';

const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false });

type Props = {
  defaultValues?: { category?: string; title?: string; content?: ReactQuill.Value };
  onCancel?: () => void;
  onSubmit?: (values: { category: string; title: string; content: ReactQuill.Value }) => void;
};

const PostEditor = ({ defaultValues, onCancel, onSubmit }: Props) => {
  const { getCurrentUserProfile } = useAuth();
  const m = useMultilingual('communityPost');

  const baseCategories = [
    { id: 'question', value: '질문', label: '질문' },
    { id: 'chat', value: '잡담', label: '잡담' },
    { id: 'study', value: '공부', label: '공부' },
    { id: 'diary', value: '일기', label: '일기' }
  ];
  // const categories = [...baseCategories];

  const [selectedCategory, setSelectedCategory] = useState<string>(
    defaultValues?.category ? defaultValues.category : baseCategories[0].value
  );
  const [title, setTitle] = useState(defaultValues?.title ? defaultValues.title : '');
  const [textEditorValue, setTextEditorValue] = useState<ReactQuill.Value>(
    defaultValues?.content ? defaultValues.content : ''
  );

  const {
    data: profile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  const categories = ADMIN.some((admin) => admin.id === profile?.email)
    ? [{ id: 'notice', value: '공지', label: '공지' }, ...baseCategories]
    : baseCategories;

  if (isLoading) return null;

  if (error) return null;


  const throttledSubmit = throttle((values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  }, 10000, { 'trailing': false });

  const handleSubmit = (event:any) => {
    event.preventDefault();
    throttledSubmit({
      category: selectedCategory,
      title,
      content: textEditorValue
    });
  };

  return (
    <form
      className="sm:w-[100vw]"
      onSubmit={handleSubmit}
    >
      <section className="sm:border-b-0 sm:px-4 sm:pt-6 flex border-b border-pointColor1 border-solid">
        {categories.map(({ id, value, label }) => (
          <div key={id} className="sm:px-1">
            <div
              className={`sm:border-1 sm:border-solid sm:border-pointColor1 sm:rounded-3xl sm:text-sm sm:px-4 sm:py-[6px] font-bold rounded-tl-lg rounded-tr-lg text-lg px-6 pt-1 cursor-pointer  ${
                selectedCategory === value ? 'bg-pointColor1 text-white' : 'bg-white text-pointColor1'
              }`}
              onClick={() => {
                setSelectedCategory(value);
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </section>
      <div>
        <input
          className="sm:h-20 sm:text-2xl sm:px-4 w-full focus:outline-none font-medium h-24 text-3xl placeholder-gray-300"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder={m('COMMUNITY_POST_TITLE_PLACEHOLDER')}
          maxLength={36}
        />
      </div>
      <div>
        <TextEditor value={textEditorValue} onChange={setTextEditorValue} />
      </div>
      <div className="sm:pb-28 sm:py-6 sm:mt-0 mt-[calc(8vh-50px)] flex justify-center gap-5 font-bold">
        <CancelButton
          text={m('COMMUNITY_POST_CANCEL')}
          onClick={onCancel}
          width="sm:w-[45vw] w-[15%]"
          border="border-2"
        />
        <SubmitButton text={m('COMMUNITY_POST_SUBMIT')} width="sm:w-[45vw] w-[15%]" height="sm:h-[7vh]" />
      </div>
    </form>
  );
};

export default PostEditor;
