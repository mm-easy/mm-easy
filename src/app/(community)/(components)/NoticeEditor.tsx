import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const NoticeEditor = () => {
  return (
    <div>NoticeEditor</div>
  )
}

export default NoticeEditor