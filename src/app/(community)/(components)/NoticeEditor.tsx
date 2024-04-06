import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { ReactElement, useMemo, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { supabase } from '@/utils/supabase/supabase';


interface NoticeEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const NoticeEditor = ({ value, onChange }: NoticeEditorProps): ReactElement => {
  const quillRef = useRef<any | null>(null);

  const imageHandler = () => {
    try {
      //이미지를 저장할 input type=file DOM
      const input = document.createElement('input');
      // 속성 써주기
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
      input.addEventListener('change', async () => {
        console.log('온체인지');
        const file = input.files![0];
        const fileNewName = uuid();
        // file을 서버에 업로드
        const { data, error } = await supabase.storage
          .from('community-image')
          .upload(`quill_image/${fileNewName}`, file);
        if (error) {
          console.error('이미지 업로드 중 오류 발생:', error);
        } else {
          console.log('이미지가 성공적으로 업로드되었습니다:', data);
        }
        // 업로드된 이미지의 URL을 요청
        const response = supabase.storage.from('community-image').getPublicUrl(`quill_image/${fileNewName}`);

        if (response.data) {
          const postImageUrl = response.data.publicUrl;
          const editor = quillRef.current!.getEditor();
          const range = editor.getSelection();
          // 이미지를 붙이고 커서를 이동
          editor.insertEmbed(range.index, 'image', postImageUrl);
          editor.setSelection(range.index + 1);
        } else {
          console.error('No public URL found in response data.');
        }
      });
    } catch (error) {
      console.log('error', error);
    }
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
