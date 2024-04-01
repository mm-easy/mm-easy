export enum QuestionType {
  objective,
  subjective
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
  id: string;
  creatorId: string;
  level: number;
  title: string;
  info: string;
  thumbnailImgUrl?: string;
};
