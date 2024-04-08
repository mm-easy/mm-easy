import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { ReactElement, useMemo, useRef } from 'react';
import { uploadPostImageToStorage } from '@/api/posts';


interface NoticeEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const NoticeEditor = ({ value, onChange }: NoticeEditorProps): ReactElement => {
  const quillRef = useRef<any | null>(null);

  // 이미지 업로드
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  
    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const { url, error } = await uploadPostImageToStorage(file);
        if (error) {
          console.error('이미지 업로드 오류:', error);
          return;
        }
        if (url) {
          const editor = quillRef.current!.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', url);
          editor.setSelection(range.index + 1);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          [{ align: [] }, { color: [] }, { background: [] }]
        ],
        handlers: {
          image: imageHandler // 이미지 tool 사용에 대한 핸들러 설정
        }
      }
    }),
    []
  );

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

  return (
    <ReactQuill
      ref={quillRef}
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
