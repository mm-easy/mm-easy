type UserProfile = {
  nickname: string;
  avatar_img_url: string;
};

export type PostDetailDateType = {
  profiles?: UserProfile;
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

export type PostDetailCommentType = {
  id: string;
  author_id: string;
  post_id: string;
  content: string;
  created_at: Date;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  attached_img_url: string;
  author_id: string;
  category: string;
};

type MenuItem = {
  key: string;
  label: string;
};

type CommunityMenuProps = {
  setSelectedCategory: (category: string) => void;
};

export type CommunityFormProps = {
  selectedCategory: string;
};
