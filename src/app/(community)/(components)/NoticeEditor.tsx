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
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];

const NoticeEditor = ({ value, onChange }: NoticeEditorProps): ReactElement => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };

  return <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} formats={formats} />;
};

export default NoticeEditor;
