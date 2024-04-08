import { useSearchParams } from 'next/navigation';
import React from 'react';

const New = () => {
  const params = useSearchParams();
  const category = params.get('category');

  console.log('dd', category);
  return <div>New</div>;
};

export default New;
