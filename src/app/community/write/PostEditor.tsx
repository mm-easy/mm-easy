'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';
import useMultilingual from '@/utils/useMultilingual';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { langAtom } from '@/store/store';
import { CancelButton, SubmitButton } from '@/components/common/FormButtons';
import { useAtom } from 'jotai';

const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false });

type Props = {
  defaultValues?: { category?: string; title?: string; content?: ReactQuill.Value };
  onCancel?: () => void;
  onSubmit?: (values: { category: string; title: string; content: ReactQuill.Value }) => void;
};

const PostEditor = ({ defaultValues, onCancel, onSubmit }: Props) => {
  const { getCurrentUserProfile } = useAuth();
  const [lang] = useAtom(langAtom);
  const m = useMultilingual(lang, 'communityPost');

  const baseCategories = [
    { id: 'question', value: '질문', label: '질문' },
    { id: 'chat', value: '잡담', label: '잡담' },
    { id: 'study', value: '공부', label: '공부' },
    { id: 'diary', value: '일기', label: '일기' }
  ];
  // const categories = [...baseCategories];

  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    defaultValues?.category ? defaultValues.category : baseCategories[0].value
  );
  const [title, setTitle] = React.useState(defaultValues?.title ? defaultValues.title : '');
  const [textEditorValue, setTextEditorValue] = React.useState<ReactQuill.Value>(
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

  const categories =
    profile?.email === 'daejang@mmeasy.com'
      ? [{ id: 'notice', value: '공지', label: '공지' }, ...baseCategories]
      : baseCategories;

  if (isLoading) return null;

  if (error) return null;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (!onSubmit) {
          return;
        }
        onSubmit({
          category: selectedCategory,
          title,
          content: textEditorValue
        });
      }}
    >
      <section className="flex border-b border-pointColor1 border-solid">
        {categories.map(({ id, value, label }) => (
          <div key={id}>
            <div
              className={`font-bold rounded-tl-lg rounded-tr-lg text-lg px-6 pt-1 cursor-pointer  ${
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
          className="w-full focus:outline-none font-medium h-24 text-3xl placeholder-gray-300"
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
      <div className="mt-[calc(8vh-50px)] flex justify-center gap-5 font-bold">
        <CancelButton text={m('COMMUNITY_POST_CANCEL')} onClick={onCancel} width="w-[15%]" border="border-2" />
        <SubmitButton text={m('COMMUNITY_POST_SUBMIT')} width="w-[15%]" />
      </div>
    </form>
  );
};

export default PostEditor;
