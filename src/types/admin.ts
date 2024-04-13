export type Admin = {
  type: string;
  title: string;
  target_id: string | string[];
  reported_user_id: string;
};

export type Report = {
  user_id: string | null;
  admin_id: string;
};
