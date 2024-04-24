import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import useMultilingual from '@/utils/useMultilingual';
import { ReactElement, useMemo, useRef } from 'react';
import { uploadPostImageToStorage } from '@/api/posts';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

interface TextEditorProps {
  value: ReactQuill.Value;
  onChange: (value: string) => void;
}

const TextEditor = ({ value, onChange }: TextEditorProps): ReactElement => {
  const quillRef = useRef<any | null>(null);
  const m = useMultilingual('communityPost');

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
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          if (range) {
            editor.insertEmbed(range.index, 'image', url);
            editor.setSelection(range.index + 1);
          } else {
            // range가 null일 경우, 에디터의 끝에 이미지 삽입
            const length = editor.getLength();
            editor.insertEmbed(length, 'image', url);
            editor.setSelection(length + 1);
          }
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
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
    'height',
    'width',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'background'
  ];

  return (
    <div className='sm:h-[800px] h-[450px]'>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={m('COMMUNITY_POST_CONTENT_PLACEHOLDER')}
        style={{ height: '400px' }}
      />
    </div>
  );
};

export default TextEditor;
