'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useConfirmPageLeave = () => {
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      return '작성하던 내용이 모두 사라집니다. 계속하시겠습니까?';
    };

    const handlePageUnload = () => {
      if (!window.confirm('작성하던 내용이 모두 사라집니다. 계속하시겠습니까?')) return;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handlePageUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handlePageUnload);
    };
  }, []);
};

export default useConfirmPageLeave;
