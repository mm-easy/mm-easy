export type Report = {
  id?: string;
  created_at?: string;
  status?: boolean;
  user_id: string;
  target_id: string;
  type: string;
  title: string;
  reason: string;
  reported_user_id: string;
};
