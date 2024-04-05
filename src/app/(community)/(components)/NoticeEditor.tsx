import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { ReactElement, useMemo } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoticeEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'color',
  'background'
];

const NoticeEditor = ({ value, onChange }: NoticeEditorProps): ReactElement => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        [{ align: [] }, { color: [] }, { background: [] }]
      ]
    }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder="내용을 입력해 주세요."
    />
  );
};

export default NoticeEditor;
