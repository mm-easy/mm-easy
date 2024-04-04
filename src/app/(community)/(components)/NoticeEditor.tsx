import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { ReactElement, useMemo } from 'react';
import { Quill } from 'react-quill';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoticeEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const formats = [
  'font',
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
  'align',
  'color',
  'background',
  'size',
  'h1',
];

const NoticeEditor = ({ value, onChange }: NoticeEditorProps): ReactElement => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'image']
      ]
    }),
    []
  );

  return <ReactQuill className='editor-styles' theme="snow" value={value} onChange={onChange} modules={modules} formats={formats} />;
};

export default NoticeEditor;
