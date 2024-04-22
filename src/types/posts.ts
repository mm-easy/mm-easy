import { User } from './users';

type UserProfile = {
  nickname: string;
  avatar_img_url: string;
  id: string;
  email: string;
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
  view_count: string[];
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
  view_count: string;
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

export type FormPostButtonProps = {
  text: string;
  width?: string;
  height?: string;
  postId: string;
  categoryNow?: string;
  redirectUrl?: string;
};

export type FormCommentButtonProps = {
  text: string;
  width?: string;
  height?: string;
  userId: string;
  redirectUrl?: string;
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

export type InsertComment = {
  postId: string | string[] | undefined;
  profile: User | null | undefined;
  content: string;
};

export type UpdateCommentParams = {
  contentChange: string;
  id: string;
};

export type LikeParams = {
  postId: string;
  userId: string | undefined;
};

export type LikeType = {
  id: string;
  user_id: string | undefined;
  post_id: string;
};

export type NewsType = {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
};
