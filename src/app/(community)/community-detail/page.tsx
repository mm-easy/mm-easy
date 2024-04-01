import { createClient } from '@/utils/supabase/create-client';
import { useParams } from 'next/navigation';

const page = async () => {
  const supabase = createClient();
  const params = 'ebe05c47-de04-4e23-a382-f8f43c298a73';

  return <div>supabase 어려워요</div>;
};

export default page;
