export enum QuestionType {
  subjective,
  objective
}

export type Option = {
  id: string;
  questionId: string;
  content: string;
  isAnswer: boolean;
};

export type Question = {
  id: string;
  quizId: string; //????????
  type: QuestionType;
  title: string;
  imgUrl?: string;
  correctAnswer?: string;
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
