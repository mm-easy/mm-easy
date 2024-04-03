export type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  attached_img_url: string;
  author_id: string;
  category: string;
};

export type MenuItem = {
  key: string;
  label: string;
};

export type CommunityMenuProps = {
  setSelectedCategory: (category: string) => void;
}

export type CommunityFormProps = {
  selectedCategory: string;
}