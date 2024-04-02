export enum QuestionType {
  objective = 'objective',
  subjective = 'subjective'
}

export type Option = {
  id: string;
  content: string;
  isAnswer: boolean;
};

export type Question = {
  id: string;
  type: QuestionType;
  title: string;
  imgUrl?: string;
  correctAnswer?: string;
  options: Option[];
  // options?: Option[];
};

export type Quiz = {
  id?: string;
  creator_id: string;
  level: number;
  title: string;
  info: string;
  thumbnail_img_url: string | null;
};
