import { UUID } from 'crypto';

export type User = {
  id: UUID;
  email: string;
  nickname: string;
  avatar_img_url: string;
};

export type ProfileToUpdate = Omit<User, 'email' | 'id'>;
