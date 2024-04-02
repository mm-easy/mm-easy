type Post = {
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
}

type CommunityFormProps = {
  selectedCategory: string;
}