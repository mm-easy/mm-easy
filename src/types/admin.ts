export type Admin = {
  id?: string;
  type: string;
  title: string;
  created_at?: string;
  status?: boolean;
  target_id: string | string[];
  reported_user_id: string;
};

export type Report = {
  user_id: string | null;
  admin_id: string;
};
