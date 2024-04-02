export type PostDetailDateType = {
  id: string;
  author_id: string;
  title: string;
  content: string;
  attached_img_url: string;
  created_at: Date;
};

export type PostDetailUserType = {
  id: string | undefined;
  email: string;
  nickname: string;
  avatar_img_url: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
};
