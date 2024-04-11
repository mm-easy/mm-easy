export type Quiz = {
  id?: string;
  creator_id: string;
  level: number;
  title: string;
  info: string;
  thumbnail_img_url: string | null;
};

/** 퀴즈 가져올 때 쓸 타입입니다. */
export type GetQuiz = Quiz & {
  created_at: string;
};

export type Option = {
  id: string;
  content: string;
  is_answer: boolean;
};

export type OptionsToInsert = Pick<Option, 'content' | 'is_answer'> & {
  question_id: string;
};

export enum QuestionType {
  objective = 'objective',
  subjective = 'subjective'
}

export type Question = {
  id?: string;
  type: QuestionType;
  title: string;
  img_file: File | null;
  img_url: string;
  correct_answer: string;
  options: Option[];
};

export type QuestionsToInsert = Pick<Question, 'title' | 'correct_answer'> & {
  quiz_id: string;
  type: QuestionType;
  img_url: string;
};

export type Answer = {
  id: string | undefined;
  answer: string | boolean;
  option_id?: string;
};

export type QuizScore = {
  quiz_id: string | string[];
  user_id: string;
  score: number;
};

export type QuizRank = {
  creator_id: string;
  avatar_img_url: string;
  quiz_count: number;
  nickname: string;
};
