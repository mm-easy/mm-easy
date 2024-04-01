import { createClient } from '@/utils/supabase/create-client';

const page = async () => {
  const supabase = createClient();
  const { data: posts, error } = await supabase.from('').select('*');

  console.log('posts', posts);

  return <div></div>;
};

export default page;
