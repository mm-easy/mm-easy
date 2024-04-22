'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PhonicsPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/phonics/consonants');
  }, []);

  return null;
};

export default PhonicsPage;
