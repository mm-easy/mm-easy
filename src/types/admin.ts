export type Admin = {
  type: string;
  title: string;
  target_id: string | string[];
  reported_user_id: string;
};

export type Reports = {
  user_id: string;
  target_id: string;
};
