import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { ReactElement } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoticeEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const NoticeEditor = ({ value, onChange }: NoticeEditorProps): ReactElement => {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
};

export default NoticeEditor;
