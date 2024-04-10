import { User } from './users';

type UserProfile = {
  nickname: string;
  avatar_img_url: string;
  id: string;
};

export type PostDetailDateType = {
  profiles?: UserProfile;
  id: string;
  author_id: string;
  title: string;
  content: string;
  attached_img_url: string;
  created_at: string;
  category: string;
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
  created_at: string;
  profiles?: UserProfile;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  attached_img_url: string;
  author_id: string;
  category: string;
  nickname: string;
  profiles: UserProfile;
  imageUrl: string[];
};

export type MenuItem = {
  key: string;
  label: string;
};

export type CommunityMenuProps = {
  setSelectedCategory: (category: string) => void;
};

export type CategorySelectorProps = {
  onSelectCategory: (category: string) => void;
};

export type CommunityFormProps = {
  currentItems: Post[];
  setCurrentPage: (page: number) => void;
  currentPage: number;
  totalNum: number;
  pageRange: number;
  btnRange: number;
  category: string | null;
};

export type CommunityEditFormProps = {
  postId: string;
  prevTitle: string;
  prevContent: string;
  prevCategory: string;
  prevImageUrls: string[];
  prevAuthorId: string;
};

export type ToggleProps = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};

export type FormButtonProps = {
  text: string;
  width?: string;
  height?: string;
  postId: string;
  categoryNow?: string;
  redirectUrl: string;
};

export type Params = {
  category: string;
  id: string;
};

export type LikeProps = {
  postId: string;
  profile: User | null | undefined;
};

export type PostCommentProps = {
  postId: string | string[] | undefined;
  profile: User | null | undefined;
};
