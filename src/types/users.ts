import { UUID } from 'crypto';

export type User = {
  id: string;
  email: string;
  nickname: string;
  avatar_img_url: string;
};

export type ProfileToUpdate = Omit<User, 'email' | 'id'>;
